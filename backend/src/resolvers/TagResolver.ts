import { Tag } from "../entities/Tag";
import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import { TagInput } from "../inputs/TagInput";


@Resolver(Tag)
export class TagResolver {
    @Query(() => [Tag])
    async getTags() {
        const tags = await Tag.find({
            relations: ["ads"], 
          });
        return tags;
    }

    @Query(() => Tag)
    async getTagById(@Arg("id") tagId: number) {
        return await Tag.findOneByOrFail({id: tagId});
    }

    @Mutation(()=>Tag)
    async createTag(@Arg('data',() => TagInput) data: TagInput) {
        
        try {
            const tag = Tag.create({ ...data });
            await tag.save();
            return tag;
        } catch(error) {
            console.error("❌ Erreur lors de la création du tag:", error);        }
    }

    @Mutation(()=>Boolean)
    async updateTag(
        @Arg('id') tagId:number,
        @Arg("data",() => TagInput) data:Partial<TagInput>):Promise<Boolean> {
        
        try {
            let tag = await Tag.findOneByOrFail({ id:tagId });
            Object.assign(tag, data);
            await tag.save();
            return true;
        } catch(error) {
            console.error("❌ Erreur lors de la mise à jour du tag:", error); 
            return false;       
        }
    }

    @Mutation(()=>ID)
    async deleteTag(@Arg('id') tagId:number){
        try {
            let tag = await Tag.findOneByOrFail({ id:tagId });
            if (!tag) {
                throw new Error(`Le tag avec l'ID ${tagId} n'existe pas.`);
            }
            await Tag.delete({ id:tagId });
            console.log('Tag has been deleted');
            return tagId;
        } catch(error) {
            console.error("❌ Erreur lors de la suppression de l'annonce:", error);
            throw new Error("Impossible de supprimer le tag");    
        }
    }
    
}


import { Tag } from "../entities/Tag";
import { Arg, Query, Resolver } from "type-graphql";

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

    
    
}


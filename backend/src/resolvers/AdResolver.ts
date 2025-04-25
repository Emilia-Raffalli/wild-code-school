import {Ad} from "../entities/Ad";
import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { In } from "typeorm";


@InputType()
export class AdInput {
    @Field(()=>String)
    title: string;

    @Field(()=>String, { nullable:true })
    description: string;

    @Field(()=>String, { nullable:true })
    author: string;

    @Field({ nullable:true })
    price: number;

    @Field(()=>String, { nullable:true })
    image?: string;

    @Field(()=>String,{ nullable:true })
    city: string;

    @Field(() => ID, { nullable:true })
    category: number;
    
    @Field(() => [ID],{ nullable:true })
    tags: number[];
}

@InputType()
export class AdFiltersInput {
    @Field(()=>ID, { nullable:true })
    categoryId?: number;
}


@Resolver(Ad)
export class AdResolver { //TODO : recherches par categories, recherche par id de l'annonce
    @Query(() => [Ad])
    async getAds(@Arg("filters", () => AdFiltersInput) filters?: AdFiltersInput) {

        const { categoryId } = filters || {};

        let ads;
        try {
            if(categoryId) {
                ads = await Ad.find({ where: {
                    category: { id: categoryId }},
                    relations: { category: true }, 
                });
                return ads;
            } 
            ads = await Ad.find({
                relations: ["tags"],
            });  
            return ads;
      
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des annonces:", error);
        }
    }
    
    @Query(() => Ad)
    async getAdById(@Arg("id") adId: number) {
        return await Ad.findOneByOrFail({id:adId});
    }

    @Mutation(() => Ad)
    async deleteAd(@Arg('id') adId: number) {
        try {
            const ad = await Ad.findOneByOrFail({id:adId});
            if (!ad) {
                throw new Error(`Le tag avec l'ID ${adId} n'existe pas.`);
            }
            await Ad.delete({ id: adId });
            console.log('Ad has been deleted');
            return ad; 

        } catch (err) {
            console.error("❌ Erreur lors de la suppression de l'annonce:", err);
            throw new Error("Impossible de supprimer l'annonce");
        }
    }

    @Mutation(() => Ad)
    async createAd(@Arg('data') data: AdInput) {
        try {
            const ad = new Ad();
            ad.title = data.title;
            ad.description = data.description ?? "";
            ad.author = data.author ?? "";
            ad.price = data.price ?? 0;
            ad.image = data.image ?? "";
            ad.city = data.city ?? "";
            
            ad.category = await Category.findOneByOrFail({ id: data.category })?? "";
            ad.tags = await Tag.findBy({ id: In(data.tags) })?? [];
            
            await ad.save();
            return ad;

        } catch (error) {
            console.error("❌ Erreur lors de la création de l'annonce:", error);
            throw new Error("Impossible de créer l'annonce");
        }
    }

    @Mutation(()=> Boolean)
    async updateAd (
        @Arg("id") adId: number, 
        @Arg("data",() => AdInput) data:Partial<AdInput>):Promise<Boolean> {
      
        let ad =  await Ad.findOneByOrFail({id: adId});
    
        try {
            Object.assign(ad, data);
            await ad.save();
            return true;
        } catch (error) {
        console.log("error", error);
            throw new Error("Impossible de mettre à jour l'annonce");
        }
     }

}

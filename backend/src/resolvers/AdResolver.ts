import {Ad} from "../entities/Ad";
import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { In } from "typeorm";
import AdInput, { AdFiltersInput } from "../inputs/AdInputs";


@Resolver(Ad)
export class AdResolver { //TODO : recherches par categories, recherche par id de l'annonce
    @Query(() => [Ad])
    async getAds(@Arg("filters", () => AdFiltersInput, { nullable: true }) filters?: AdFiltersInput) {
        const { categoryId } = filters || {};
    
        let ads: Ad[] = [];  
        try {
            if (categoryId) {
                ads = await Ad.find({
                    where: {
                        category: { id: categoryId }
                    },
                    relations: ["category", "tags"], 
                });
            } else {
                ads = await Ad.find({
                    relations: ["tags"], 
                });
            }
    
            return ads || [];
    
        } catch (error) {
            // console.error("❌ Erreur lors de la récupération des annonces:", error);
            return [];
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

    // @Mutation(()=> Ad)
    // async updateAd (
    //     @Arg("id") adId: number, 
    //     @Arg("data",() => AdInput) data:Partial<AdInput>):Promise<Ad> {
      
    //     let ad =  await Ad.findOneByOrFail({id: adId});
    
    //     try {
    //         Object.assign(ad, data);
    //         await ad.save();
    //         return ad;
    //     } catch (error) {
    //     console.log("error", error);
    //         throw new Error("Impossible de mettre à jour l'annonce");
    //     }
    //  }

    @Mutation(() => Ad)
    async updateAd(
        @Arg("id") adId: number, 
        @Arg("data", () => AdInput) data: Partial<AdInput>
        ): Promise<Ad> {
        const ad = await Ad.findOneByOrFail({ id: adId });
        Object.assign(ad, data);
        await ad.save();
        return ad;
    }

}

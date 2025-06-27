



import {Ad} from "../entities/Ad";
import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { In } from "typeorm";
import AdInput, { AdFiltersInput } from "../inputs/AdInputs";


@Resolver()
export class DevResolver { //TODO : recherches par categories, recherche par id de l'annonce
    @Mutation(() => ID, { nullable:true })
    async seed() {
        // const { categoryId } = filters || {};
    
        // let ads: Ad[] = [];  
        // try {
        //     if (categoryId) {
        //         ads = await Ad.find({
        //             where: {
        //                 category: { id: categoryId }
        //             },
        //             relations: ["category", "tags"], 
        //         });
        //     } else {
        //         ads = await Ad.find({
        //             relations: ["tags"], 
        //         });
        //     }
    
        //     return ads || [];
    
        // } catch (error) {
        //     // console.error("❌ Erreur lors de la récupération des annonces:", error);
        //     return [];
        // }


        const category1 = Category.create({ categoryName:''});
        category1.save();

        const category2 = Category.create({ categoryName:''});
        category2.save();

        const tag1 = Tag.create({ tagName: ''});
        tag1.save();
        
        const tag2 = Tag.create({ tagName: ''});
        tag2.save();



    }
}
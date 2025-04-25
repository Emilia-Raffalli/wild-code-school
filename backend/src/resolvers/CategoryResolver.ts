import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";
import { Arg, Query, Resolver, Mutation, Args } from "type-graphql";
import { Field, ID, ObjectType } from "type-graphql";
import { CategoryInput } from "../inputs/CategoryInput";

@Resolver(Category)
export class CategoryResolver {
    @Query(() => [Category])
    async getCatgories() {
        let categories = await Category.find();
        return categories;
    }
    @Query(() => Category)
    async getCategoryById(@Arg("id") categoryId: number) {
        return await Category.findOneByOrFail({id: categoryId});
    }

    @Mutation(() => Category)
    async createCategory(@Arg('data') data:CategoryInput) {
      
      try {
        const category = Category.create( {...data});
        await category.save();
        return category;
      } catch (error) {
        console.error("❌ Erreur lors de la création de la catégorie:", error);        
      }
    }

    @Mutation(() => Category)
    async deleteCategory(@Arg('id') categoryId: number) {
      try {
        let category = await Category.findOneByOrFail({id:categoryId});

        if (!category) {
          throw new Error("La catégorie n'a pas été trouvée");
        } else {

          let ads = await Ad.find({ where: { category: { id: categoryId } } });
          if (ads.length > 0) {
            throw new Error("Impossible de supprimer la catégorie car elle contient des annonces.");
          }
          await Category.delete({ id: categoryId });
          console.log('Category has been deleted');
          return category; 
        }
      }
      catch (err){
        console.error("❌ Erreur lors de la suppression de l'annonce:", err);
        throw new Error("Impossible de supprimer la catégorie");
      }
    }

    @Mutation(() => Category)
    async updateCategory(@Arg('id') categoryId: number) {
      try {
        let category = await Category.findOneByOrFail({id:categoryId});

        if (!category) {
          throw new Error("La catégorie n'a pas été trouvée");
        } else {
          await Category.delete({ id: categoryId });
          console.log('Category has been deleted');
          return category; 
        }
      }
      catch (err){
        console.error("❌ Erreur lors de la suppression de l'annonce:", err);
        throw new Error("Impossible de supprimer la catégorie");
      }
    }
}
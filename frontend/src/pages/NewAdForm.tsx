// import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../styles/Form.css";
import { Category } from "../types/Category";
import { Tag } from '../types/Tag';
import { toast } from "react-toastify";
import { CREATE_AD } from "../gql/ad/createAd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../gql/category/getCategories";
import { GET_TAGS } from "../gql/tag/category/getTags";
import { Link, useNavigate, useParams } from "react-router";

type Inputs = {
    title: string;
    description: string;
    authorFirstname: string;
    authorLastname: string;
    price: number;
    category: number;
    city: string;
    image: string;
    tags: number[];
};

const NewAdForm = () => {
    // const [categories, setCategories] = useState<Category[]>([]);
    // const [tags, setTags] = useState<Tag[]>([]);

    const { register, handleSubmit } = useForm<Inputs>();
    const navigate = useNavigate();

    // Fonction pour récupérer les catégories depuis l'API
    // const fetchCategories = async () => {
    //     try {
    //         const result = await axios.get<Category[]>("http://localhost:3000/categories");
    //         setCategories(result.data);
    //     } catch (error) {
    //         console.error("Erreur lors de la récupération des catégories :", error);
    //     }
    // };

    // const fetchTags = async () => {
    //     try {
    //         const result = await axios.get<Tag[]>('http://localhost:3000/tags');
    //         console.log(result.data);
    //         setTags(result.data);
    //     } catch (error) {
    //         console.error("Erreur lors de la récupération des tags :", error);
    //     }
    // }

    // useEffect(() => {
    //     fetchCategories();
    //     fetchTags();
    // }, []);



    // const [createdAt] = useMutation(CREATE_AD, {
    //     variables: { data: id },
    //     onCompleted: () => {
    //       toast.success("Annonce supprimée avec succès");
    //       navigate("/");
    //     }
    //   });

    // useEffect(() => {
 
    // }, [id]);

    const [createAd, { 
        loading: loadingMutation, 
        error: errorMutation 
    }] = useMutation(CREATE_AD);

    const {
        data: categoryData,
        loading: loadingCategory,
        error: errorCategory,
      } = useQuery(GET_CATEGORIES);
    
      const {
        data: tagData,
        loading: loadingTag,
        error: errorTag,
      } = useQuery(GET_TAGS);


    const categories: Category[] = categoryData?.getCategories || [];
    const tags: Tag[] = tagData?.getTags || [];

    const onSubmit: SubmitHandler<Inputs> = async (form) => {
        const input = {
          title: form.title,
          description: form.description,
          author: `${form.authorFirstname} ${form.authorLastname}`,
          price: parseFloat(String(form.price)),
          city: form.city,
          image: form.image,
          category: Number(form.category),
          tags: form.tags.map(tagId => Number(tagId)),
        };
      
        try {
          const adData = await createAd({ 
            variables: { data:input } 
            });
            console.log('Annonce créée :', adData.data.createAd);
            console.log(adData);
            toast.success("Annonce créée avec succès !");
            navigate('/ads');
        } catch (err) {
            console.error("Erreur GraphQL :", err);
            toast.error("Erreur lors de la création de l'annonce");
            }
    }

    if (loadingMutation || loadingCategory || loadingTag) {
        console.log("Chargement en cours...");
    }
    
    if (errorMutation) {
        console.error("Erreur de mutation :", errorMutation.message);
    }
    
    if (errorCategory) {
        console.error("Erreur chargement catégories :", errorCategory.message);
    }
    
    if (errorTag) {
        console.error("Erreur chargement tags :", errorTag.message);
    }

    return (
        <>
            <form id='newAdForm' onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Titre de l'annonce
                    <input
                        {...register("title")}
                        className="text-field"
                    />
                </label>
                <br/>
                <label>
                    Catégorie
                    <select {...register("category")} className="text-field">
                        <option value="" >Sélectionnez une catégorie</option>
                        {categories.map((category:Category) => (
                            <option value={category.id} key={category.id}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Description
                    <textarea className="text-field"
                        {...register("description")}
                    />
                </label>
                <br/>
                <label>
                    Votre prénom
                    <input {...register("authorFirstname")}
                    className="text-field" />
                </label>
                <br/>
                <label>
                    Votre nom
                    <input {...register("authorLastname")}
                    className="text-field" />
                </label>
                <br/>
                <label>
                    Prix
                    <input
                        type="number"
                        {...register("price")}
                        className="text-field"
                    />
                </label>
                <br/>
                <label>
                    Ville
                    <input {...register("city")}
                    className="text-field" />
                </label>
                <br/>
                <label>
                    Image de l'article à vendre
                    <input {...register("image")}
                    className="text-field" />
                </label>
                {tags.map((tag) => (
                    <label key={tag.id}>
                        <input
                            type="checkbox"
                            value={tag.id}
                            {...register("tags")}
                        />
                        {tag.tagName}
                    </label>
                ))}

                <br/>
                <button type="submit">Soumettre</button>
            </form>
        </>
    );
};

export default NewAdForm;

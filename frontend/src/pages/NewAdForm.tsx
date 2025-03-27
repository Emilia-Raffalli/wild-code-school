import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../styles/Form.css";
import { Category } from "../types/Category";
import { Tag } from '../types/Tag';
import { toast } from "react-toastify";

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
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    const { register, handleSubmit } = useForm<Inputs>();

    // Fonction pour récupérer les catégories depuis l'API
    const fetchCategories = async () => {
        try {
            const result = await axios.get<Category[]>("http://localhost:3000/categories");
            setCategories(result.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        }
    };

    const fetchTags = async () => {
        try {
            const result = await axios.get<Tag[]>('http://localhost:3000/tags');
            console.log(result.data);
            setTags(result.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des tags :", error);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchTags();
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = {
            title: data.title,
            description: data.description,
            author: `${data.authorFirstname} ${data.authorLastname}`,
            price: Number(data.price), 
            city: data.city,
            categoryId: Number(data.category), 
            tags: data.tags.map((tagId) => ({ id: Number(tagId) }))
        };

        console.log("Données envoyées :", formData);

        // console.log(data);

        try {
            const response = await axios.post("http://localhost:3000/ads", formData);
            console.log("Annonce soumise avec succès :", response.data);
            toast.success("Annonce créée avec succès !");
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
        }
    };

    return (
        <>
            <form id='newAdForm' onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Titre de l'annonce
                    <input
                        {...register("title")}
                        className="text-field"
                        defaultValue="Lot de tasses à café"
                    />
                </label>
                <br/>
                <label>
                    Catégorie
                    <select {...register("category")} className="text-field">
                        <option value="" >Sélectionnez une catégorie</option>
                        {categories.map((category) => (
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

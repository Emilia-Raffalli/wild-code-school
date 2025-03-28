import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../styles/Form.css";
import { Category } from "../types/Category";
import { Tag } from '../types/Tag';
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { Ad } from "../types/Ad";

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

const EditAdForm = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const[ad, setAd] = useState<Ad>();

    const { id } = useParams();

    const { register, handleSubmit, reset } = useForm<Inputs>();

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
            // console.log(result.data);
            setTags(result.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des tags :", error);
        }
    }

    const fetchAdById = async () => {

        let url = `http://localhost:3000/ads/${id}`
        const ad = await axios.get(url);
        // console.log(ad.data);
        setAd(ad.data);

        // defauly values to insert with 'reset' method of useForm
        // reset({
        //     title: ad.data.title,
        //     description: ad.data.description,
        //     authorFirstname: ad.data.author.split(" ")[0] || "",
        //     authorLastname: ad.data.author.split(" ")[1] || "",
        //     price: ad.data.price,
        //     category: ad.data.category.id,
        //     city: ad.data.city,
        //     image: ad.data.image,
        //     tags: ad.data.tags.map((tagId: string) => ({ id: Number(tagId) }))
        // });
    }

    useEffect(() => {
        fetchCategories();
        fetchTags();

        if (id) {
            fetchAdById();
        }
    }, [id]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = {
            title: data.title,
            description: data.description,
            author: `${data.authorFirstname} ${data.authorLastname}`,
            price: Number(data.price), 
            city: data.city,
            image: data.image,
            categoryId: Number(data.category), 
            tags: data.tags.map((tagId) => ({ id: Number(tagId) }))
        };


        try {

            if (ad) {
                const response = await axios.put(`http://localhost:3000/ads/${id}`, formData);
                console.log("Annonce mise à jour avec succès :", response.data);
                toast.success("Annonce mise à jour avec succès !");
                // console.log(response.data);
            } else {
                const response = await axios.post("http://localhost:3000/ads", formData);
                console.log("Annonce soumise avec succès :", response.data);
                toast.success("Annonce créée avec succès !");
            }

        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
            toast.error('Erreur lors de la soumission du formulaire');
        }
    };

    if (ad === undefined) {
        return <p>Loading</p>;
    }

    console.log(ad.tags)

    return (
        <>
            <form id='newAdForm' onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Titre de l'annonce
                    <input
                        {...register("title")}
                        className="text-field"
                        defaultValue={ad.title}
                    />
                </label>
                <br/>
                <label>
                    Catégorie
                    <select {...register("category")} className="text-field" defaultValue={ad.category.id}>
                        <option value="" >Sélectionnez une catégorie</option>
                        {categories.map((category) => (
                            <option 
                                value={category.id} key={category.id}>
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
                        defaultValue={ad.description}
                    />
                </label>
                <br/>
                <label>
                    Votre prénom
                    <input {...register("authorFirstname")} 
                        defaultValue={ad.author.split(" ")[0]}
                    className="text-field" />
                </label>
                <br/>
                <label>
                    Votre nom
                    <input {...register("authorLastname")}
                        defaultValue={ad.author.split(" ")[1]}
                    className="text-field" />
                </label>
                <br/>
                <label>
                    Prix
                    <input
                        type="number"
                        {...register("price")}
                        defaultValue={ad.price}
                        className="text-field"
                    />
                </label>
                <br/>
                <label>
                    Ville
                    <input {...register("city")}
                    defaultValue={ad.city}
                    className="text-field" />
                </label>
                <br/>
                <label>
                    Image de l'article à vendre
                    <input {...register("image")}
                    defaultValue={ad.image}
                    className="text-field" />
                </label>
                {tags.map((tag) => (
                    <label key={tag.id}>
                        <input
                            type="checkbox"
                            value={tag.id}
                            {...register("tags")}
                            //verifie si l'id du tag de l'annonce est présent dans les id des tags du formulaire
                            defaultChecked=
                            {ad.tags.some((adTag) => 
                                adTag.id === tag.id
                            )}
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

export default EditAdForm;

import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../styles/NewAdForm.css";

type Category = {
    id: number;
    categoryName: string;
};

type Inputs = {
    title: string;
    description: string;
    authorFirstname: string;
    authorLastname: string;
    price: number;
    category: number;
    city: string;
    image: string;
};

const NewAdForm = () => {
    const [categories, setCategories] = useState<Category[]>([]);

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

    useEffect(() => {
        fetchCategories();
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = {
            title: data.title,
            description: data.description,
            author: `${data.authorFirstname} ${data.authorLastname}`,
            price: Number(data.price), 
            city: data.city,
            categoryId: Number(data.category), 
        };

        console.log("Données envoyées :", formData);

        console.log(data);

        try {
            const response = await axios.post("http://localhost:3000/ads", formData);
            console.log("Annonce soumise avec succès :", response.data);
            alert("Annonce créée avec succès !");
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
                        {...register("title", { required: "Le titre est obligatoire" })}
                        className="text-field"
                        defaultValue="Lot de tasses à café"
                    />
                </label>
                <br/>
                <label>
                    Catégorie
                    <select {...register("category", { required: "Veuillez choisir une catégorie" })} className="text-field">
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
                        {...register("description", { required: "La description est obligatoire" })}
                    />
                </label>
                <br/>
                <label>
                    Votre prénom
                    <input {...register("authorFirstname", { required: "Le prénom est obligatoire" })}
                    className="text-field" />
                </label>
                <br/>
                <label>
                    Votre nom
                    <input {...register("authorLastname", { required: "Le nom est obligatoire" })}
                    className="text-field" />
                </label>
                <br/>
                <label>
                    Prix
                    <input
                        type="number"
                        {...register("price", { required: "Le prix est obligatoire", min: 1 })}
                        className="text-field"
                    />
                </label>
                <br/>
                <label>
                    Ville
                    <input {...register("city", { required: "La ville est obligatoire" })}
                    className="text-field" />
                </label>
                <br/>
                <label>
                    Image de l'article à vendre
                    <input {...register("image", { required: false })}
                    className="text-field" />
                </label>
                <br/>
                <button type="submit">Soumettre</button>
            </form>
        </>
    );
};

export default NewAdForm;

import axios from "axios";
import "../styles/Form.css";
import { Category } from "../types/Category";
import { toast } from "react-toastify";


const AdminPage = () => {

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

        const form = event.target;
        const formData = new FormData(form as HTMLFormElement);    

        const formEntriesJson = Object.fromEntries(formData.entries());
        
        try {
            const response = await axios.post<Category[]>("http://localhost:3000/categories", formEntriesJson);
            console.log("Catégorie ajoutée avec succès :", response.data);
            toast.success("Catégory créée avec succès !");
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
            toast.error("Erreur lors de la création de la catégorie.");
        }

        
        console.log(formEntriesJson);
    };


    return (

    <div>
      <h1>Admin</h1>
        <form id='categoryForm' onSubmit={onSubmit}>
            <label>
                Ajouter une nouvelle catégorie
                <input type='text' className="text-field" defaultValue="immobilier" name='categoryName'>
                </input>
            </label>

            <button type='submit'>Valider</button>
        </form>
    </div>
    )
};

export default AdminPage;
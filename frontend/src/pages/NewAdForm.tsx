import axios from "axios";
import { useEffect, useState } from "react";

type Category = {
    id:number;
    categoryName: string;
}


const NewAdForm = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form as HTMLFormElement);
        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);


        const dataFromJson = {
            title: formJson.title,
            description: formJson.description,
            author: `${formJson.authorFirstname} ${formJson.authorLastname}`,
            price: formJson.price,
            city: formJson.city,
            categoryId: formJson.category, 
        };

        if (!dataFromJson.title || !dataFromJson.description || !dataFromJson.price || 
            !dataFromJson.city || !dataFromJson.categoryId || !formJson.authorFirstname || !formJson.authorLastname) {
            console.error('Erreur: Tous les champs doivent être remplis.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/ads', dataFromJson); // post de la nouvelle annonce
            console.log(response);
            console.log('Form data submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };


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
        // console.log(categories);
    }, []);


    return (
        <>
            {/* nota bene: il est possible de mettre l'input directement dans la balise label et ainsi se défaire des attribut for et id du label, car cela lie directement le label et l'input. */}
            <form onSubmit={handleSubmit}>

                <label> 
                    Titre de l'annonce
                    <input type="text" className="text-field" name="title" placeholder="Titre de l'annonce"
                    defaultValue={'Vend chaussures de running'} />
                </label>

                <label> 
                    Catgégorie
                    <select name='category'>
                        {categories.map((category) => (
                            <option value={category.id} key={category.id}>
                                {category.categoryName}
                            </option>
                        ))}
                        </select>
                    </label>

                <label>
                    Decsription
                    <textarea name="description" className="text-field" rows={4} cols={40} defaultValue={'Chaussures de running en bon état, jamais servies.'}/>
                </label>
                <label> 
                    Votre prénom
                    <input type='text' className="text-field" name="authorFirstname" defaultValue={'John'} />
                </label>
                <label> 
                    Votre nom
                    <input type='text' className="text-field" name="authorLastname" defaultValue={'Doe'} />
                </label>
                <label> Prix
                    <input type='text' className="text-field" name="price" defaultValue={35} />
                </label>

                <label> 
                    Ville
                    <input type='text' className="text-field" name="city" defaultValue={'Paris'} />
                </label>

                <button className="button">Soumettre</button>

            </form>
           
        </>


// "title": "Nouvel objet yyygoy",
// "description": "Lit évolutif en bois, bon état, avec matelas.",
// "author": "Amandine Charpentier",
// "price": 100,
// "createdAt": "2023-08-10 11:10:00",
// "image": "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
// "city": "Lyon",
// "categoryId": 1,
// "tags": [{"id":1} , {"id":2}]



    )
}

export default NewAdForm;
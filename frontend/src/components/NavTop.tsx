import axios from "axios"
import NavTopLink from "./NavTopLink"
import { useEffect, useState } from "react"
import { Category } from "../types/Category";


const NavTop = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const fetchData = async () => {
        const result = await axios.get<Category[]>('http://localhost:3000/categories');
        // console.log("Résultat du fetch des catégories :", result.data); 
        setCategories(result.data);
    }
    useEffect(() => {
        fetchData();
    }, []); 

    return (
        <>
        <nav className="categories-navigation">
            {categories.map((category) => (
                <NavTopLink 
                    key={category.id}  
                    link={`?categoryId=${category.id}`}  
                    categoryName={category.categoryName} />
            ))}
        </nav>
        </>

    )
}
export default NavTop
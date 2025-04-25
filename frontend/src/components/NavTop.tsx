import NavTopLink from "./NavTopLink"
import { Category } from "../types/Category";
import { GET_CATEGORIES } from "../gql/category/getCategories";
import { useQuery } from "@apollo/client";


const NavTop = () => {
    const { data, loading, error } = useQuery(GET_CATEGORIES);
    if (loading) return <p>Chargement des catégories...</p>;
    if (error) return <p>Erreur lors du chargement des catégories : {error.message}</p>;
    return (
        <>
        <nav className="categories-navigation">
            {data.getCategories.map((category:Category) => (
                <NavTopLink 
                    key={category.id}  
                    link={`/?categoryId=${category.id}`}  
                    categoryName={category.categoryName} />
            ))}
        </nav>
        </>
    )
}
export default NavTop
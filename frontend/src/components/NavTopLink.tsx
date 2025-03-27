import { Link } from "react-router";
import { Category } from "../types/Category";
    

const NavTopLink = ({ link, categoryName }: Category) => {
    return (
        <Link to={link} className="category-navigation-link">
          {categoryName} •
        </Link>
    );
}

export default NavTopLink;

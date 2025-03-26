export type NavTopLinkProps = {
    id?: number;
    link?: string;
    categoryName: string;
}

const NavTopLink = ({ link, categoryName }: NavTopLinkProps) => {
    return (
        <a href={link} className="category-navigation-link">{categoryName} • </a>
    );
}

export default NavTopLink;

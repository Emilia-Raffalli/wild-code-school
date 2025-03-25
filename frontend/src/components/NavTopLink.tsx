export type NavTopLinkProps = {
    link: string;
    title: string;
}

const NavTopLink = ({ link, title }: NavTopLinkProps) => {
    return (
        <a href={link} className="category-navigation-link">{title} • </a>
    );
}

export default NavTopLink;

import NavTopLink, { NavTopLinkProps } from "./NavTopLink"


const NavTop = () => {

    const navLinks: NavTopLinkProps[] = [
       {
        link:'#',
        title:'Ameublement'
       },
       {
        link:'#',
        title:'Électroménager'
       },
       {
        link:'#',
        title:'Photographie'
       },
       {
        link:'#',
        title:'Informatique'
       },
       {
        link:'#',
        title:'Électroménager'
       },
       {
        link:'#',
        title:'Téléphonie'
       },
       {
        link:'#',
        title:'Vélos'
       },
       {
        link:'#',
        title:'Véhicules'
       },
       {
        link:'#',
        title:'Sport'
       },
       {
        link:'#',
        title:'Habillement'
       },
       {
        link:'#',
        title:'Bébé'
       },
       {
        link:'#',
        title:'Outillage'
       },
       {
        link:'#',
        title:'Services'
       },
       {
        link:'#',
        title:'Vacances'
       }
    ]
    return (
        <>
       <nav className="categories-navigation">
        {navLinks.map((link) => (
                <NavTopLink
                    link={link.link}
                    title={link.title}
                />
            ))}
        </nav>
        </>

    )
}
export default NavTop
import axios from "axios"
import NavTopLink, { NavTopLinkProps } from "./NavTopLink"
import { useEffect, useState } from "react"


const NavTop = () => {

    // const navLinks: NavTopLinkProps[] = [
    //    {
    //     link:'#',
    //     title:'Ameublement'
    //    },
    //    {
    //     link:'#',
    //     title:'Électroménager'
    //    },
    //    {
    //     link:'#',
    //     title:'Photographie'
    //    },
    //    {
    //     link:'#',
    //     title:'Informatique'
    //    },
    //    {
    //     link:'#',
    //     title:'Électroménager'
    //    },
    //    {
    //     link:'#',
    //     title:'Téléphonie'
    //    },
    //    {
    //     link:'#',
    //     title:'Vélos'
    //    },
    //    {
    //     link:'#',
    //     title:'Véhicules'
    //    },
    //    {
    //     link:'#',
    //     title:'Sport'
    //    },
    //    {
    //     link:'#',
    //     title:'Habillement'
    //    },
    //    {
    //     link:'#',
    //     title:'Bébé'
    //    },
    //    {
    //     link:'#',
    //     title:'Outillage'
    //    },
    //    {
    //     link:'#',
    //     title:'Services'
    //    },
    //    {
    //     link:'#',
    //     title:'Vacances'
    //    }
    // ]

    const [navLinks, setNavLinks] = useState<NavTopLinkProps[]>([]);
    const fetchData = async () => {
        const result = await axios.get<NavTopLinkProps[]>('http://localhost:3000/categories');
        // console.log("Résultat du fetch des catégories :", result.data); 
        setNavLinks(result.data);
    }


    useEffect(() => {
        fetchData();
    }, []); 

    return (
        <>
       <nav className="categories-navigation">
        {navLinks.map((link) => (
            <NavTopLink 
                key= {link.id}
                link="#" 
                categoryName={link.categoryName} />
            ))}
        </nav>
        </>

    )
}
export default NavTop
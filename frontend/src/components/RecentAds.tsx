import { AdCardProps } from "./AdCard"; 
import AdCard from "./AdCard"
import { useState, useEffect } from "react";
import axios from "axios";

const RecentAds = () => {
    // const ads: AdCardProps[] = [
    // {   
    //     id:1,
    //     link:"/images/table.webp",
    //     imgUrl:"/images/table.webp",
    //     title:"Table",
    //     price:120
    // },
    // {   
    //     id:2,
    //     link:"/ads/dame-jeanne",
    //     imgUrl:"/images/dame-jeanne.webp",
    //     title:"Dame-jeanne",
    //     price:75
    // },
    // {   
    //     id:3,
    //     link:"/ads/vide-poche",
    //     imgUrl:"/images/vide-poche.webp",
    //     title:"Vide-poche",
    //     price:4
    // },
    // {   
    //     id:4,
    //     link:"/ads/vaisselier",
    //     imgUrl:"/images/vaisselier.webp",
    //     title:"Vaisselier",
    //     price:900
    // },
    // {   
    //     id:5,
    //     link:"/ads/bougie",
    //     imgUrl:"/images/bougie.webp",
    //     title:"Bougie",
    //     price:9
    // },
    // {   
    //     id:6,
    //     link:"/ads/porte-magazine",
    //     imgUrl:"/images/porte-magazine.webp",
    //     title:"Porte-magazine",
    //     price:45
    // }

    // ]
 
    // const [total, setTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [ads, setAds ] = useState<AdCardProps[]>([]);
    const everyRender = () => {
        console.log('This will be executed after every render.');
    }
    everyRender();

    const firstRenderOnly = () => {
        console.log('Hello first Render Only !');
    }

    const fetchData = async () => {
        try {
            const result = await axios.get<AdCardProps[]> // typage des données reçues
            ('http://localhost:3000/ads');
            console.log(result);
            setAds(result.data);

        } catch (error) {
         console.log('error', error);   
        }
    }

    useEffect(() => {
        firstRenderOnly();
        fetchData();
    }, []); 

    return (
        <>
        <h2>Annonces récentes</h2>
        <h3>{total}</h3>
        <section className="recent-ads">
            {ads.map((ad) => (
                <div key={ad.id}>
                    <AdCard
                    link={ad.link}
                    image={ad.image}
                    title={ad.title}
                    price={ad.price}
                />
                <button className='button' onClick = {() => {
                    setTotal(total + ad.price);
                }}>
                    Add price to total </button>
                </div>
            ))}
        </section>
        </>

    )
}
export default RecentAds
import { Link } from "react-router";
import { AdCardProps } from "./AdCard"; 
import AdCard from "./AdCard"

const RecentAds = () => {
    const ads: AdCardProps[] = [
    {   
        id:1,
        link:"/images/table.webp",
        imgUrl:"/images/table.webp",
        title:"Table",
        price:120
    },
    {   
        id:2,
        link:"/ads/dame-jeanne",
        imgUrl:"/images/dame-jeanne.webp",
        title:"Dame-jeanne",
        price:75
    },
    {   
        id:3,
        link:"/ads/vide-poche",
        imgUrl:"/images/vide-poche.webp",
        title:"Vide-poche",
        price:4
    },
    {   
        id:4,
        link:"/ads/vaisselier",
        imgUrl:"/images/vaisselier.webp",
        title:"Vaisselier",
        price:900
    },
    {   
        id:5,
        link:"/ads/bougie",
        imgUrl:"/images/bougie.webp",
        title:"Bougie",
        price:9
    },
    {   
        id:6,
        link:"/ads/porte-magazine",
        imgUrl:"/images/porte-magazine.webp",
        title:"Porte-magazine",
        price:45
    }

    ]
 
    return (
        <>
        <h2>Annonces récentes</h2>
        <section className="recent-ads">
            {ads.map((ad) => (
            <Link key={ad.id} to={`/ad/${ad.id}`} state={{ ad }}>
                <AdCard
                link={ad.link}
                imgUrl={ad.imgUrl}
                title={ad.title}
                price={ad.price}
            />
            </Link>
            ))}
        </section>
        </>

    )
}
export default RecentAds
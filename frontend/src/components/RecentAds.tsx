import { AdCardProps } from "./AdCard"; 
import AdCard from "./AdCard"
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";
// import { useSearchParams } from "react-router";

const RecentAds = () => {

    const [total, setTotal] = useState(0);
    const [ads, setAds ] = useState<AdCardProps[]>([]);

    const [searchParams] = useSearchParams();
    console.log(searchParams.get('categoryId'));

    const everyRender = () => {
        console.log('This will be executed after every render.');
    }
    everyRender();

    const firstRenderOnly = () => {
        console.log('Hello first Render Only !');
    }

    const fetchData = async () => {
        let url = `http://localhost:3000/ads`;
        if(searchParams.get('categoryId')) {
            url += `?categoryId=${searchParams.get('categoryId')}`
        }

        try {
            const result = await axios.get<AdCardProps[]>(url);
            setAds(result.data); 
            console.log(result);
        } catch (error) {
         console.log('error', error);   
        }
    }

    useEffect(() => {
        firstRenderOnly();
        fetchData();
    }, [searchParams]); 

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
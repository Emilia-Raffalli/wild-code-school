import { useParams } from "react-router";
import AdCard, { AdCardProps } from "../components/AdCard";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchPage = () => {
    const { searchTerm } = useParams();
    const [ads, setAds] = useState<AdCardProps[]>([]);
    // console.log(`searchTerm: ${searchTerm}`);

    const fetchSearchData = async () => {
        let url = `http://localhost:3000/ads/search?searchTerm=${searchTerm}`;
        try {
            const searchResult = await axios.get<AdCardProps[]>(url);
            setAds(searchResult.data); 
            console.log(searchResult);

        } catch (error) {
         console.log('error', error);   
        }
    }


    useEffect(() => {
        fetchSearchData();
    }, [searchTerm]);
    
    return (
        <>
        <h2>Résultats de la recherche</h2>
        <section className="recent-ads">
            {ads.map((ad) => (
                <div key={ad.id}>
                    <AdCard
                    link={`/ad/${ad.id}`}
                    image={ad.image}
                    title={ad.title}
                    price={ad.price}
                />
                </div>
            ))}
        </section>
        </>
    )
}
export default SearchPage;
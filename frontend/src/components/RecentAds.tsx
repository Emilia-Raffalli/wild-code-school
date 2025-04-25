import { AdCardProps } from "./AdCard"; 
import AdCard from "./AdCard"
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_ADS } from "../gql/ad/getAds";

const RecentAds = () => {

    const [total, setTotal] = useState(0);

    const [searchParams] = useSearchParams();
    console.log(searchParams.get('categoryId'));

    const everyRender = () => {
        console.log('This will be executed after every render.');
    }
    everyRender();

    const firstRenderOnly = () => {
        console.log('Hello first Render Only !');
    }

    const filters = searchParams.get('categoryId')
    ? { categoryId: searchParams.get('categoryId') }
    : undefined;

    console.log("Filtres envoyés à la requête :", filters);

    const { data, loading, error } = useQuery(GET_ADS, {
        variables: { filters },
    })
    

    useEffect(() => {
        firstRenderOnly();
        // fetchData();
    }, [searchParams]); 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
        <h2>Annonces récentes</h2>
        <h3>{total}</h3>
        <section className="recent-ads">
            {data.getAds.map((ad: AdCardProps) => (
                <div key={ad.id}>
                    <AdCard
                    link={`/ad/${ad.id}`}
                    image={ad.image}
                    title={ad.title}
                    price={ad.price}
                />
                <button className='button' onClick = {() => {
                    setTotal(total + ad.price);
                }}>
                    Add price to total 
                </button>
                </div>
            ))}
        </section>
        </>

    )
}
export default RecentAds
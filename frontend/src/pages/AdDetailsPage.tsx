import { useParams } from "react-router";

const AdDetailsPage = () => {
    const { id } = useParams();
    return (
        // <div className="ad-details">
        //     <h2>{ad.title}</h2>
        //     <p>Prix : {ad.price} €</p>
        //     <img src={ad.imgUrl} alt={ad.title} />
        //     <a href={ad.link}>Voir l'annonce</a>
        // </div>
        <p>Détails de l'annonce {id}</p>
    );
};

export default AdDetailsPage;

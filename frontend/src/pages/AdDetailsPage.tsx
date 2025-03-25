import { useLocation, useParams } from "react-router";

const AdDetailsPage = () => {
    // Utilise useLocation pour accéder à l'objet "ad" dans le state
    const location = useLocation();
    const ad = location.state?.ad;

    // Si l'objet ad est absent, on affiche un message d'erreur
    // if (!ad) {
    //     return <h2>Annonce non trouvée</h2>;
    // }

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

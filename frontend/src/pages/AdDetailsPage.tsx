import { useParams } from "react-router";

const AdDetailsPage = () => {
    const { id } = useParams();
    return (
        <p>Détails de l'annonce {id}</p>
    );
};

export default AdDetailsPage;

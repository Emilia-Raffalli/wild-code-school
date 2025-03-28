import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Ad } from '../types/Ad';
import { toast } from "react-toastify";

const AdDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const[ad, setAd] = useState<Ad>();
    console.log(id);
    
    const fetchAdById = async () => {
        try {
            const ad = await axios.get<Ad>(`http://localhost:3000/ads?adId=${id}`);
            setAd(ad.data);  
            
            console.log(ad);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'annonce:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchAdById();
        }
    }, [id]);


    if (ad === undefined) {
        return (
            <p>Loading</p>
        )
    } else {
        return (
            <>
                <p>Détails de l'annonce {ad.id}</p>
                <section className="ad-details">
                <div className="ad-details-image-container">
                <img className="ad-details-image" src={ad.image} />
                </div>
                <div className="ad-details-info">
                <div className="ad-details-price">{ad.price} €</div>
                <div className="ad-details-description">
                    {ad.description}
                </div>
                <hr className="separator" />
                <div className="ad-details-owner">
                    Annoncée publiée par <b>{ad.author}</b> le 
                    {/* {new Date(ad.createdAt).toLocaleDateString()} 
                    à {new Date(ad.createdAt).toLocaleTimeString()}. */}
                {new Date(ad.createdAt).toLocaleString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
                </div>
                {/* <a
                    href="mailto:serge@serge.com"
                    className="button button-primary link-button"
                    ><svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                    stroke= "currentcolor" 
                    stroke-width= "2.5" 
                    fill= "none"
                    >
                    <path
                        d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"
                    ></path>
                    </svg>
                    Envoyer un email</a> */}
                    <button onClick={ async () => {
                        try{
                            await axios.delete(`http://localhost:3000/ads/${ad.id}`);
                        navigate('/');
                        toast.success('Annonce supprimée avec succès')


                        } catch (error) {
                            console.log(error);
                            toast.error('Problème lors de la suppression de l"annonce.')
                        }
                        }}
                        > X Supprimer l'annonce

                    </button>

                    <button 
                        type='button'
                    > Modifier l'annonce
                    </button>

                    <Link to={`/ads/${id}/edit`} className="button link-button">
                        <span className="desktop-long-label">Modifier l'annonce</span>
                    </Link>
                </div>
            </section>
            </>
    );

    }


    
}

export default AdDetailsPage;

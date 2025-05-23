import { Link, useNavigate, useParams } from "react-router";
// import axios from "axios";
import { useEffect, useState } from "react";
import { Ad } from '../types/Ad';
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ADS_BY_ID } from "../gql/ad/getAdById";
import { DELETE_AD } from "../gql/ad/deleteAd";

const AdDetailsPage = () => {
    const navigate = useNavigate();
    const { id: idParam } = useParams<{ id: string }>();

    // Vérification et parsing de l'ID
    if (!idParam) {
        console.error("Paramètre id manquant dans l'URL");
        return <p>Annonce introuvable.</p>;
    }
    const id = parseFloat(idParam);
    if (Number.isNaN(id)) {
        console.error("Paramètre id invalide :", idParam);
        return <p>Identifiant invalide.</p>;
    }
    console.log(id);
    

    const { data, loading, error } = useQuery(GET_ADS_BY_ID, {
        variables: { id: id }
    })

    const [deleteAd] = useMutation(DELETE_AD, {
        variables: { id: id },
        onCompleted: () => {
          toast.success("Annonce supprimée avec succès");
          navigate("/");
        }
      });

    useEffect(() => {
 
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const ad:Ad = data.getAdById;

    return (
        <>
            <p>Détails de l'annonce {data.id}</p>
            <section className="ad-details">
            <div className="ad-details-image-container">
                <img
                    className="ad-details-image"
                    src={ad.image}
                    alt={ad.title}
                />
            </div>
            <div className="ad-details-info">
            <div className="ad-details-price">{ad.price} €</div>
            <div className="ad-details-description">
                {data.description}
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
                <button
                    className="button"
                    disabled={loading}
                    onClick={() => {
                    deleteAd();
                    }}
                > 
                    X Supprimer l'annonce
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


    


export default AdDetailsPage;

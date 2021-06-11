import React from 'react';
import { Link } from 'react-router-dom';
import { responsive5, fontStyle1 } from '../style/bulma/style';
import '../style/favourites/favourite.css'


function FavouriteBook({ id, image_url, title, favourite, setFavourite }) {
    const deleteFavourite = () => {
        if (window.confirm('Are you sure you want to delete this book from favourites?')) {
            setFavourite(favourite.filter(idBook => idBook !== id))
        }
    }
    return (
        <div id="FavouriteBook">
            <div className="box has-background-link-light is-size-4">
                <div className="notification has-background-link-light">
                    <button className="has-background-link-light has-text-danger"
                        onClick={deleteFavourite}
                    >
                        ♥
                    </button>
                    <Link to={`/book/${id}`} className={`title ${responsive5} ${fontStyle1}`}>{title}</Link>
                    <div className="all">
                        <div className="image">
                            <Link to={`/book/${id}`}><img src={image_url} alt="img" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FavouriteBook;

import React from 'react';
import '../style/book/book.css';
import { Link } from 'react-router-dom';
import Stars from './Stars';
import { formatDateOnFrontend1 } from '../functions/formatDate';
import { responsive1, responsive2, fontStyle1 } from '../style/bulma/style';

function Book({ id, title, author, release_date, image_url, rating, favourite, setFavourite }) {
    const addToFavoourite = () => {
        if (window.confirm('Are you sure you want to add this book to favourites?')) {
            setFavourite([...favourite, id])
        }
    }
    return (
        <div id="Book">
            <div className="box has-background-link-light is-size-4">
                <div className="notification has-background-link-light">
                    <button className="has-background-link-light has-text-grey-dark"
                        onClick={addToFavoourite}>
                        ♥
                    </button>
                    <Link to={`/book/${id}`} className={`title ${responsive1} ${fontStyle1}`}>{title}</Link>
                    <div className="all">
                        <div className="content">
                            <u className={`title ${responsive2} has-text-danger-dark`}>Author</u>
                            <p className={`title ${responsive2} ml-2`}>{author}</p>
                            <u className={`title ${responsive2} has-text-link-dark`}>Release date</u>
                            <p className={`title ${responsive2} ml-2`}>{release_date !== undefined && formatDateOnFrontend1(release_date)}</p>
                        </div>
                        <div className="image">
                            <Link to={`/book/${id}`}><img src={image_url} alt="img" /></Link>
                            <Stars rating={rating} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Book;



import React from 'react';
import "../style/book/book.css";
import { Link } from 'react-router-dom';


function Book({ id, title, author, release_date, image_url }) {

    return (
        <div id="Book">
            <div className="box has-background-link-light is-size-4">
                <div className="notification has-background-link-light">
                    <button className="delete" onClick={() => {
                        if (window.confirm('Are you sure you want to delete this book?')) {
                        }
                    }}>
                    </button>
                    <Link to={`/book/${id}`} className="title is-size-6-mobile is-size-3-tablet has-text-grey-dark has-text-weight-bold">{title}</Link>
                    <div className="all">
                        <div className="content">
                            <u className="title  is-size-7-mobile is-size-4-tablet has-text-danger-dark">Author</u>
                            <p className="title  is-size-7-mobile is-size-4-tablet ml-2">{author}</p>
                            <u className="title  is-size-7-mobile is-size-4-tablet  has-text-link-dark">Release date</u>
                            <p className="title  is-size-7-mobile is-size-4-tablet ml-2">{release_date.slice(0, 10)}</p>
                        </div>
                        <div className="image">
                            <Link to={`/book/${id}`}><img src={image_url} alt="img" /></Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Book;



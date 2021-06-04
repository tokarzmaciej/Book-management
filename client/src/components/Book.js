import React from 'react';
import "../style/book/book.css";


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
                    <p className="title  is-size-6-mobile is-size-3-tablet has-text-grey-dark has-text-weight-bold">{title}</p>
                    <div className="all">
                        <div className="content">
                            <p className="title  is-size-7-mobile is-size-4-tablet has-text-danger-dark">Author</p>
                            <p className="title  is-size-7-mobile is-size-4-tablet">*  {author}</p>
                            <p className="title  is-size-7-mobile is-size-4-tablet  has-text-link-dark">Release date</p>
                            <p className="title  is-size-7-mobile is-size-4-tablet has-text-">*  {release_date.slice(0, 10)}</p>
                        </div>
                        <div className="image">
                            <img src={image_url} alt="img" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Book;



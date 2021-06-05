import React from 'react';
import { Link } from 'react-router-dom';
import "../style/menu/menu.css";


function Menu() {
    return (
        <div className="Menu">
            <div className="header">
                <span className="icon">
                    <i className="fas fa-book-reader" aria-hidden="true"></i>
                </span>
            </div>
            <div>
                <Link to={`/`} className="title has-text-white-bis">Top 5</Link>
            </div>
            <div>
                <Link to={`/books/1`} className="title has-text-white-bis">Books</Link>
            </div>
            <div>
                <Link to={`/favourites`} className="title has-text-white-bis">Favourites</Link>
            </div>
        </div>
    );
};

export default Menu;

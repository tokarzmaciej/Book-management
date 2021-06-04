import React from 'react';
import { Link } from 'react-router-dom';
import "../style/menu/menu.css"


function Menu() {
    return (
        <div className="Menu">
            <div className="header">
                <h1 className="title has-text-black-ter is-3 has-text-weight-bold">Book</h1>
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

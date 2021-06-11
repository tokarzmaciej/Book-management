import React from 'react';
import { Link } from 'react-router-dom';
import '../style/menu/menu.css';
import { titleStyle7 } from '../style/bulma/style';

function Menu() {
    return (
        <div className="Menu">
            <div className="header">
                <span className="icon">
                    <i className="fas fa-book-reader" aria-hidden="true"></i>
                </span>
            </div>
            <div>
                <Link to={`/`} className={titleStyle7}>Top 5</Link>
            </div>
            <div>
                <Link to={`/books/1`} className={titleStyle7}>Books</Link>
            </div>
            <div>
                <Link to={`/favourites/1`} className={titleStyle7}>Favourites</Link>
            </div>
        </div>
    );
};

export default Menu;

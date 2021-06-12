import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import '../style/menu/menu.css';
import { titleStyle7 } from '../style/bulma/style';

function Menu() {
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();
    return (
        <div className="Menu">
            <div className="back">
                <button onClick={() => history.goBack()}>←</button>
            </div>
            <div className="header" onClick={() => setRedirect(true)} >
                <span className="icon" >
                    <i className="fas fa-book-reader" aria-hidden="true"></i>
                </span>
            </div>
            <div>
                <Link to={`/top5`} className={titleStyle7}>Top 5</Link>
            </div>
            <div>
                <Link to={`/books/1`} className={titleStyle7}>Books</Link>
            </div>
            <div>
                <Link to={`/favourites/1`} className={titleStyle7}>Favorites</Link>
            </div>

            {redirect ? <Redirect to={`/books/1`} /> : null}
        </div>
    );
};

export default Menu;

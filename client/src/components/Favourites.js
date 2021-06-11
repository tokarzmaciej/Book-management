import React from 'react';
import Menu from "./Menu";
import Pagination from './Pagination';
import FavouriteBook from './FavouriteBook';
import '../style/favourites/favourites.css'

function Favourites({ id, favourite, copyBooks, setFavourite }) {

    const favouritesBook = favourite.map(id => copyBooks.find(book => book.id === id));
    const size = favouritesBook.length
    const endPage = parseInt(size / 5) !== size / 5 ||
        size === 0 ? parseInt(size / 5) + 1 : size / 5;

    const arrayToPagination = endPage > 4 ? id >= 4 ?
        [endPage - 3, endPage - 2, endPage - 1] :
        [2, 3, 4] : endPage === 4 ? [2, 3] : [2];

    const books = favouritesBook.slice((id - 1) * 5, id * 5);
    return (
        <div id="Favourite">
            <Menu />
            <div className="favourites">
                <div className="content">
                    {books.map(({ id, title, image_url }) =>
                        <FavouriteBook
                            key={id}
                            id={id}
                            title={title}
                            image_url={image_url}
                            favourite={favourite}
                            setFavourite={setFavourite} />
                    )}
                </div>
                <div className="footer">
                    <Pagination
                        id={id}
                        endPage={endPage}
                        arrayToPagination={arrayToPagination}
                        link="favourites"
                    />
                </div>
            </div>
        </div>
    );
}

export default Favourites;

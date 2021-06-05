import React from 'react';
import { Link } from 'react-router-dom';

function Pagination({ id, endPage, arrayToPagination }) {

    return (
        <footer className="pagination is-centered is-rounded is-size-7-mobile is-size-6-tablet"
            role="navigation" aria-label="pagination"
        >
            <Link className="pagination-previous button is-link is-outlined"
                to={id - 1 >= 1 ? `/books/${id - 1}` : `/books/${id}`}>Previous
                </Link>
            <Link className="pagination-next button is-link is-outlined"
                to={id + 1 <= endPage ? `/books/${id + 1}` : `/books/${id}`}>Next page
                </Link>
            <ul className="pagination-list">
                {1 === id ?
                    <li >
                        <Link className="pagination-link is-current"
                            aria-label="Goto page 1" aria-current="page" to="/books/1"
                        >
                            1
                        </Link>
                    </li> :
                    <li><Link className="pagination-link" aria-label="Goto page 1" to="/books/1">1</Link></li>
                }
                <li><span className="pagination-ellipsis">&hellip;</span></li>
                {endPage > 2 ? arrayToPagination.map((ele, index) => {
                    return ele === id ?
                        <li key={index}>
                            <Link className="pagination-link is-current" aria-label={`Goto page ${ele}`}
                                aria-current="page" to={`/books/${ele}`}>{ele}</Link>
                        </li> :
                        <li key={index}>
                            <Link className="pagination-link" aria-label={`Goto page ${ele}`}
                                to={`/books/${ele}`}>{ele}</Link>
                        </li>
                }) : null}
                <li><span className="pagination-ellipsis">&hellip;</span></li>
                {id === endPage ?
                    <li>
                        <Link className="pagination-link is-current"
                            aria-label={`Goto page ${endPage}`} aria-current="page" to={`/books/${endPage}`}>
                            {endPage}
                        </Link>
                    </li> :
                    <li><Link className="pagination-link" aria-label={`Goto page ${endPage}`} to={`/books/${endPage}`}>{endPage}</Link></li>
                }
            </ul>
        </footer>
    );
}

export default Pagination;

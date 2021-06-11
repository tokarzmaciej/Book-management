import React from 'react';
import { Link } from 'react-router-dom';
import { paginationStyle1 } from '../style/bulma/style';

function Pagination({ id, endPage, arrayToPagination, link }) {

    return (
        <footer className={paginationStyle1}
            role="navigation" aria-label="pagination"
        >
            <Link className="pagination-previous button is-link is-outlined"
                to={id - 1 >= 1 ? `/${link}/${id - 1}` : `/${link}/${id}`}>Previous
            </Link>
            <Link className="pagination-next button is-link is-outlined"
                to={id + 1 <= endPage ? `/${link}/${id + 1}` : `/${link}/${id}`}>Next page
            </Link>
            <ul className="pagination-list">
                {1 === id ?
                    <li >
                        <Link className="pagination-link is-current"
                            aria-label="Goto page 1" aria-current="page" to={`/${link}/1`}
                        >
                            1
                        </Link>
                    </li> :
                    <li><Link className="pagination-link" aria-label="Goto page 1" to={`/${link}/1`}>1</Link></li>
                }
                <li><span className="pagination-ellipsis">&hellip;</span></li>
                {endPage > 2 ? arrayToPagination.map((ele, index) => {
                    return ele === id ?
                        <li key={index}>
                            <Link className="pagination-link is-current" aria-label={`Goto page ${ele}`}
                                aria-current="page" to={`/${link}/${ele}`}>{ele}</Link>
                        </li> :
                        <li key={index}>
                            <Link className="pagination-link" aria-label={`Goto page ${ele}`}
                                to={`/${link}/${ele}`}>{ele}</Link>
                        </li>
                }) : null}
                <li><span className="pagination-ellipsis">&hellip;</span></li>
                {id === endPage ?
                    <li>
                        <Link className="pagination-link is-current" aria-label={`Goto page ${endPage}`}
                            aria-current="page" to={`/${link}/${endPage}`}>
                            {endPage}
                        </Link>
                    </li> :
                    <li>
                        <Link className="pagination-link" aria-label={`Goto page ${endPage}`}
                            to={`/${link}/${endPage}`}>{endPage}
                        </Link>
                    </li>
                }
            </ul>
        </footer>
    );
}

export default Pagination;

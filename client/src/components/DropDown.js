import { Link } from 'react-router-dom';
import React from 'react';


function DropDown({ values, setBooks, booksFromApi, setActual, setIcon, actual, icon, setAuthor, author, filters, category }) {

    const alphabeticSort = (books) => {
        return books.sort((bookA, bookB) => bookA.title.localeCompare(bookB.title))
    };

    const dateSort = (books) => {
        return books.sort((bookA, bookB) => bookA.release_date.localeCompare(bookB.release_date))
    };

    const sort = (values, el, icon) => {
        setBooks(values)
        setActual(el)
        setIcon(icon)
    };

    return (
        <div className="dropdown is-hoverable is-size-2">
            <div className="dropdown-trigger ">
                <button className="button is-size-5 is-rounded" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>{actual || author || values[0]}</span>
                    <span className="icon is-small">
                        <i className={`fas ${icon || "fa-angle-down"}`} aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content is-size-4">
                    {values[0] !== "Sort by" ? values.map((author, index) => {
                        return author !== "Author" ? <Link to="/books/1" className="dropdown-item is-size-4" key={index}
                            onClick={() => {
                                setAuthor(author);
                                filters(category, author);
                            }
                            }
                        >
                            {author}
                        </Link> :
                            <Link to="/books/1" className="dropdown-item is-size-4" key={index}
                                onClick={() => {
                                    setAuthor("");
                                    filters(category, "");
                                }
                                }
                            >
                                {author}
                            </Link>
                    }) :
                        <>
                            <Link to="/books/1" className="dropdown-item is-size-4" onClick={() =>
                                sort(alphabeticSort(booksFromApi), values[1], "fa-sort-alpha-down")}>
                                <span>{values[1]}</span>
                                <span className="icon is-small ml-4">
                                    <i className="fas fa-sort-alpha-down" aria-hidden="true"></i>
                                </span>
                            </Link>
                            <Link to="/books/1" className="dropdown-item is-size-4" onClick={() =>
                                sort(alphabeticSort(booksFromApi).reverse(), values[2], "fa-sort-alpha-up")}>
                                <span>{values[2]}</span>
                                <span className="icon is-small ml-4">
                                    <i className="fas fa-sort-alpha-up" aria-hidden="true"></i>
                                </span>
                            </Link>
                            <Link to="/books/1" className="dropdown-item is-size-4" onClick={() =>
                                sort(dateSort(booksFromApi), values[3], "fa-sort-down")}>
                                <span>{values[3]}</span>
                                <span className="icon is-small ml-4">
                                    <i className="fas fa-sort-down" aria-hidden="true"></i>
                                </span>
                            </Link>
                            <Link to="/books/1" className="dropdown-item is-size-4" onClick={() =>
                                sort(dateSort(booksFromApi).reverse(), values[3], "fa-sort-up")}>
                                <span>{values[4]}</span>
                                <span className="icon is-small ml-4">
                                    <i className="fas fa-sort-up" aria-hidden="true"></i>
                                </span>
                            </Link>
                            <Link to="/books/1" className="dropdown-item is-size-4">
                                <span>{values[5]}</span>
                                <span className="icon is-small ml-4">
                                    <i className="fas fa-sort-numeric-down" aria-hidden="true"></i>
                                </span>
                            </Link>
                            <Link to="/books/1" className="dropdown-item is-size-4">
                                <span>{values[6]}</span>
                                <span className="icon is-small ml-4">
                                    <i className="fas fa-sort-numeric-up" aria-hidden="true"></i>
                                </span>
                            </Link>

                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default DropDown;

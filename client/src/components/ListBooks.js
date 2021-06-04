import Menu from "./Menu";
import Book from "./Book";
import "../style/books/books.css";


function ListBooks({ booksFromApi, id, size }) {

    const endPage = parseInt(size / 5) !== size / 5 ? parseInt(size / 5) + 1 : size / 5
    const arrayToPagination = endPage > 4 ? id >= 4 ?
        [endPage - 3, endPage - 2, endPage - 1] :
        [2, 3, 4] : endPage === 4 ? [2, 3] : [3]

    return (
        <div id="ListBooks">
            <Menu />
            <div className="Books">
                <div className="top">

                </div>
                <div className="center">
                    {booksFromApi.slice((id - 1) * 5, id * 5).map(({ id, title, author, image_url, release_date }) =>
                        <Book key={id} id={id} image_url={image_url} title={title} author={author} release_date={release_date} />
                    )}
                </div>
                <div className="footer">
                    <footer className="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
                        <a className="pagination-previous" href={id - 1 >= 1 ? `/books/${id - 1}` : `/books/${id}`}>Previous</a>
                        <a className="pagination-next" href={id + 1 <= endPage ? `/books/${id + 1}` : `/books/${id}`}>Next page</a>
                        <ul className="pagination-list">
                            {1 === id ?
                                <li >
                                    <a className="pagination-link is-current"
                                        aria-label="Goto page 1" aria-current="page" href="/books/1">1
                                </a>
                                </li> :
                                <li><a className="pagination-link" aria-label="Goto page 1" href="/books/1">1</a></li>
                            }
                            <li><span className="pagination-ellipsis">&hellip;</span></li>
                            {endPage > 2 ? arrayToPagination.map((ele, index) => {
                                return ele === id ?
                                    <li key={index}>
                                        <a className="pagination-link is-current" aria-label={`Goto page ${ele}`}
                                            aria-current="page" href={`/books/${ele}`}>{ele}</a>
                                    </li> :
                                    <li key={index}>
                                        <a className="pagination-link" aria-label={`Goto page ${ele}`}
                                            href={`/books/${ele}`}>{ele}</a>
                                    </li>
                            }) : null}
                            <li><span className="pagination-ellipsis">&hellip;</span></li>
                            {id === endPage ?
                                <li>
                                    <a className="pagination-link is-current"
                                        aria-label={`Goto page ${endPage}`} aria-current="page" href={`/books/${endPage}`}>
                                        {endPage}
                                    </a>
                                </li> :
                                <li><a className="pagination-link" aria-label={`Goto page ${endPage}`} href={`/books/${endPage}`}>{endPage}</a></li>
                            }
                        </ul>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default ListBooks;

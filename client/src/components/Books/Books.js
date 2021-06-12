import Menu from "../Helpers/Menu";
import Pagination from "../Helpers/Pagination";
import ListBooks from "./ListBooks";
import DropDown from "./DropDown";
import { Redirect } from "react-router-dom";
import Checkbox from "./Checkbox";
import BooksUp from "./BooksUp";
import "../../style/books/books.css";
import React, { useState } from "react";


function Books({ id, size, booksFromApi, setBooks, icon, actualSort, setIcon,
    setActualSort, copyBooks, category, setCategory, genres, redirect, setRedirect,
    setAuthor, author, setCopy, favourite, setFavourite }) {

    const [text, setText] = useState("");

    const endPage = parseInt(size / 5) !== size / 5 ||
        size === 0 ? parseInt(size / 5) + 1 : size / 5;

    const arrayToPagination = endPage > 4 ? id >= 4 ?
        [endPage - 3, endPage - 2, endPage - 1] :
        [2, 3, 4] : endPage === 4 ? [2, 3] : [2];

    const books = booksFromApi.slice((id - 1) * 5, id * 5);

    const sortValues = ["Sort by", "Sort by", "Sort by", "Sort by date",
        "Sort by date", "Sort by ★", "Sort by ★"];

    const authors = books.reduce((total, { author }) => {
        return !total.includes(author) ? [...total, author] : total
    }, ["Author"]);

    const filterByText = (values) => values
        .filter(book => book.title.toUpperCase()
            .startsWith(text.toUpperCase()));

    const filterByGenre = (values, kinds) => {
        const positiveGenre = Object.keys(kinds).filter(genre => kinds[genre]);
        if (positiveGenre.length === 0) {
            return values;
        } else {
            return values.filter(book => positiveGenre.includes(book.genre));
        }
    };

    const filterByAuthor = (values, author) => {
        return values.filter(book => book.author.startsWith(author));
    };

    const filters = (kinds, author) => {
        setRedirect(true);
        setBooks(filterByAuthor(filterByText(filterByGenre(copyBooks, kinds)), author));
    };

    const handleChange = (kinds) => {
        setCategory(kinds);
        filters(kinds, author);
    };

    return (
        <div id="ListBooks">
            <Menu />
            <div className="Books">
                <div className="top">
                    <div className="up">
                        <BooksUp
                            category={category}
                            setText={setText}
                            filters={filters}
                            author={author}
                            text={text}
                            copyBooks={copyBooks}
                            setCopy={setCopy}
                            idPage={id}
                            setBooks={setBooks}
                        />
                    </div>
                    <div className="down">
                        <Checkbox category={category}
                            genres={genres}
                            handleChange={handleChange} />

                        <div className="sort-filters">
                            <DropDown
                                values={authors}
                                setBooks={setBooks}
                                booksFromApi={booksFromApi}
                                author={author}
                                setAuthor={setAuthor}
                                filters={filters}
                                category={category}
                            />
                            <DropDown
                                values={sortValues}
                                setBooks={setBooks}
                                booksFromApi={booksFromApi}
                                icon={icon}
                                setIcon={setIcon}
                                actual={actualSort}
                                setActual={setActualSort}
                            />
                        </div>
                    </div>
                </div>
                <div className="center">
                    <ListBooks books={books} favourite={favourite} setFavourite={setFavourite} />
                </div>
                <div className="footer">
                    <Pagination
                        id={id}
                        endPage={endPage}
                        arrayToPagination={arrayToPagination}
                        link="books"
                    />
                </div>
            </div>
            {redirect ? <Redirect to="/books/1" /> : null}
        </div >
    );
};

export default Books;

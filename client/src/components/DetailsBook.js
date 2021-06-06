import React, { useState, useEffect } from 'react';
import Menu from "./Menu";
import axios from "axios";
import "../style/details/details.css";
import { Redirect } from 'react-router-dom';
import Modal from './Modal';


function DetailsBook({ id, actualBooks, copyBooks, setBooks, setCopy }) {
    const initial = {
        title: "",
        author: "",
        genre: "",
        release_date: "",
        description: "",
        image_url: "",
    };
    const [{ title, author, genre, release_date, image_url, description }, setBook] = useState(initial);

    const [del, setDel] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [view, setView] = useState(false);


    useEffect(() => {
        let isMounted = true;
        axios.get(`http://localhost:5000/api/book/${id}`)
            .then((res) => {
                if (isMounted) setBook(res.data)
            })
            .catch((err) => console.log(err));
        return () => {
            isMounted = false;
        }
    }, [id]);

    useEffect(() => {
        if (del) {
            axios.delete(`http://localhost:5000/api/book/${id}`)
                .then((res) => {
                    setRedirect(true);
                    setDel(false);
                    setCopy(copyBooks.filter(book => book.id !== parseInt(id)));
                    setBooks(actualBooks.filter(book => book.id !== parseInt(id)));
                })
                .catch((err) => console.log(err));
        };
    }, [id, del, copyBooks, actualBooks, setCopy, setBooks]);

    const deleteBook = () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            setDel(true);
        };
    };

    return (
        <div id="DetailsBook">
            <Menu></Menu>
            <div className="Book">
                <div className="box has-background-link-light is-size-4">
                    <div className="notification has-background-link-light">
                        <button className="delete" onClick={deleteBook}>
                        </button>

                        <div className="header">
                            <button className="button is-rounded is-link is-outlined is-size-6 has-text-weight-bold" onClick={() => setView(true)} > Update</button>
                            {view ?
                                <Modal id={id}
                                    setView={setView}
                                    copyBooks={copyBooks}
                                    setCopy={setCopy}
                                    setBooks={setBooks}
                                /> : null
                            }
                            <p className="title  is-size-6-mobile is-size-3-tablet has-text-grey-dark has-text-weight-bold">{title}</p>
                        </div>
                        <div className="center">
                            <div className="image">
                                <img src={image_url} alt="img" />
                            </div>
                            <div className="content">
                                <p className="title  is-size-6-mobile is-size-4-tablet has-text-danger-dark">Author: </p>
                                <p className="is-size-6-mobile is-size-4-tablet has-text-grey-dark">{author}</p>
                                <p className="title  is-size-6-mobile is-size-4-tablet has-text-link-dark" >Release date:</p>
                                <p className="is-size-6-mobile is-size-4-tablet has-text-grey-dark">{release_date.slice(0, 10)}</p>
                                <p className="title  is-size-6-mobile is-size-4-tablet has-text-link-dark">Genre:</p>
                                <p className="is-size-6-mobile is-size-4-tablet has-text-grey-dark">{genre} </p>

                            </div>
                        </div>
                        <div className="description">
                            <p className="is-size-6-mobile is-size-4-tablet">{description}</p>
                        </div>
                    </div>
                </div>
            </div>
            {redirect ? <Redirect to="/books/1" /> : null}
        </div>
    );
}

export default DetailsBook;

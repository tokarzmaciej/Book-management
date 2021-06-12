import React, { useState, useEffect } from 'react';
import Menu from '../Helpers/Menu';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Modal from '../Helpers/Modal';
import Stars from '../Helpers/Stars';
import '../../style/details/details.css';
import { formatDateOnFrontend1 } from '../../functions/formatDate';
import { buttonStyle2, responsive8, titleStyle1, titleStyle2, titleStyle3, titleStyle4 } from '../../style/bulma/style';

function DetailsBook({ id, actualBooks, copyBooks, setBooks, setCopy }) {

    const [{ title, author, genre, release_date, image_url, description, rating }, setBook] = useState({});

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
                            <button className={buttonStyle2}
                                onClick={() => setView(true)} > Update</button>
                            {view ?
                                <Modal
                                    id={id}
                                    setView={setView}
                                    copyBooks={copyBooks}
                                    setCopy={setCopy}
                                    setBooks={setBooks}
                                /> : null
                            }
                            <p className={titleStyle1}>{title}</p>
                        </div>
                        <div className="center">
                            <div className="image">
                                <img src={image_url} alt="img" />
                                <Stars
                                    id={id}
                                    rating={rating}
                                    copyBooks={copyBooks}
                                    setCopy={setCopy}
                                    setBooks={setBooks}
                                />
                            </div>
                            <div className="content">
                                <p className={titleStyle2}>Author: </p>
                                <p className={titleStyle3}>{author}</p>
                                <p className={titleStyle4} >Release date:</p>
                                <p className={titleStyle3}>{release_date !== undefined && formatDateOnFrontend1(release_date)}</p>
                                <p className={titleStyle4}>Genre:</p>
                                <p className={titleStyle3}>{genre} </p>
                            </div>
                        </div>
                        <div className="description">
                            <p className={responsive8}>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
            {redirect ? <Redirect to="/books/1" /> : null}
        </div>
    );
};

export default DetailsBook;

import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { formatDateToBackend, formatDateOnFrontend1, formatDateOnFrontend2 } from '../../../functions/formatDate';
import Primary from './Primary';
import Details from './Details';
import Description from './Description';
import Footer from './Footer';

function FormBook({ id, idPage, copyBooks, setView, setCopy, setBooks, category, setCategory, genres, setGenres }) {
    const initial = {
        title: "",
        author: "",
        genre: "",
        release_date: "",
        description: "",
        image_url: "",
    };

    const titles = copyBooks.reduce((total, { title }) => {
        return !total.includes(title.toUpperCase()) ? [...total, title.toUpperCase()] : total;
    }, []);

    const formatter = (object) => {
        const toUpperFirstLetter = (value) => value.length > 1 ?
            value[0].toUpperCase() + value.slice(1) : value[0].toUpperCase();
        object.release_date = formatDateToBackend(object.release_date);
        object.title = toUpperFirstLetter(object.title);
        object.author = toUpperFirstLetter(object.author);
        object.genre = toUpperFirstLetter(object.genre);
        return object;
    };

    const [newBook, setNewBook] = useState(initial);
    const [post, setSendPost] = useState(false);
    const [put, setSendPut] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (id !== undefined) {
            axios.get(`http://localhost:5000/api/book/${id}`)
                .then((res) => {
                    const data = res.data;
                    data.release_date = formatDateOnFrontend1(data.release_date)
                    setNewBook(data);
                })
                .catch((err) => console.log(err));
        };
    }, [id]);

    useEffect(() => {
        let isMounted = true;
        if (put && id !== undefined) {
            axios.put(`http://localhost:5000/api/book/${id}`, formatter(newBook))
                .then((res) => {
                    if (res.status.toString().startsWith("2") && isMounted) {
                        setSendPut(false)
                        setView(false);
                        const data = res.data;
                        data.release_date = formatDateOnFrontend2(data.release_date);
                        const update = copyBooks.map(book => book.id === parseInt(id) ? { ...book, ...data } : book);
                        const categories = update.reduce((total, { genre }) => {
                            return { ...total, [genre]: false }
                        }, {});
                        setCategory(categories);
                        setGenres(Object.keys(categories));
                        setCopy(update);
                        setBooks(update);
                        alert("Success !");
                    }
                    else {
                        alert(res.data)
                    }
                })
                .catch((err) => console.log(err));
        };
        return () => {
            isMounted = false;
        }
    }, [put, newBook, id, setView, setCopy, setBooks, copyBooks, setCategory, setGenres]);

    useEffect(() => {
        if (post) {
            axios.post("http://localhost:5000/api/book", formatter(newBook))
                .then((res) => {
                    if (res.status.toString().startsWith("2")) {
                        setRedirect(true);
                        setSendPost(false);
                        setView(false);
                        const update = [...copyBooks, res.data];
                        const categories = update.reduce((total, { genre }) => {
                            return { ...total, [genre]: false }
                        }, {});
                        setCategory(categories);
                        setGenres(Object.keys(categories));
                        setCopy([res.data, ...copyBooks]);
                        setBooks([res.data, ...copyBooks]);
                        alert("Success !");
                    } else {
                        alert(res.data)
                    }
                })
                .catch((err) => console.log(err));
        };
    }, [newBook, post, setCopy, copyBooks, setView, setBooks, setGenres, setCategory]);

    const validate = ({ title, author, genre, image_url, release_date, description }) => {
        const errors = {};
        if (title === "") {
            errors.title = 'Required*';
        };
        if (titles.includes(title.toUpperCase()) && id === undefined) {
            errors.title = 'This title already exists';
        };
        if (/[<>,?!*]+/i.test(title)) {
            errors.title = 'Bad char (<>,?!*)';
        };
        if (author === "") {
            errors.author = 'Required*';
        };
        if (/[<>,?!*]+/i.test(author)) {
            errors.author = 'Bad char (<>,?!*)';
        };
        if (genre === "") {
            errors.genre = 'Required*';
        };
        if (genre.length > 50) {
            errors.genre = 'Bad length';
        };
        if (/[<>,.?!*]+/i.test(genre)) {
            errors.genre = 'Bad char (<>,.?!*)';
        };
        if (release_date === "") {
            errors.release_date = 'Required*';
        };
        if (description === "") {
            errors.description = 'Required*';
        };
        if (/[<>]+/i.test(description)) {
            errors.description = 'Bad char (< >)';
        };
        if (image_url === "" || !/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i.test(image_url)) {
            errors.image_url = 'Invalid image url';
        };

        return errors
    };

    const handleSubmit = (values) => {
        if (id === undefined) {
            if (window.confirm('Are you sure you want to send?')) {
                setNewBook({ ...newBook, ...values });
                setSendPost(true);
            };
        }
        else {
            if (window.confirm('Are you sure you want to send?')) {
                setNewBook(values);
                setSendPut(true);
            }
        };
    };

    const handleChange = (key, event) => {
        setNewBook({ ...newBook, [key]: event.target.value });
        setSendPut(false);
        setSendPost(false);
    };

    const reset = (resetForm) => {
        if (window.confirm('Are you sure you want to reset?')) {
            resetForm(initial);
            setNewBook(initial);
        };
    };

    return (
        <Formik
            enableReinitialize
            initialValues={newBook}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
            validate={validate}>
            {({ handleSubmit, resetForm, initialValues: { title, author, genre, release_date, image_url, description } }) => (
                <Form onSubmit={handleSubmit}>
                    <Primary
                        handleChange={handleChange}
                        title={title}
                        author={author}
                        genre={genre}
                    />
                    <Details
                        handleChange={handleChange}
                        release_date={release_date}
                        image_url={image_url}
                    />
                    <Description
                        handleChange={handleChange}
                        description={description}
                    />
                    <Footer
                        resetForm={resetForm}
                        reset={reset}
                    />
                    {redirect ? <Redirect to={`/books/${idPage}`} /> : null}

                </Form>
            )}
        </Formik>

    );
};

export default FormBook;

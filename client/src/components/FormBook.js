import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { buttonStyle4, inputStyle2, titleStyle5, titleStyle6, validationStyle } from '../style/bulma/style';
import { formatDateToBackend, formatDateOnFrontend1, formatDateOnFrontend2 } from '../functions/formatDate';

function FormBook({ id, idPage, copyBooks, setView, setCopy, setBooks }) {
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
        if (put && id !== undefined) {
            axios.put(`http://localhost:5000/api/book/${id}`, formatter(newBook))
                .then((res) => {
                    if (res.status.toString().startsWith("2")) {
                        setSendPut(false)
                        setView(false);
                        const data = res.data;
                        data.release_date = formatDateOnFrontend2(data.release_date);
                        const update = copyBooks.map(book => book.id === parseInt(id) ? { ...book, ...data } : book);
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
    }, [put, newBook, id, setView, setCopy, setBooks, copyBooks]);

    useEffect(() => {
        if (post) {
            axios.post("http://localhost:5000/api/book", formatter(newBook))
                .then((res) => {
                    if (res.status.toString().startsWith("2")) {
                        setRedirect(true);
                        setSendPost(false);
                        setView(false);
                        setCopy([res.data, ...copyBooks]);
                        setBooks([res.data, ...copyBooks]);
                        alert("Success !");
                    } else {
                        alert(res.data)
                    }
                })
                .catch((err) => console.log(err));
        };
    }, [newBook, post, setCopy, copyBooks, setView, setBooks]);

    const validate = ({ title, author, genre, image_url, release_date, description }) => {
        const errors = {};
        if (title === "") {
            errors.title = 'Required*';
        };
        if (titles.includes(title.toUpperCase()) && put) {
            errors.title = 'This title already exists';
        };
        if (/[<>,?!*]+/i.test(title)) {
            errors.title = 'Bad char (<>,.?!*)';
        };
        if (author === "") {
            errors.author = 'Required*';
        };
        if (/[<>,?!*]+/i.test(author)) {
            errors.author = 'Bad char (<>,.?!*)';
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
            errors.description = 'Bad char (<>,.?!*)';
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
            setNewBook(values);
            setSendPut(true);
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
                    <div className="primary">
                        <p className={titleStyle5}>Primary information</p>
                        <p className={titleStyle6}>Title</p>
                        <Field className={inputStyle2} name="title" placeholder="Title" value={title}
                            onChange={(event) => handleChange("title", event)} />
                        <h5 className={validationStyle} ><ErrorMessage name="title" /></h5>

                        <p className={titleStyle6}>Author</p>
                        <Field className={inputStyle2} name="author" placeholder="Author" value={author}
                            onChange={(event) => handleChange("author", event)} />
                        <h5 className={validationStyle} ><ErrorMessage name="author" /></h5>

                        <p className={titleStyle6}>Genre</p>
                        <Field className={inputStyle2} name="genre" placeholder="Genre" value={genre}
                            onChange={(event) => handleChange("genre", event)} />
                        <h5 className={validationStyle} ><ErrorMessage name="genre" /></h5>
                    </div>

                    <div className="details">
                        <p className={titleStyle5}>Details</p>
                        <p className={titleStyle6}>Relase date</p>
                        <Field className={inputStyle2} type="date" name="release_date"
                            value={release_date !== undefined && release_date.slice(0, 10)}
                            onChange={(event) => handleChange("release_date", event)} />
                        <h5 className={validationStyle} ><ErrorMessage name="release_date" /></h5>

                        <p className={titleStyle6}>Image URL</p>
                        <Field className={inputStyle2} name="image_url" placeholder="Image url" value={image_url}
                            onChange={(event) => handleChange("image_url", event)} />
                        <h5 className={validationStyle} ><ErrorMessage name="image_url" /></h5>
                        <p className={titleStyle6}>Description</p>
                    </div>

                    <div className="description">
                        <textarea className="textarea" type="textarea" name="description" placeholder="Description" value={description}
                            onChange={(event) => handleChange("description", event)} />
                        <h5 className={validationStyle} ><ErrorMessage name="description" /></h5>
                    </div>

                    <footer className="modal-card-foot">
                        <button type="button" className={buttonStyle4}
                            onClick={() => reset(resetForm)}
                        >
                            Reset
                        </button>
                        <button type="submit" className="button is-success">Save changes</button>
                    </footer>
                    {redirect ? <Redirect to={`/books/${idPage}`} /> : null}
                </Form>
            )}
        </Formik>
    );
};

export default FormBook;

import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from "axios";

function FormBook({ id, copyBooks, setView }) {

    const initial = {
        title: "",
        author: "",
        genre: "",
        release_date: "",
        description: "",
        image_url: "",
    };

    const titles = copyBooks.reduce((total, { title }) => {
        return !total.includes(title) ? [...total, title] : total;
    }, []);

    const formatter = (object) => {
        const toUpperFirstLetter = (value) => value.length > 1 ?
            value[0].toUpperCase() + value.slice(1) : value[0].toUpperCase();
        object.title = toUpperFirstLetter(object.title);
        object.author = toUpperFirstLetter(object.author);
        object.genre = toUpperFirstLetter(object.genre);
        return object;
    };

    const [newBook, setNewBook] = useState(initial);
    const [post, setSendPost] = useState(false);
    const [put, setSendPut] = useState(false);

    useEffect(() => {
        if (id !== undefined) {
            axios.get(`http://localhost:5000/api/book/${id}`)
                .then((res) => {
                    setNewBook(res.data)
                })
                .catch((err) => console.log(err));
        };
    }, [id]);

    useEffect(() => {
        if (put && id !== undefined) {
            axios.put(`http://localhost:5000/api/book/${id}`, formatter(newBook))
                .then((res) => {
                    setSendPut(false)
                })
                .catch((err) => console.log(err));
        };
    }, [put, newBook, id]);

    useEffect(() => {
        if (post) {
            axios.post("http://localhost:5000/api/book", formatter(newBook))
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => console.log(err));
        };
    }, [newBook, post]);

    const validate = ({ title, author, genre, image_url, release_date }) => {
        const errors = {};
        if (title === "") {
            errors.title = 'Required*';
        };
        if (titles.includes(title)) {
            errors.title = 'This title already exists';
        };
        if (author === "") {
            errors.author = 'Required*';
        };
        if (genre === "") {
            errors.genre = 'Required*';
        };
        if (genre.length > 50) {
            errors.genre = 'Bad length';
        };
        if (release_date === "") {
            errors.release_date = 'Required*';
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
                setView(false);
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
                        <Field className="input" name="title" placeholder="Title" value={title}
                            onChange={(event) => handleChange("title", event)} />
                        <h5 className="valueText is-size-7 has-text-danger" ><ErrorMessage name="title" /></h5>

                        <Field className="input" name="author" placeholder="Author" value={author}
                            onChange={(event) => handleChange("author", event)} />
                        <h5 className="valueText is-size-7 has-text-danger" ><ErrorMessage name="author" /></h5>

                        <Field className="input" name="genre" placeholder="Genre" value={genre}
                            onChange={(event) => handleChange("genre", event)} />
                        <h5 className="valueText is-size-7 has-text-danger" ><ErrorMessage name="genre" /></h5>
                    </div>

                    <div className="details">
                        <Field className="input" type="date" name="release_date" value={release_date}
                            onChange={(event) => handleChange("release_date", event)} />
                        <h5 className="valueText is-size-7 has-text-danger" ><ErrorMessage name="release_date" /></h5>

                        <Field className="input" name="image_url" placeholder="Image url" value={image_url}
                            onChange={(event) => handleChange("image_url", event)} />
                        <h5 className="valueText is-size-7  has-text-danger" ><ErrorMessage name="image_url" /></h5>
                    </div>

                    <div className="description">
                        <textarea className="textarea" type="textarea" name="description" placeholder="Description" value={description}
                            onChange={(event) => handleChange("description", event)} />
                    </div>

                    <footer className="modal-card-foot">
                        <button type="button" className="button has-background-danger-dark has-text-white-ter"
                            onClick={() => reset(resetForm)}
                        >
                            Reset
                        </button>
                        <button type="submit" className="button is-success">Save changes</button>
                    </footer>
                </Form>
            )}
        </Formik>
    );
};

export default FormBook;

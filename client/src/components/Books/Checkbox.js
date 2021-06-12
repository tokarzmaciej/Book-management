import React from 'react';
import { Formik, Field, Form } from 'formik';
import { responsive4 } from '../../style/bulma/style';

function Checkbox({ category, genres, handleChange }) {

    return (
        <Formik
            enableReinitialize
            initialValues={category}
            onSubmit={(values) => {
                handleChange(values)
            }}
        >
            {({ handleSubmit }) => (
                <Form onChange={handleSubmit}>
                    {genres.map((genre, index) => {
                        return <div className="check" key={index}>
                            <Field type="checkbox" name={genre} />
                            <label className={responsive4}>
                                {genre}
                            </label>
                        </div>
                    })}
                </Form>
            )}
        </Formik>
    );
};

export default Checkbox;

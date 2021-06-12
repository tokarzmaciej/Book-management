import { Field, ErrorMessage } from 'formik';
import { inputStyle2, titleStyle5, titleStyle6, validationStyle } from '../../../style/bulma/style';

function Primary({ handleChange, title, author, genre }) {

    return (
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
    );
};

export default Primary;

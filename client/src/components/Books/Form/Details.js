import { Field, ErrorMessage } from 'formik';
import { inputStyle2, titleStyle5, titleStyle6, validationStyle } from '../../../style/bulma/style';

function Details({ handleChange, release_date, image_url }) {

    return (
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
    );
};

export default Details;

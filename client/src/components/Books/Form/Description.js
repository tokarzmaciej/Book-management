import { ErrorMessage } from 'formik';
import { validationStyle } from '../../../style/bulma/style';

function Description({ handleChange, description }) {

    return (
        <div className="description">
            <textarea className="textarea" type="textarea" name="description"
                placeholder="Description" value={description}
                onChange={(event) => handleChange("description", event)}
            />
            <h5 className={validationStyle} ><ErrorMessage name="description" /></h5>
        </div>
    );
};

export default Description;

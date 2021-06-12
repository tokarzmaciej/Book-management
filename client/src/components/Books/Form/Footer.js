import { buttonStyle4 } from '../../../style/bulma/style';

function Footer({ resetForm, reset }) {

    return (
        <footer className="modal-card-foot">
            <button type="button" className={buttonStyle4}
                onClick={() => reset(resetForm)}
            >
                Reset
            </button>
            <button type="submit" className="button is-success">Save changes</button>
        </footer>
    );
};

export default Footer;

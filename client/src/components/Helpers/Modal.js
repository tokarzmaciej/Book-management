import React from 'react';
import FormBook from '../Books/Form/FormBook';

function Modal({ id, idPage, setView, copyBooks, setCopy, setBooks }) {

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Book creator</p>
                    <button className="delete" aria-label="close"
                        onClick={() => setView(false)}>
                    </button>
                </header>
                <section className="modal-card-body">
                    <FormBook
                        id={id}
                        idPage={idPage}
                        copyBooks={copyBooks}
                        setView={setView}
                        setCopy={setCopy}
                        setBooks={setBooks}
                    />
                </section>
            </div>
        </div>
    );
};

export default Modal;

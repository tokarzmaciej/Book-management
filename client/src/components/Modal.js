import React from 'react';
import FormBook from './FormBook';

function Modal({ setView, copyBooks }) {

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Book creator</p>
                    <button className="delete" aria-label="close" onClick={() => setView(false)}></button>
                </header>
                <section className="modal-card-body">
                    <FormBook copyBooks={copyBooks} setView={setView} />
                </section>

            </div>
        </div>
    );
};

export default Modal;

import React, { useState } from 'react';
import Modal from './Modal';

function BooksUp({ idPage, category, setText, filters, author, text, copyBooks, setCopy, setBooks }) {
    const buttonStyle = "button is-rounded is-link is-outlined is-size-4 has-text-weight-bold";
    const [view, setView] = useState(false);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <>
            <input className="input is-rounded  is-danger is-outlined is-size-4 "
                value={text}
                placeholder="Title ..."
                onChange={handleChange}
            />
            <button className={buttonStyle} onClick={() => filters(category, author)}>Find</button>
            <button className={buttonStyle} onClick={() => setView(true)}>Create</button>
            {view ?
                <Modal idPage={idPage}
                    setView={setView}
                    copyBooks={copyBooks}
                    setCopy={setCopy}
                    setBooks={setBooks}
                /> : null
            }
        </>
    );
};

export default BooksUp;

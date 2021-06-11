import React, { useState } from 'react';
import Modal from './Modal';
import { buttonStyle1, inputStyle1 } from '../style/bulma/style'

function BooksUp({ idPage, category, setText, filters,
    author, text, copyBooks, setCopy, setBooks }) {

    const [view, setView] = useState(false);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <>
            <input className={inputStyle1}
                value={text}
                placeholder="Title ..."
                onChange={handleChange}
            />
            <button className={buttonStyle1} onClick={() => filters(category, author)}>Find</button>
            <button className={buttonStyle1} onClick={() => setView(true)}>Create</button>
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

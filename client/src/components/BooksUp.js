import React from 'react';

function BooksUp({ category, setText, filters, author, text }) {
    const buttonStyle = "button is-rounded is-link is-outlined is-size-4 has-text-weight-bold";
    return (
        <>
            <input className="input is-rounded  is-danger is-outlined is-size-4 "
                value={text}
                placeholder="Title ..."
                onChange={(event) => setText(event.target.value)} />
            <button className={buttonStyle} onClick={() => filters(category, author)}>Find</button>
            <button className={buttonStyle}>Create</button>
        </>
    );
}

export default BooksUp;

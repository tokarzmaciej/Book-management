import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stars({ id, rating, copyBooks, setBooks, setCopy }) {
    const stars = [5, 4, 3, 2, 1];
    const [post, setPost] = useState(false);
    const [score, setScore] = useState(1);

    useEffect(() => {
        if (post) {
            axios.post(`http://localhost:5000/api/book/${id}/rate`, { score: score })
                .then((res) => {
                    setPost(false);
                    const update = copyBooks.map(book => book.id === parseInt(id) ? { ...res.data } : book);
                    setCopy(update);
                    setBooks(update);
                })
                .catch((err) => console.log(err));
        };
    }, [id, post, score, copyBooks, setBooks, setCopy]);

    const handleClick = (starScore) => {
        if (window.confirm('Are you sure you want to evaluate this book ?')) {
            setScore(starScore);
            setPost(true);
        };
    };
    return (
        <div className="stars">
            {id !== undefined ?
                <div className="rating">
                    <div className="yes">
                        {stars.reverse().map(star => {
                            if (rating >= star) {
                                return <span key={star} className={`checked`} onClick={() => handleClick(star)}>★</span>
                            } else {
                                return null
                            }
                        })}
                    </div>
                    <div className="no">
                        {stars.reverse().map(star => {
                            if (rating < star) {
                                return <span key={star} className="s" onClick={() => handleClick(star)}>★</span>
                            } else {
                                return null
                            }
                        })}
                    </div>
                </div>
                :
                stars.map(star => {
                    return rating >= star ?
                        <span key={star} className="s" >★</span> :
                        <span key={star} className="">★</span>
                })
            }
        </div >
    );
}

export default Stars;


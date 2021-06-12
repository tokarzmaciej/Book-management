import React from 'react';
import { Link } from 'react-router-dom';
import { responsive5, fontStyle1 } from '../style/bulma/style';
import Stars from './Stars';
import '../style/top5/top.css';

function TopBook({ level, book: { id, image_url, title, rating } }) {


    return (
        <div id="TopBook">
            <div className="level">

                <div className="circle">{level}</div>
            </div>
            <div className="all">
                <div className="image">
                    <Link to={`/book/${id}`}><img src={image_url} alt="img" /></Link>
                    <Stars rating={rating} />
                </div>
            </div>
            <div className="title">
                <Link to={`/book/${id}`} className={`title ${responsive5} ${fontStyle1}`}>{title}</Link>
            </div>
        </div>
    );
}

export default TopBook;

import React from 'react';
import Menu from './Menu';
import TopBook from './TopBook';
import '../style/top5/top5.css'


function TopFive({ copyBooks }) {
    const array = [0, 1, 2, 3, 4];
    const top5 = copyBooks.sort((bookA, bookB) => bookB.rating - bookA.rating);
    return (
        <div id="TopFive">
            <Menu />
            <div className="top">
                {array.map(index =>
                    top5[index] !== undefined ? <TopBook key={index} book={top5[index]} level={index + 1} /> : null
                )}
            </div>
        </div>
    );
}

export default TopFive;

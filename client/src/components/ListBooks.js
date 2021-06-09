import Book from "./Book"

function ListBooks({ books }) {
    return (
        <>
            {books.map(({ id, title, author, image_url, release_date, rating }) =>
                <Book key={id} id={id} image_url={image_url} title={title} author={author} release_date={release_date} rating={rating} />
            )}
        </>
    );
};

export default ListBooks;

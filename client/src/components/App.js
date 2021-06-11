import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Books from "./Books";
import Favourites from './Favourites';
import TopFive from './TopFive';
import DetailsBook from './DetailsBook';

function App() {
  const [books, setBooks] = useState([]);
  const [copyBooks, setCopy] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [actualSort, setActualSort] = useState("Sort by");
  const [icon, setIcon] = useState("fa-angle-down");
  const [category, setCategory] = useState({});
  const [genres, setGenres] = useState([]);
  const [author, setAuthor] = useState("");
  const [favourite, setFavourite] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/book")
      .then(({ data }) => {
        const genres = data.reduce((total, { genre }) => {
          return { ...total, [genre]: false }
        }, {});
        setBooks(data);
        setCopy(data);
        setCategory(genres);
        setGenres(Object.keys(genres));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={TopFive} />
          <Route exact path="/books/:id" component={
            (routerProps) => <Books
              id={parseInt(routerProps.match.params.id)}
              size={books.length}
              booksFromApi={books}
              setBooks={setBooks}
              icon={icon}
              setIcon={setIcon}
              actualSort={actualSort}
              setActualSort={setActualSort}
              copyBooks={copyBooks}
              setCopy={setCopy}
              category={category}
              setCategory={setCategory}
              genres={genres}
              redirect={redirect}
              setRedirect={setRedirect}
              author={author}
              setAuthor={setAuthor}
              favourite={favourite}
              setFavourite={setFavourite}
            />}
          />
          <Route exact path="/book/:id" component={(routerProps) =>
            <DetailsBook
              id={routerProps.match.params.id}
              actualBooks={books}
              setBooks={setBooks}
              copyBooks={copyBooks}
              setCopy={setCopy} />}
          />

          <Route exact path="/favourites/:id" component={
            (routerProps) =>
              <Favourites
                id={parseInt(routerProps.match.params.id)}
                favourite={favourite}
                copyBooks={copyBooks}
                setFavourite={setFavourite} />
          }
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;

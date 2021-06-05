import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Books from "./Books";
import Favourites from './Favourites';
import TopFive from './TopFive';

function App() {
  const [books, setBooks] = useState([]);
  const [copyBooks, setCopy] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [actualSort, setActualSort] = useState("Sort by");
  const [icon, setIcon] = useState("fa-angle-down");
  const [category, setCategory] = useState({});
  const [genres, setGenres] = useState([])
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");


  useEffect(() => {
    axios.get("http://localhost:5000/api/book")
      .then(({ data }) => {
        const genres = data.reduce((total, { genre }) => {
          return { ...total, [genre]: false }
        }, {});
        setBooks(data)
        setCopy(data)
        setCategory(genres)
        setGenres(Object.keys(genres))
      })
      .catch((err) => console.log(err))
  }, []);


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={TopFive} />
          <Route exact path="/books/:id" component={
            (routerProps) => <Books id={parseInt(routerProps.match.params.id)}
              size={books.length}
              booksFromApi={books}
              setBooks={setBooks}
              icon={icon}
              setIcon={setIcon}
              actualSort={actualSort}
              setActualSort={setActualSort}
              copyBooks={copyBooks}
              category={category}
              setCategory={setCategory}
              genres={genres}
              redirect={redirect}
              setRedirect={setRedirect}
              author={author}
              setAuthor={setAuthor}
              text={text}
              setText={setText}
            />}

          />
          <Route exact path="/favourites" component={Favourites} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
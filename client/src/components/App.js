import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ListBooks from "./ListBooks";
import Favourites from './Favourites';
import TopFive from './TopFive';

function App() {

  const [books, setBooks] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/api/book")
      .then(({ data }) => setBooks(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={TopFive} />
          <Route exact path="/books/:id" component={
            (routerProps) => <ListBooks id={parseInt(routerProps.match.params.id)} booksFromApi={books} size={books.length} />}
          />
          <Route exact path="/favourites" component={Favourites} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

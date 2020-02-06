import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './App.css';
import Bookshelf from './components/Bookshelf';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    booksByShelf: [],
  };

  shelves = [
    {
      name: 'Currently Reading',
      code: 'currentlyReading',
    },
    {
      name: 'Want To Read',
      code: 'wantToRead',
    },
    {
      name: 'Read',
      code: 'read',
    },
  ];

  loadBooks = () => {
    BooksAPI.getAll().then(books => {
      const booksByShelf = this.shelves.map(shelf => ({
        name: shelf.name,
        books: books.filter(book => book.shelf === shelf.code),
      }));

      this.setState(prevState => ({
        ...prevState,
        booksByShelf,
      }));
    });
  };

  onChangeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      this.loadBooks();
    });
  };

  componentDidMount() {
    this.loadBooks();
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {this.state.booksByShelf.map(entry => (
                      <Bookshelf
                        title={entry.name}
                        books={entry.books}
                        onChangeShelf={this.onChangeShelf}
                      />
                    ))}
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            </Route>
            <Route path="/search">
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to="/">
                    <button className="close-search">Close</button>
                  </Link>
                  <div className="search-books-input-wrapper">
                    {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                    <input
                      type="text"
                      placeholder="Search by title or author"
                    />
                  </div>
                </div>
                <div></div>
                <div className="search-books-results">
                  <ol className="books-grid"></ol>
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;

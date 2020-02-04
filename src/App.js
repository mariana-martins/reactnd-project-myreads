import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import Book from './components/Book';
import Bookshelf from './components/Bookshelf';
import { getAll } from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
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

  componentDidMount() {
    getAll().then(books => {
      const booksByShelf = this.shelves.map(shelf => ({
        name: shelf.name,
        books: books.filter(book => book.shelf === shelf.code),
      }));

      this.setState(prevState => ({
        ...prevState,
        booksByShelf,
      }));
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div></div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.booksByShelf.map(entry => (
                  <Bookshelf title={entry.name} books={entry.books} />
                ))}
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;

import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from '../components/Book';

class Search extends React.Component {
  state = {
    books: [],
    results: [],
    error: undefined,
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(prevState => ({
        ...prevState,
        books,
      }));
    });
  }

  updateState = (results = [], error = undefined) => {
    this.setState(prevState => ({
      ...prevState,
      results,
      error,
    }));
  };

  onSearch = event => {
    event.preventDefault();
    const searchValue = event.target.value;
    if (searchValue === '') {
      // no need to search - just set empty
      this.updateState();
      return;
    }

    BooksAPI.search(searchValue).then(results => {
      if (results.error) {
        this.updateState([], results.error);
      } else {
        this.updateState(results);
      }
    });
  };

  onChangeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
      .then(() => BooksAPI.getAll())
      .then(books =>
        this.setState(prevState => ({
          ...prevState,
          books,
        }))
      );
  };

  findShelf = book => {
    const matchedBooks = this.state.books.filter(elem => book.id === elem.id);
    if (matchedBooks.length > 0) {
      return matchedBooks[0].shelf;
    }
    return 'none';
  };

  render() {
    const mappedBooks = this.state.results.map((book, index) => {
      book.shelf = this.findShelf(book);
      return (
        <Book key={index} book={book} onChangeShelf={this.onChangeShelf} />
      );
    });
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onSearch}
            />
          </div>
        </div>
        <div></div>
        <div className="search-books-results">
          <ol className="books-grid">{mappedBooks}</ol>
        </div>
      </div>
    );
  }
}

export default Search;

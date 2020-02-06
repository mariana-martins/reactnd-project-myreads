import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from '../components/Book';

class Search extends React.Component {
  state = {
    books: [],
    error: undefined,
  };
  onSearch = event => {
    event.preventDefault();
    const searchValue = event.target.value;
    if (searchValue === '') {
      // no need to search - just set empty
      this.setState(prevState => ({
        ...prevState,
        books: [],
        error: undefined,
      }));
      return;
    }

    BooksAPI.search(searchValue).then(books => {
      if (books.error) {
        this.setState(prevState => ({
          ...prevState,
          books: [],
          error: books.error,
        }));
      } else {
        this.setState(prevState => ({
          ...prevState,
          books,
          error: undefined,
        }));
      }
    });
  };

  render() {
    const mappedBooks = this.state.books.map((book, index) => (
      <Book key={index} book={book} />
    ));
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

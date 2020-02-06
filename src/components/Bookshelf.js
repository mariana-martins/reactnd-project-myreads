import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends Component {
  render() {
    const { title, books, onChangeShelf } = this.props;
    const mappedBooks = books.map(book => (
      <Book book={book} onChangeShelf={onChangeShelf} />
    ));
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{mappedBooks}</ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;

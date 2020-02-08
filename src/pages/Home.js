import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from '../components/Bookshelf';
import * as BooksAPI from '../BooksAPI';

class Home extends React.Component {
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
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.state.booksByShelf.map((entry, index) => (
              <Bookshelf
                title={entry.name}
                books={entry.books}
                key={index}
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
    );
  }
}

export default Home;

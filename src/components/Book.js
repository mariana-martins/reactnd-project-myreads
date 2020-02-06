import React, { Component } from 'react';

class Book extends Component {
  onChangeSelect = event => {
    const newShelf = event.target.value;
    this.props.onChangeShelf(this.props.book, newShelf);
    event.preventDefault();
  };
  render() {
    const {
      authors = [],
      title,
      imageLinks: { thumbnail = '' } = {},
      shelf,
    } = this.props.book;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${thumbnail}")`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select value={shelf} onChange={this.onChangeSelect}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">
            {authors.map((author, index) => (
              <span key={index}>{author}</span>
            ))}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;

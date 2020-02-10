# MyReads Project
This project is part of a group of projects to complete the React Nano Degree by Udacity. 

The propose of this project was to exercise the knowledge about React through components, state, props, etc.
Udacity provided to me a layout already done and I had to create a bookshelf app that allows an user to categorize
books using some categories.

Another mandatory functionality for the project was a limited search feature. An user could search a pre-determined
term on that search and books related to that query have to display on the page.

## How to Run

* Check out project
* Open terminal on project's folder
* Run `npm install` on Terminal to install all project dependencies
* Run `npm start` on Terminal to start the development server

## Project Structure

This project uses the following folders as its architecture.

* public: contains static files
* src/pages: contains components representing pages on this project.  The following list details each case.
    * Home.js: Home page containing bookshelves
    * Search.js: Page to search for books
* src/components: contains shared components across several pages.  The following list details each case.
    * Book.js: Component responsible for displaying a book
    * Bookshelf.js: Component responsible for displaying a bookshelf.
* src/icons: contains SVG icons used by other components 
* src: contains other source code files required for this project.  The following list details each case.
    * App.js: This is the root of your app. It contains routes to pages.
    * App.css: Styles for your app.
    * App.test.js: Used for testing. Provided with Create React App.
    * BooksAPI.js: A JavaScript API for the provided Udacity backend.
    * index.css: Global styles.
    * index.js: You should not need to modify this file. It is used for DOM rendering only.
    
## Udacity API integration

The integration is specified on [`BooksAPI.js`](src/BooksAPI.js) file, on src folder.  At this moment, this project uses the following methods.

* `getAll()`
    * Returns a Promise which resolves to a JSON object containing a collection of book objects.
    * This collection represents the books currently in the bookshelves in your app.
* `update(book, shelf)`
    * Parameter `book`: `<Object>` containing at minimum an `id` attribute
    * Parameter `shelf`: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
    * Returns a Promise which resolves to a JSON object containing the response data of the POST request
* `search(query)`
    * Parameter `query`: `<String>` containing the query to be executed.
    * Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
    * These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

### Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Contributing

This repository is a project for Udacity React Nano Degree. Therefore, I don't accept pull requests and it's available online for reviewing process.

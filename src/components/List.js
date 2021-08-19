import React from 'react';
import Booklist from './Booklist';
import { v4 } from 'uuid';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: '',
      bookSubTitle: '',
      bookAuthor: '',
      bookCategory: '',
      bookSeries: '',
      bookSeriesNo: '',
      read: 'No',
      books: [],
    };
  }

  changeHandler = (e) => {
    const nam = e.target.name;
    const val = e.target.value;
    this.setState({ [nam]: val });
  };

  addBook = (e) => {
    e.preventDefault();
    const bookNameVal = this.state.bookName;
    const bookSubTitleVal = this.state.bookSubTitle;
    const bookAuthorVal = this.state.bookAuthor;
    const readVal = this.state.read;
    const bookID = v4();
    if (bookNameVal && bookAuthorVal) {
      this.setState(
        (prevState) => ({
          books: [
            ...prevState.books,
            {
              bookName: bookNameVal,
              bookSubTitle: bookSubTitleVal,
              bookAuthor: bookAuthorVal,
              read: readVal,
              uuid: bookID,
            },
          ],
        }),
        () => {
          localStorage.setItem('books', JSON.stringify(this.state.books));
        }
      );
    }
  };

  removeBook = (index) => {
    const booksArr = [...this.state.books];
    if (booksArr) {
      this.setState(
        {
          books: booksArr.filter((book, bookIndex) => {
            return bookIndex !== index;
          }),
        },
        () => {
          localStorage.setItem('books', JSON.stringify(this.state.books));
        }
      );
    }
  };

  componentDidMount() {
    const books = localStorage.getItem('books');
    if (books) {
      this.setState({ books: JSON.parse(books) });
    }
  }

  render() {
    return (
      <>
        <div className="main">
          <div>
            <form className="bookForm" onSubmit={this.addBook}>
              <label htmlFor="bookName">Title</label>
              <input
                id="bookName"
                name="bookName"
                type="text"
                placeholder="Book Title"
                maxLength="150"
                onChange={this.changeHandler}
                required
              />
              <label htmlFor="bookSubTitle">Sub Title</label>
              <input
                id="bookSubTitle"
                name="bookSubTitle"
                type="text"
                placeholder="Sub Title"
                maxLength="150"
                onChange={this.changeHandler}
              />
              <label htmlFor="bookAuthor">Author</label>
              <input
                id="bookAuthor"
                name="bookAuthor"
                type="text"
                placeholder="Book Author"
                maxLength="150"
                onChange={this.changeHandler}
                required
              />
              <label htmlFor="read">Status</label>
              <select
                id="read"
                name="read"
                onChange={this.changeHandler}
                value={this.state.read}
              >
                <option value="Reading">Yes</option>
                <option value="No">No</option>
                <option value="Next">Next</option>
                <option value="Buy">Buy</option>
              </select>
              <input id="submit" type="submit" value="Add new book" />
            </form>
          </div>
          <Booklist books={this.state.books} removeBook={this.removeBook} />
        </div>
      </>
    );
  }
}

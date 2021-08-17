import React from 'react';

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

  submitHandler = (e) => {
    e.preventDefault();
    const bookNameVal = this.state.bookName;
    const bookSubTitleVal = this.state.bookSubTitle;
    const bookAuthorVal = this.state.bookAuthor;
    const readVal = this.state.read;
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

  saveLocal = () => {
    localStorage.setItem('books', JSON.stringify(this.state.books));
  };

  componentDidMount() {
    const books = localStorage.getItem('books');
    if (books) {
      this.setState({ books: JSON.parse(books) });
    }
  }

  render() {
    let books = this.state.books;
    return (
      <>
        <div className="main">
          <div>
            <form className="bookForm" onSubmit={this.submitHandler}>
              <label for="bookName">Title</label>
              <input
                id="bookName"
                name="bookName"
                type="text"
                placeholder="Book Title"
                maxLength="150"
                onChange={this.changeHandler}
                required
              />
              <label for="bookSubTitle">Sub Title</label>
              <input
                id="bookSubTitle"
                name="bookSubTitle"
                type="text"
                placeholder="Sub Title"
                maxLength="150"
                onChange={this.changeHandler}
                required
              />
              <label for="bookAuthor">Author</label>
              <input
                id="bookAuthor"
                name="bookAuthor"
                type="text"
                placeholder="Book Author"
                maxLength="150"
                onChange={this.changeHandler}
                required
              />
              <label for="read">Status</label>
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
          {/* ToDo: Move the following table to a separate component */}
          <div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Sub Title</th>
                  <th>Author</th>
                  <th>Read</th>
                  <th colspan="2">Settings</th>
                </tr>
              </thead>
              <tbody>
                {books.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.bookName}</td>
                      <td>{item.bookSubTitle}</td>
                      <td>{item.bookAuthor}</td>
                      <td>{item.read}</td>
                      <td id="settings">
                        <button
                          onClick={() => {
                            item.read === 'Yes'
                              ? (item.read = 'No')
                              : (item.read = 'Yes');
                            this.saveLocal();
                            this.forceUpdate();
                          }}
                        >
                          {item.read === 'Yes' ? 'Still reading' : 'Finished'}
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            this.removeBook(index);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

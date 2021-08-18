import React from 'react';

export default class Booklist extends React.Component {
  removeBook = (index) => {
    const booksArr = [...this.props.state.books];
    if (booksArr) {
      this.setState(
        {
          books: booksArr.filter((book, bookIndex) => {
            return bookIndex !== index;
          }),
        },
        () => {
          localStorage.setItem('books', JSON.stringify(this.props.state.books));
        }
      );
    }
  };

  saveLocal = () => {
    localStorage.setItem('books', JSON.stringify(this.props.state.books));
  };

  render() {
    let books = this.props.state.books;
    return (
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
    );
  }
}

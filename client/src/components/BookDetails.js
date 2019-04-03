import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {
  displayBookDetails(){
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
        <div>Title: {book.name}</div>
        <div>Genre: {book.genre}</div>
        <div>Author: {book.author.name}</div>
        <ul>{book.author.name}'s titles :
          {book.author.books.map(item=>{
            return <li key={item.id}>{item.name}</li>
          })}
        </ul>

        </div>
      )
    }
    return (
      <div>no book selected</div>
    )
  }
  render() {
    return (
      <div id="book-details">
      <div>{this.displayBookDetails()}</div>
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);

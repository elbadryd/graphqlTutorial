import React, { Component } from "react";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";
import { graphql, compose } from 'react-apollo';

class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    }
  this.handleChange = this.handleChange.bind(this);

  }
  displayAuthors() {
    let data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option>loading authors</option>
    }
    return data.authors.map((author) => {
      return (
        <option value={author.id} key={author.id}>{author.name}</option>
      )
    })
  }
  submitForm(event){
    const { name, genre, authorId } = this.state
    event.preventDefault();
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input name="name" onChange={this.handleChange} type="text" />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input name="genre" onChange={this.handleChange} type="text" />
        </div>
        <div className="field">
          <label>Author:</label>
          <select name="authorId" onChange={this.handleChange}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, { name: "addBookMutation" }),
  )(AddBook);

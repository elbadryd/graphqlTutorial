import React, { Component } from 'react';
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="Main">
          <h1>Reading List</h1>
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
import React, { Component } from 'react';
import leven from 'leven';

import './AuthorFilter.css';

class AuthorFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      selectedAuthor: '',
      loading: false,
      filteredAuthors: this.props.authors,
    };
  }

  handleAutocompleteChange = event => {
    let newState = {
      query: event.target.value,
    };
    if (this.state.selectedAuthor) {
      this.props.handleSelect(null);
      newState.selectedAuthor = '';
    }

    if (!this.state.loading) {
      newState.loading = true;

      window.setTimeout(() => {
        let filteredAuthors = this.filterAuthors();
        this.setState({ filteredAuthors: filteredAuthors, loading: false });
      }, 100);
    }

    this.setState(newState);
  };

  handleAutocompleteSelect = author => {
    this.props.handleSelect(author);
    this.setState({ query: author, selectedAuthor: author });
  };

  filterAuthors = () => {
    let resultsWithDistances = [];
    this.props.authors.forEach(author => {
      resultsWithDistances.push({
        author: author,
        distance: leven(author, this.state.query),
      });
    });
    console.log(resultsWithDistances)
    console.log(resultsWithDistances.sort((a, b) => a.distance - b.distance))
    resultsWithDistances.sort(result => result.distance).reverse();
    //let filteredAuthors = this.props.authors.filter(author => author.includes(this.state.query));
    console.log(resultsWithDistances)
    console.log(resultsWithDistances.slice(0, 5))
    return resultsWithDistances.slice(0, 5).map(result => result.author);
  };

  render() {
    return (
      <div>
        <input
          value={this.state.query}
          onChange={this.handleAutocompleteChange}
          placeholder="author"
        />
        {this.state.query &&
          !this.state.selectedAuthor && (
            <div className="dropdown-content">
              {this.state.filteredAuthors.map(author => (
                <div key={author}>
                  <div
                    className="dropdown-content-element"
                    onClick={() => this.handleAutocompleteSelect(author)}
                  >
                    <div>{author}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default AuthorFilter;

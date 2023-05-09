import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import css from './App.module.css'

export class App extends Component {
  state = {
    searchRequest: '',
    page: 1,
  };

  handleSearchSubmit = searchRequest => {
    this.setState({ searchRequest, page: 1 });
  };

  handleLoadMoreButton = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  };

  render() {
    const { searchRequest, page } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery searchRequest={searchRequest} page={page} />
        {searchRequest !== '' && (
          <Button handleButton={this.handleLoadMoreButton} />
        )}
      </div>
    );
  }
};

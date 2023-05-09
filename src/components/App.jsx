import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from 'components/Loader/Loader';
import css from './App.module.css'

export class App extends Component {
  state = {
    searchRequest: '',
    page: 1,
    loaderState: false,
  };

  handleSearchSubmit = searchRequest => {
    this.setState({ searchRequest, page: 1 });
  };

  handleLoadMoreButton = () => {
    this.toggleLoader()
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  };

  toggleLoader = () => {
    this.setState(prevState => ({ loaderState: !prevState.loaderState}))
  }

  render() {
    const { searchRequest, page, loaderState } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} toggleLoader={this.toggleLoader} />
        <ImageGallery searchRequest={searchRequest} page={page} toggleLoader={this.toggleLoader} />
        {loaderState && <Loader/>}
        {(searchRequest !== '' && !loaderState) && (
          <Button handleButton={this.handleLoadMoreButton} />
        )}
      </div>
    );
  }
};

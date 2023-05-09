import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import css from './App.module.css'

export class App extends Component {
  state = {
    searchRequest: '',
  }


  handleSearchSubmit = (searchRequest) => {
    this.setState({ searchRequest });
    // this.setState({ })
  }

  render() {
    const { searchRequest, page } = this.state;

    return <div className={css.App}>
      <Searchbar onSubmit={this.handleSearchSubmit} />
      <ImageGallery searchRequest={searchRequest} page={page} />
    </div>;
  }
  
};

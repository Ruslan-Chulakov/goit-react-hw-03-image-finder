import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import fetchImage from './Utils/API';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from 'components/Loader/Loader';

import css from './App.module.css';

export class App extends Component {
  state = {
    searchRequest: '',
    page: 1,
    data: [],
    loaderState: false,
    status: 'idle',
    error: ''
  };

  componentDidUpdate(prevProps, prevState) {
    const lastSearchRequest = prevState.searchRequest;
    const newSearchRequest = this.state.searchRequest;
    const lastPage = prevState.page;
    const newPage = this.state.page;      

    this.clearData(lastSearchRequest, newSearchRequest);

    if (lastSearchRequest !== newSearchRequest || lastPage !== newPage) {
      fetchImage(newSearchRequest, newPage, this.toggleLoader)
        .then(data =>
          this.setState({ data: [...this.state.data, ...data.hits] })
        )
        .then(this.setState({ status: 'resolved' }))
        .catch(error => this.setState({ status: 'rejected', error }));
    }
  }

   handleSearchSubmit = searchRequest => {
    this.setState({ searchRequest, page: 1 });
  };

  clearData = (oldRequest, newRequest) => {
    if (oldRequest !== newRequest) {
      this.setState({ data: [] });
    }
  };

   toggleLoader = () => {
    this.setState(prevState => ({ loaderState: !prevState.loaderState }));
  };

  handleLoadMoreButton = () => {
    this.toggleLoader();
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  };

  render() {
    const { data, searchRequest, status, loaderState, error } = this.state;

    return (
      <div className={css.App}>
        <Searchbar
          onSubmit={this.handleSearchSubmit}
          toggleLoader={this.toggleLoader}
        />
        {status === 'rejected' && (
          <div className={css.errorMessage}>{error}</div>
        )}
        <ImageGallery data={data} toggleLoader={this.toggleLoader} />
        {loaderState && <Loader />}
        {searchRequest !== '' && status === 'resolved' && (
          <Button handleButton={this.handleLoadMoreButton} />
        )}
      </div>
    );
  }
};

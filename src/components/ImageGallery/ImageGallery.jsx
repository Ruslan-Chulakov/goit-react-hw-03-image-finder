import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import fetchImage from 'components/Utils/API';
import Loader from 'components/Loader/Loader';
import Button from '../Button/Button';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    status: 'idle',
    data: [],
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const lastSearchRequest = prevProps.searchRequest;
    const newSearchRequest = this.props.searchRequest;
    const lastPage = prevState.page;
    const newPage = this.state.page;
     
    if (lastSearchRequest !== newSearchRequest || lastPage !== newPage) {
      this.clearData(lastSearchRequest, newSearchRequest);
      this.setState({ status: 'pending' });

      fetchImage(newSearchRequest, newPage)
        .then(data =>
          this.setState({ data: [...this.state.data, ...data.hits] })
        )
        .then(this.setState({ status: 'resolved' }))
        .catch(error => this.setState({ status: 'rejected', error }));
    }
  }

  clearData = (oldRequest, newRequest) => {
    if (oldRequest !== newRequest) {
      this.setState({ data: [] });
    }
  };

  handleLoadMoreButton = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  };

  render() {
    const { data, status } = this.state;

    // if (status === 'idle') {
    // };

    if (status === 'pending') {
      return <Loader />;
    };

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {data.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              );
            })}
          </ul>
          <Button handleButton={this.handleLoadMoreButton} />
        </>
      );
    }

    if (status === 'rejected') {
      return <p>Whoops, something going wrong...</p>;
    }
  }
}

export default ImageGallery;

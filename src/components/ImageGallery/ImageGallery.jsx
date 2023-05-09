import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import fetchImage from 'components/Utils/API';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    status: 'idle',
    data: [],
    error: null,
  };

 
  componentDidUpdate(prevProps, prevState) {
    const lastSearchRequest = prevProps.searchRequest;
    const newSearchRequest = this.props.searchRequest;
    const lastPage = prevProps.page;
    const newPage = this.props.page;
    const { toggleLoader } = this.props;
    
    this.clearData(lastSearchRequest, newSearchRequest);

    if (lastSearchRequest !== newSearchRequest || lastPage !== newPage) {

      fetchImage(newSearchRequest, newPage, toggleLoader)
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

 

  render() {
    const { data, status } = this.state;

    // if (status === 'idle') {
    // };

    // if (status === 'pending') {
    //   return <Loader />;
    // }

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
        </>
      );
    }

    if (status === 'rejected') {
      return <p>Whoops, something going wrong...</p>;
    }
  }
}

export default ImageGallery;

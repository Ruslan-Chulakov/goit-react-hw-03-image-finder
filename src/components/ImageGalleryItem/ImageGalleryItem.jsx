import { Component } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types'
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };
  handleClick = () => {
    this.toggleModal();
  };
  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            className={css.ImageGalleryItemImage}
            src={webformatURL}
            alt={tags}
            width="250"
            onClick={this.handleClick}
          />
        </li>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags}></img>
          </Modal>
        )}
      </>
    );
  }
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};

export default ImageGalleryItem;

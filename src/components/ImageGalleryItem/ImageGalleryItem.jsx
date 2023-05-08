import { Component } from 'react';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
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
    const { id, webformatURL, largeImageURL, tags } = this.props;
    
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
          <Modal key={id} onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags}></img>
          </Modal>
        )}
      </>
    );
  }
};

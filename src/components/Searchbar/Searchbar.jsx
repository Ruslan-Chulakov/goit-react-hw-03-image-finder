import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    request: ''
  }

  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({request: value})
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    const { onSubmit } = this.props;
    const treamedRequest = this.state.request.trim();

    onSubmit(treamedRequest);

    this.setState({ request: '' });
  }

  render() {
    const { request } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={request}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
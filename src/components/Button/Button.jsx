import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ handleButton }) {
  return (
    <button type="button" onClick={handleButton} className={css.Button}>
      Load more
    </button>
  );
}

Button.propTypes = {
  handleButton: PropTypes.func.isRequired,
};

export default Button;

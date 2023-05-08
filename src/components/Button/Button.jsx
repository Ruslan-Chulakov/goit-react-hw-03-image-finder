import css from './Button.module.css';

function Button({ handleButton }) {
  return (
    <button type="button" onClick={handleButton}
    className={css.Button}
    >
      Load more
    </button>
  );
}

export default Button;
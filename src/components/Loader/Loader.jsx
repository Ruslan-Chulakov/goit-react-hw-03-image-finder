import { Rings } from 'react-loader-spinner';
import css from './Loader.module.css'

function Loader() {
  return (
    <div className={css.Loader}>
      <Rings
        height="80"
        width="80"
        color="rgb(47, 102, 255)"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
}

export default Loader;

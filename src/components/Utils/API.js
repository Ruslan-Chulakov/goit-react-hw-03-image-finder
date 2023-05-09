import axios from 'axios';

async function fetchImage(toSearch, page, toggleloader) {
  const URL = 'https://pixabay.com/api/';
  const KEY = '?key=34196559-a18bb514e6ee4bb855d37fd2b';
  const FILTER = '&image_type=photo&orientation=horizontal&safesearch=true';
  const pagination = `&page=${page}&per_page=${12}`;
  const request = `${URL}${KEY}&q=${toSearch}${FILTER}${pagination}`;

  try {
    const response = await axios.get(request)
    toggleloader()
    return response.data
  } catch (error) {
    toggleloader()
    console.log(error.message)
  }
}

export default fetchImage;

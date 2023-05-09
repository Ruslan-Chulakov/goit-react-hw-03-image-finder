import axios from 'axios';

async function fetchImage(toSearch, page, toggleloader) {
  const URL = 'https://pixabay.com/api/';
  const KEY = '?key=34196559-a18bb514e6ee4bb855d37fd2b';
  const FILTER = '&image_type=photo&orientation=horizontal&safesearch=true';
  const pagination = `&page=${page}&per_page=${12}`;
  const request = `${URL}${KEY}&q=${toSearch}${FILTER}${pagination}`;

  const getImgData = await axios.get(request);
  const parsedImgData = await getImgData.data;
  await toggleloader();

  if (parsedImgData.hits.length === 0) {
    return Promise.reject(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  return parsedImgData
}

export default fetchImage;

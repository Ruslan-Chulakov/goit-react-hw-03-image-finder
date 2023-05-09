import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pixabay.com/api',
});

export default function fetchImage(toSearch, page) {
  console.log(toSearch)
  return api.get(
    `/?q=${toSearch}&key=34196559-a18bb514e6ee4bb855d37fd2b&per_page=12&page=${page}`
  );
}

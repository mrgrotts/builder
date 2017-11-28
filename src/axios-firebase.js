import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://builder-33628.firebaseio.com'
});

export default instance;

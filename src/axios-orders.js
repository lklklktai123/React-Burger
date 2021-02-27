import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://project-my-burger-9230a-default-rtdb.firebaseio.com/',
});
export default instance;

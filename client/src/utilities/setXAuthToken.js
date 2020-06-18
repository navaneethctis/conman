import axios from 'axios';

const setXAuthToken = () => {
  const token = localStorage.getItem('token');

  if (token) axios.defaults.headers.common['X-Auth-Token'] = token;
  else delete axios.defaults.headers.common['X-Auth-Token'];
};

export default setXAuthToken;

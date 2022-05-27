import axios from 'axios';

const API = 'https://dog.ceo/api/';

const ApiList = () => {
  return axios.get(`${API}breeds/list/all`);
};

const ApiDogs = (name) => {
  return axios.get(`${API}breed/${name.replace(/-/gi, '/')}/images/random/4`);
};

export { ApiList, ApiDogs };
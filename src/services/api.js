// outsource dependencies
import axios from 'axios';

// local dependencies

const API_QUERY = '&appid=1e8e30d723f7ffb3faa125fbfafb5991'

///693194&appid=1e8e30d723f7ffb3faa125fbfafb5991
const instance = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5',
});

export const getBaseDataRequest = () => {
  return instance({ method: 'get', url: `/find?lat=50&lon=36&cnt=30${API_QUERY}&units=metric`})
    .then(response => response.data.list)
};

export const getDataOfCityRequest = id => {
  return instance({ method: 'get', url: `weather?id=${id}${API_QUERY}&units=metric`})
    .then(response => response.data)
};

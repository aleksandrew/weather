// outsource dependencies
import axios from 'axios';

// local dependencies

const API_QUERY = '&appid=1e8e30d723f7ffb3faa125fbfafb5991'

const instance = axios.create({
  baseURL: 'http://api.openweathermap.org',
});

export const getBaseData = () => {
  return instance({ method: 'get', url: `/data/2.5/find?lat=50&lon=36&cnt=30${API_QUERY}&lang=ru`})
    .then(response => response.data.list)
};

export const getDataList = () => {
  return instance({ method: 'post', url: `/list.php?c=list`})
    .then(response => response.data.drinks)
};

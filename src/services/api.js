// outsource dependencies
import axios from 'axios';

// local dependencies

const API_QUERY = '&appid=36c1f43a7b5290d7522108114bec530d';

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const getBaseDataRequest = () => {
    return instance({ method: 'get', url: `/find?lat=50&lon=36&cnt=30${API_QUERY}&units=metric` })
        .then(response => response.data.list);
};

export const getDataOfCityRequest = id => {
    return instance({ method: 'get', url: `/weather?id=${id}${API_QUERY}&units=metric` })
        .then(response => response.data);
};

export const searchRequest = city => {
    return instance({ method: 'get', url: `forecast?q=${city}${API_QUERY}&units=metric` })
        .then(response => response.data);
};

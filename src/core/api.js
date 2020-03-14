import axios from 'axios';
import {API_URL, RESPONSE_TIMEOUT} from './config';

export const app = axios.create({
  baseURL: API_URL,
  timeout: RESPONSE_TIMEOUT,
});

// app.interceptors.request.use(request => {
//   console.log(`REQUEST ${request.method} (${request.url}):`, request.data);
//   return request;
// });

// app.interceptors.response.use(response => {
//   console.log(
//     `RESPONSE: ${response.config.method} (${response.config.url})`,
//     response.data,
//   );
//   return response;
// });

export const filterError = error => {
  let err = error;
  switch (error) {
    case 'Network Error':
      err = 'Проверьте соединение с интернетом';
      break;
    //default: err = "Что-то пошло не так! Повторите попытку позже"
  }
  return err;
};

export const getQuestionsList = () => {
  return app.get('8561o');
};

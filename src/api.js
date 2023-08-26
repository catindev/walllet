import axios from 'axios';

let BASE_URL = "https://api.ems.test.emoney.tools";
if (process.env.REACT_APP_BASE_URL) BASE_URL = process.env.REACT_APP_BASE_URL;

export const wtfError = error => {
  if (error.response.status === 403) {
      localStorage.removeItem('appToken');
      window.location.href = "/";
      return;
  }

  if (error.response) {
      console.log('Запрос был сделан и сервер ответил кодом статуса, который выходит за пределы диапазона 2xx');
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
  } else if (error.request) {
      console.log('Запрос был сделан, но ответа не было');
      console.log(error);
  } else {
      console.log('Что-то произошло при настройке запроса, что вызвало ошибку');
      console.log('Error', error.message);
  }
  console.log(error.config);
}

export const signIn = async ({ username, password }) => {
  try {
      const response = await axios.get(`${BASE_URL}/api/v1/auth`, {
          headers: {
              Authorization: `Basic ${btoa(`${username}:${password}`)}`
          }
      });
      return response.data;
  } catch (error) {
      wtfError(error);
      throw error;
  }
}

export const getUser = async (token) => {
  try {
      const response = await axios.get(`${BASE_URL}/api/v1/me`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      wtfError(error);
      throw error;
  }
}

export const getWallets = async (token) => {
  try {
      const response = await axios.get(`${BASE_URL}/api/v1/me/wallets`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      wtfError(error);
      throw error;
  }
}

export const fakeSignIn = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.username === "admin" && credentials.password === "password") {
        resolve({ token: "fake_token" });
      } else {
        reject({ error: "Invalid username or password" });
      }
    }, 1000);
  });
};

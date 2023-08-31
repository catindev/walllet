import axios from 'axios';

let BASE_URL = "https://api.ems.test.emoney.tools";
if (process.env.REACT_APP_BASE_URL) BASE_URL = process.env.REACT_APP_BASE_URL;

// API error_code
export const errors = {
  0: {
    title: "Неизвестная ошибка",
    message: "Сделайте скриншот и отправьте его в нашу тех. поддержку"
  },

  3: {
    title: "Неверный логин или пароль",
    message: "Проверьте правильно ли вы вводите данные. Если вы ранее не регистрировались, то создайте новый кошелёк."
  },

  9: {
    title: "Ошибка перевода",
    message: "Кошелек на такой номер не зарегистрирован"
  },

  30: {
    title: "Ошибка 30",
    message: "Сумма должна быть больше 1₸"
  },

  32: {
    title: "Ошибка 32",
    message: "Попытка работать с чужим кошельком"
  },

  42: {
    title: "Ошибка",
    message: "Кошелек на такой номер не зарегистрирован"
  },

  43: {
    title: "Не удалось создать новый кошелёк",
    message: "Пользователь с таким номером телефона уже зарегистрирован"
  },

  44: {
    title: "Ошибка 44",
    message: "Сессия недействительна"
  },

  2000: {
    title: "Ошибка 2000",
    message: "Номер телефона не заполнен"
  },

  2002: {
    title: "Код недействителен",
    message: "У кода, который вы вводите, вероятно уже истёк срок действия. Попробуйте вернуться на предыдущий шаг и отправить новый код"
  },

  2003: {
    title: "Ошибка регистрации",
    message: "Пользователь с таким номером телефона уже зарегистрирован"
  },

  2013: {
    title: "Ошибка 2013",
    message: "Неверный код"
  },

  2014: {
    title: "Ошибка 2014",
    message: "Можно отправлять только одно сообщение в минуту"
  }
};

export const wtfError = error => {

  // Токен истёк
  if (error.response?.data?.error_code === 44) {
    alert(44)
    localStorage.removeItem('Bearer');
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

/* Withdrawals */

export const tranferToWallet = async ({ token, from, to, amount }) => {
  console.log({ token, from, to, amount });

  try {
    const headers = { 'Authorization': `Bearer ${token}` };
    const agentByPhone = await axios.get(`${BASE_URL}/api/v1/client?phone=${to}`, { headers });
    const { id: payee } = agentByPhone.data;
    if (!payee) throw ({ error_code: 0, message: "Не удалось получить id кошелька получателя" });

    const transerBody = {
      payor_wallet: from,
      beneficiary_agent: payee,
      amount: amount * 100,
      metadata: {
        description: "Transfer from Walllet.app"
      }
    };


    const transfer = await axios({ method: 'post', url: `${BASE_URL}/api/v1/transaction`, headers, data: transerBody, })
    const { id: transferID, status: transferStatus } = transfer.data;
    if (!transferID) throw ({ error_code: 0, message: "Не удалось создать транзакцию на перевод" });
    if (!transferStatus === 400) throw ({ error_code: 0, message: "Не удалось создать транзакцию на перевод" });

    const approveBody = { id: transferID, approve: "APPROVED" };
    const approveTransfer = await axios({ method: 'patch', url: `${BASE_URL}/api/v1/transaction`, headers, data: approveBody });
    const { status: transactionStatus } = approveTransfer.data;
    if (transactionStatus !== 100) {
      throw ({ error_code: 0, message: "Не удалось подтвердить транзакцию" })
    }
    return approveTransfer.data;
  } catch (error) {
    wtfError(error);
    throw error;
  }
}

/* Регистрация пользователя */

// 1. Отправляем SMS на номер
export const Verify = async ({ phone }) => {
  try {
    const response = await axios.post(`${BASE_URL}/cmp/verify`, { phone_number: phone });
    return response.data;
  } catch (error) {
    wtfError(error);
    throw error;
  }
}

// 2. Проверяем код (из SMS)
export const CheckCode = async ({ phoneNumber, smsCode }) => {
  try {
    const response = await axios.patch(`${BASE_URL}/cmp/verify`, { phone_number: phoneNumber, secret: smsCode });
    return response.data;
  } catch (error) {
    wtfError(error);
    throw error;
  }
}

// 3. Завершаем регистрацию
export const registration = async ({ name, password, token }) => {
  console.log({ name, password, token });
  const headers = { 'Authorization': `Bearer ${token}` };
  const body = {
    full_name: name, password,
    email: "", uin: "", country: "",
    address: "", company: "", position: "",
    // системное легаси (спрашивать у Павла )
    owner_id: 1, currency: 1
  };
  const request = { method: 'post', url: `${BASE_URL}/cmp/register`, headers, data: body };
  try {
    const response = await axios(request);
    return response.data;
  } catch (error) {
    wtfError(error);
    throw error;
  }
}

export const fakeSignIn = (credentials) => {
  console.log("credentials", credentials)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.username === "admin" && credentials.password === "password") {
        resolve({ token: "fake_token" });
      } else {
        reject({ error: "Invalid username or password" });
      }
    }, 2000);
  });
};

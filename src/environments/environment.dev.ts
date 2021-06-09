export const environment = {
  production: false,
  BASE_URL: 'http://localhost:3000',
  USER: {
    REGISTER_USER: '/user/addUser'
  },
  PASSWORD: {
    ADD_LOG_PASSWORD: '/user/addPassword/',
    EDIT_PASSWORD: '/user/editPassword/',
    DELETE_USER: '/user/deleteUser/:userId',
    DELETE_LOG: '/user/deleteLog/',
    LIST_PASSWORD: '/user/listPassword/'
  },
  LOGIN: {
    LOGIN_USER: '/login'
  }
};

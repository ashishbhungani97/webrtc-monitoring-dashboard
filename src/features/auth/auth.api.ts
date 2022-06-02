import api from '../../app/axios';

export const userSigninApi = (data: any) => {
  return api.post('account/login', data);
};

export const userSignupApi = (data: any) => {
  return api.post('account/register', data);
};

export const getUserProfilepApi = () => {
  return api.get('account/profile');
};

export const updateUserProfileApi = (data: any) => {
  return api.post('account/profile', data);
};

export const updateUserPasswordApi = (data: any) => {
  return api.post('account/password', data);
};

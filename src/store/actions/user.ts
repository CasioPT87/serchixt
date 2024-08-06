import { Action } from '../../types';

const addUser: Action<string> = (payload) => ({
  type: 'ADD_USER',
  payload,
});

export default {
  addUser,
};

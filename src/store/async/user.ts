import { userActions } from '../actions';
import { RootState, AppThunk, AppThunkDispatch } from '../../types';

function getUserMock(userId?: number): AppThunk {
  return (dispatch: AppThunkDispatch, getState: () => RootState) => {
    // simulates http call
    return new Promise((res) => {
      setTimeout(() => {
        const response = 'Joan Garriga';
        res(response);
      }, 5000);
    }).then((data) => {
      // when the response is here, we can update the store now
      if (typeof data === 'string') {
        dispatch(userActions.addUser(data));
        return;
      }
    });
  };
}

export default {
  getUserMock,
};

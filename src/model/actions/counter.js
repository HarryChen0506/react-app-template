import {
  ADD,
  MINUS,
} from '../constants/counter';

export const add = () => ({
  type: ADD,
});
export const minus = () => ({
  type: MINUS,
});

const getInfo = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject({ code: 1, msg: '111' });
  }, 2000);
});

// 异步的action
export function asyncAdd() {
  return async (dispatch) => {
    // setTimeout(() => {
    //   dispatch(add());
    // }, 2000);
    try {
      await getInfo();
    } catch (err) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(err);
    }
  };
}

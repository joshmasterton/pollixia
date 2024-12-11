import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { PopupType } from '../types/slice.types';

const initialState: { popups: PopupType[] } = {
  popups: [],
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    addPopup: (state, action) => {
      if (state.popups.length >= 3) {
        state.popups.shift();
      }

      state.popups.push(action.payload);
    },
    removePopup: (state, action) => {
      state.popups = state.popups.filter(
        (popup) => popup.id !== action.payload,
      );
    },
  },
});

export const { addPopup, removePopup } = popupSlice.actions;
export default popupSlice.reducer;

export const activatePopup = (
  dispatch: Dispatch,
  text: string,
  title?: string,
) => {
  const id = `${Date.now() - Math.random()}`;
  dispatch(
    addPopup({
      id,
      text,
      title,
    }),
  );
  return id;
};

export const clearPopup = (dispatch: Dispatch, id: string) => {
  dispatch(removePopup(id));
};

export const checkCookieNotify = (dispatch: Dispatch) => {
  const localCookieNotify = localStorage.getItem('pollixia_cookie_notify');

  if (!localCookieNotify) {
    activatePopup(
      dispatch,
      'This site uses secure tokens for authentication. By continuing, you agree to our Privacy Policy.',
      'We value your privacy',
    );
  }
};

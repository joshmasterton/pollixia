import { createSlice, Dispatch } from '@reduxjs/toolkit';

const initialState: {
  localTheme: 'light' | 'dark';
} = {
  localTheme: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.localTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

export const getTheme = (dispatch: Dispatch) => {
  const localTheme = localStorage.getItem('pollixia_theme');
  const metaThemeColor = document.querySelector('meta[name=theme-color]');

  if (!localTheme) {
    localStorage.setItem('pollixia_theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    metaThemeColor?.setAttribute('content', 'rgb(15, 15, 20)');
    dispatch(setTheme('dark'));
    return 'dark';
  } else {
    dispatch(setTheme(localTheme));
    document.documentElement.setAttribute('data-theme', localTheme);
    metaThemeColor?.setAttribute(
      'content',
      localTheme === 'dark' ? 'rgb(15, 15, 20)' : 'rgb(235, 235, 245)',
    );
    return localTheme;
  }
};

export const updateTheme = (dispatch: Dispatch, newtheme: 'dark' | 'light') => {
  localStorage.setItem('pollixia_theme', newtheme);
  getTheme(dispatch);
};

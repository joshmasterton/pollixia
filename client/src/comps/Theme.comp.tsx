import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { getTheme, updateTheme } from '../features/themeSlice.feature';
import { BiMoon, BiSun } from 'react-icons/bi';

export const Theme = () => {
  const dispatch = useAppDispatch();
  const { localTheme } = useAppSelector((state) => state.theme);

  useEffect(() => {
    getTheme(dispatch);
  }, [localTheme]);

  return (
    <div className={`theme ${localTheme}`}>
      <button
        type="button"
        className={`${localTheme === 'dark' ? 'active' : ''}`}
        onClick={() => updateTheme(dispatch, 'dark')}
      >
        <div>Dark</div>
        <BiMoon />
      </button>
      <button
        type="button"
        className={`${localTheme === 'light' ? 'active' : ''}`}
        onClick={() => updateTheme(dispatch, 'light')}
      >
        <div>Light</div>
        <BiSun />
      </button>
    </div>
  );
};

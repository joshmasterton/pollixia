import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { checkCookieNotify, clearPopup } from '../features/popupSlice.feature';

export const Popup = () => {
  const dispatch = useAppDispatch();
  const { popups } = useAppSelector((state) => state.popup);

  useEffect(() => {
    checkCookieNotify(dispatch);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (popups.length > 0) {
        clearPopup(dispatch, popups[0].id);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, popups]);

  return (
    <div id="popups">
      {popups &&
        popups.map((popup) => (
          <div key={popup.id}>
            {popup.title && <h3>{popup.title}</h3>}
            <div>{popup.text}</div>
            <button
              type="button"
              className="background fit"
              onClick={() => clearPopup(dispatch, popup.id)}
            >
              <div>Okay</div>
            </button>
          </div>
        ))}
    </div>
  );
};

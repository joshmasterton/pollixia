import { BiError } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

export const Error = () => {
  return (
    <div id="error">
      <BiError />
      <h1>404!</h1>
      <h2>Page not found!</h2>
      <div>Unexpected application error!</div>
      <NavLink to="/" className="primary">
        <div>Back to home</div>
      </NavLink>
    </div>
  );
};

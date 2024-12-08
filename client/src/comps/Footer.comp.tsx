import { NavLink } from 'react-router-dom';
import logo from '../assets/loopza.png';
import { RxGithubLogo } from 'react-icons/rx';
import { FaFacebook } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

export const Footer = () => {
  return (
    <div className="footer">
      <div>
        <NavLink to="/outside">
          <RxGithubLogo />
        </NavLink>
        <NavLink to="/outside">
          <FaFacebook />
        </NavLink>
        <NavLink to="/outside">
          <RiInstagramFill />
        </NavLink>
      </div>
      <main>
        <NavLink to="/polls">
          <p>Polls</p>
        </NavLink>
        <NavLink to="/create">
          <p>Create</p>
        </NavLink>
        <NavLink to="/results">
          <p>Results</p>
        </NavLink>
      </main>
      <footer>
        <div className="img">
          <img alt="logo" src={logo} className="full paddingSmall end" />
        </div>
        <p>©2024 Josh Masterton. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

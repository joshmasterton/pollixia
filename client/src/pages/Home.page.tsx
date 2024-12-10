import { NavLink } from 'react-router-dom';
import { Footer } from '../comps/Footer.comp';
import logo from '../assets/loopza.png';

export const Home = () => {
  return (
    <>
      <div id="home">
        <img className="logo" alt="logo" src={logo} />
        <header>
          <h1>Vote. Poll. Answer.</h1>
          <div>
            Let`s find out what people think, Vote or make a poll to find out!
          </div>
        </header>
        <main>
          <NavLink to="/polls" className="primary">
            <div>Get started</div>
          </NavLink>
        </main>
        <footer>
          <div>
            <h2>Your polls, your way.</h2>
            <div>Quickly craft engaging polls tailored to your needs</div>
          </div>
          <div>
            <h2>Everyone has a voice</h2>
            <div>
              Pollixia allows you to create, share, and engage with polls in
              real time. Dive into dynamic analytics, explore results instantly,
              and make confident, data-driven decisions.
            </div>
          </div>
          <div>
            <h2>Decisions made easy</h2>
            <div>Connect with others through meaningful insights</div>
          </div>
        </footer>
        <Footer />
      </div>
    </>
  );
};

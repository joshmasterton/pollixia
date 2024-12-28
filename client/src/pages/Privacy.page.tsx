import { Footer } from '../comps/Footer.comp';
import { Nav } from '../comps/Nav.comp';
import { Side } from '../comps/Side.comp';

export const Privacy = () => {
  return (
    <>
      <Nav type="return" />
      <Side />
      <div id="privacy">
        <main>
          <h2>Data collection and usage</h2>
          <div>
            We use Firebase Authentication to securely log users into our
            application. This service generates secure tokens stored in the
            browser`s local storage or session storage. These tokens are
            necessary for the functionality of our application.
          </div>
          <h2>Your rights</h2>
          <div>
            You have the right to access, update, or delete your data. For any
            privacy-related concerns, contact us at joshmasterton@tuta.io.
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

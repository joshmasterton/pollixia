import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home.page';
import { Auth } from './pages/Auth.page';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthInitializor } from './utilities/AuthInitializor.utilities';
import { Protected, Public } from './utilities/RouteGuards';
import { Create } from './pages/Create.page';
import { Polls } from './pages/Polls.page';
import { Results } from './pages/Results.page';
import './style/App.scss';
import { PollPage } from './pages/Poll.page';

export const routes = [
  {
    path: '/',
    element: (
      <Public>
        <Home />
      </Public>
    ),
  },
  {
    path: '/polls',
    element: (
      <Public>
        <Polls />
      </Public>
    ),
  },
  {
    path: '/poll/:pollId',
    element: (
      <Public>
        <PollPage />
      </Public>
    ),
  },
  {
    path: '/create',
    element: (
      <Protected>
        <Create />
      </Protected>
    ),
  },
  {
    path: '/vote',
    element: (
      <Public>
        <Polls />
      </Public>
    ),
  },
  {
    path: '/results',
    element: (
      <Public>
        <Results />
      </Public>
    ),
  },
  {
    path: '/auth',
    element: (
      <Public>
        <Auth />
      </Public>
    ),
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export const App = () => {
  return (
    <Provider store={store}>
      <AuthInitializor>
        <RouterProvider
          future={{
            v7_startTransition: true,
          }}
          router={router}
        />
      </AuthInitializor>
    </Provider>
  );
};

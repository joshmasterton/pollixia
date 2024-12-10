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
import { PollPage } from './pages/PollPage.page';
import './style/App.scss';
import { Error } from './comps/Error.comp';

export const routes = [
  {
    path: '/',
    element: (
      <Public>
        <Home />
      </Public>
    ),
    errorElement: <Error />,
  },
  {
    path: '/polls',
    element: (
      <Public>
        <Polls />
      </Public>
    ),
    errorElement: <Error />,
  },
  {
    path: '/poll/:pollId',
    element: (
      <Public>
        <PollPage />
      </Public>
    ),
    errorElement: <Error />,
  },
  {
    path: '/create',
    element: (
      <Protected>
        <Create />
      </Protected>
    ),
    errorElement: <Error />,
  },
  {
    path: '/vote',
    element: (
      <Public>
        <Polls />
      </Public>
    ),
    errorElement: <Error />,
  },
  {
    path: '/results',
    element: (
      <Public>
        <Results />
      </Public>
    ),
    errorElement: <Error />,
  },
  {
    path: '/auth',
    element: (
      <Public>
        <Auth />
      </Public>
    ),
    errorElement: <Error />,
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

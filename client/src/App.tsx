import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home.page';
import { Auth } from './pages/Auth.page';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthInitializor } from './utilities/AuthInitializor.utilities';
import { Protected, Public } from './utilities/RouteGuards';
import { Create } from './pages/Create.page';
import { Polls } from './pages/Polls.page';
import './style/App.scss';

export const routes = [
  {
    path: '/',
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: '/polls',
    element: (
      <Protected>
        <Polls />
      </Protected>
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
      <Protected>
        <Create />
      </Protected>
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

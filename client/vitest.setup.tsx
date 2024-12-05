import { beforeEach, vitest } from 'vitest';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { AuthInitializor } from './src/utilities/AuthInitializor.utilities';
import { store } from './src/store';
import React from 'react';
import '@testing-library/jest-dom';
import { routes } from './src/App';

// Mock firebase globally
vitest.mock('firebase/auth', async () => {
  const actual = await vitest.importActual('firebase/auth');
  return {
    ...actual,
    onAuthStateChanged: vitest.fn(),
  };
});

// Mock axios globally
vitest.mock('axios', () => ({
  default: {
    get: vitest.fn().mockResolvedValue({ data: {} }),
    post: vitest.fn().mockResolvedValue({ data: {} }),
    put: vitest.fn().mockResolvedValue({ data: {} }),
    delete: vitest.fn().mockResolvedValue({ data: {} }),
  },
}));

beforeEach(() => {
  vitest.clearAllMocks();
});

export const mockUser = {
  uid: '123',
  displayName: 'Mock User',
  email: 'mockuser@example.com',
  photoURL: 'http://mock.photo.url/mockuser.jpg',
};

export const TestApp = ({ initalEntry = '/' }: { initalEntry: string }) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [initalEntry],
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  });

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

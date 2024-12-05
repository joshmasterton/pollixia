import { describe, expect, Mock, test, vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import { onAuthStateChanged } from 'firebase/auth';
import { mockUser, TestApp } from '../../vitest.setup';
import React, { act } from 'react';

describe('Create', () => {
  test('Should render create poll page', async () => {
    (onAuthStateChanged as Mock).mockImplementation((_auth, callback) => {
      callback({
        mockUser,
        getIdToken: vitest.fn().mockResolvedValueOnce('1'),
      });
      return () => {};
    });

    await act(async () => {
      render(<TestApp initalEntry="/create" />);
    });

    expect(screen.queryByText('Create poll')).toBeInTheDocument();
  });
});

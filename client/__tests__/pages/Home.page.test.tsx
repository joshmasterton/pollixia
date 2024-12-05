import { describe, expect, Mock, test, vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import { onAuthStateChanged } from 'firebase/auth';
import { mockUser, TestApp } from '../../vitest.setup';
import React, { act } from 'react';

describe('Home', () => {
  test('Should render home page', async () => {
    (onAuthStateChanged as Mock).mockImplementation((_auth, callback) => {
      callback({
        mockUser,
        getIdToken: vitest.fn().mockResolvedValueOnce('1'),
      });
      return () => {};
    });

    await act(async () => {
      render(<TestApp initalEntry="/" />);
    });

    expect(screen.queryByText('Vote. Poll. Answer.')).toBeInTheDocument();
  });
});

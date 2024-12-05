import { describe, expect, Mock, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { onAuthStateChanged } from 'firebase/auth';
import { TestApp } from '../../vitest.setup';
import React, { act } from 'react';

describe('Auth', () => {
  test('Should render auth page', async () => {
    (onAuthStateChanged as Mock).mockImplementation((_auth, callback) => {
      callback(undefined);
      return () => {};
    });

    await act(async () => {
      render(<TestApp initalEntry="/auth" />);
    });

    expect(
      screen.queryByText('Please sign in to continue'),
    ).toBeInTheDocument();
  });
});

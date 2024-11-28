import { describe, expect, Mock, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { onAuthStateChanged } from 'firebase/auth';
import { TestApp } from '../../vitest.setup';
import React from 'react';

describe('Auth', () => {
  test('Should render auth page', () => {
    (onAuthStateChanged as Mock).mockImplementation((_auth, callback) => {
      callback(undefined);
      return () => {};
    });

    render(<TestApp initalEntry="/" />);
    expect(
      screen.queryByText('Please sign in to continue'),
    ).toBeInTheDocument();
  });
});

import { describe, expect, Mock, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { onAuthStateChanged } from 'firebase/auth';
import { mockUser, TestApp } from '../../vitest.setup';
import React from 'react';

describe('Home', () => {
  test('Should render home page', () => {
    (onAuthStateChanged as Mock).mockImplementation((_auth, callback) => {
      callback({ mockUser });
      return () => {};
    });

    render(<TestApp initalEntry="/" />);
    expect(screen.queryByText('Vote. Poll. Answer.')).toBeInTheDocument();
  });
});

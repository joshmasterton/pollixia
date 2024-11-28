import { describe, expect, Mock, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { onAuthStateChanged } from 'firebase/auth';
import { mockUser, TestApp } from '../../vitest.setup';
import React from 'react';

describe('Create', () => {
  test('Should render create poll page', () => {
    (onAuthStateChanged as Mock).mockImplementation((_auth, callback) => {
      callback({ mockUser });
      return () => {};
    });

    render(<TestApp initalEntry="/create" />);
    expect(screen.queryByText('Create poll')).toBeInTheDocument();
  });
});

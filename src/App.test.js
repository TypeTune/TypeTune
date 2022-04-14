import { render, screen } from '@testing-library/react';
import App from './App';
import { TextProvider } from './context/TextContext';
import { UserProvider } from './context/UserContext';

test('one equals one', () => {
  expect(1).toEqual(1);
});

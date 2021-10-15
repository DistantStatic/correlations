import { render, screen } from '@testing-library/react';
import App from './App';

/**
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/



it('renders accounts modal', () => {
  render(<App />);
  const accountModal = screen.getByText('Choose Eth Account')
  expect(accountModal).toBeInTheDocument();
})

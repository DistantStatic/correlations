import { render, screen } from '@testing-library/react';
import AccountChooser from './account-chooser';

it('should display an account when given', () => {
    render(<AccountChooser />);
    const accountModal = screen.getByText(/Choose An Account/i)
})

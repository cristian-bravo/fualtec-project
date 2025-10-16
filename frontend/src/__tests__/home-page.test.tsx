import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '../features/public/pages/home-page';

describe('HomePage', () => {
  it('muestra CTAs principales', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Conoce más/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Acceso Clientes/i })).toBeInTheDocument();
  });
});

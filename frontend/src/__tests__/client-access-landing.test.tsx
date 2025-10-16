import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ClientAccessLanding } from '../features/auth/pages/client-access-landing';

describe('ClientAccessLanding', () => {
  it('muestra enlaces principales del portal', () => {
    render(
      <MemoryRouter>
        <ClientAccessLanding />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Solicitar registro/i })).toBeInTheDocument();
  });
});

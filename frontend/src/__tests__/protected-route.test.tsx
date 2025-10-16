import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components/protected-route';
import { AuthProvider } from '../hooks/use-auth';

describe('ProtectedRoute', () => {
  it('redirige al login cuando no hay sesión', () => {
    render(
      <MemoryRouter initialEntries={['/privado']}>
        <AuthProvider>
          <Routes>
            <Route element={<ProtectedRoute allowedRoles={['cliente']} />}>
              <Route path="/privado" element={<div>Privado</div>} />
            </Route>
            <Route path="/client-access/login" element={<div>Login</div>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});

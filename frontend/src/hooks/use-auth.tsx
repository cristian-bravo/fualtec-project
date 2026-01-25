import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode
} from 'react';
import { authApi } from '../lib/api/auth-api';
import { storage } from '../lib/storage';
import type { AuthUser } from '../types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'midominio_token';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(storage.get(TOKEN_KEY));
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setIsInitialized(true);
        return;
      }

      try {
        const profile = await authApi.me();
        setUser(profile);
      } catch (error) {
        storage.remove(TOKEN_KEY);
        setToken(null);
      } finally {
        setIsInitialized(true);
      }
    };

    bootstrap();
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    storage.set(TOKEN_KEY, response.token);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  }, []);

  const logout = useCallback(() => {
    storage.remove(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    const profile = await authApi.me();
    setUser(profile);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isInitialized,
      login,
      logout,
      refreshProfile
    }),
    [isInitialized, login, logout, refreshProfile, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../graphql/types/auth';
import { useApolloClient } from '@apollo/client';
import { GET_USER_DETAILS } from '../graphql/queries/user.queries';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser); 

        client.writeQuery({
          query: GET_USER_DETAILS,
          data: {
            getUserDetails: parsedUser,
          },
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        logout();
      }
    }
  }, [client]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    client.resetStore();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      isAuthenticated: !!user,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

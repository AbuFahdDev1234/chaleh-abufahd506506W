import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['/api/user'],
    queryFn: async () => {
      try {
        const response = await apiRequest('/api/user');
        return response;
      } catch (error) {
        // User not logged in
        return null;
      }
    },
    retry: false
  });

  useEffect(() => {
    if (userData?.user) {
      setUser(userData.user);
    } else {
      setUser(null);
    }
  }, [userData]);

  // Show auth modal on first visit if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      const hasVisited = localStorage.getItem('hasVisited');
      if (!hasVisited) {
        setShowAuthModal(true);
        localStorage.setItem('hasVisited', 'true');
      }
    }
  }, [isLoading, user]);

  const login = (userData: User) => {
    setUser(userData);
    queryClient.invalidateQueries({ queryKey: ['/api/user'] });
  };

  const logout = async () => {
    try {
      await apiRequest('/api/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    queryClient.clear();
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    isLoading,
    showAuthModal,
    setShowAuthModal,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
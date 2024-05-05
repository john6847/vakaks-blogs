"use client"
import { getCurrentUser } from '@/lib/auth';
import { SessionStatus } from '@/lib/config/constants';
import { Account } from '@/types';
import React from 'react'

type Status = typeof SessionStatus[keyof typeof SessionStatus];

const InitialState = {
  user: null,
  status: SessionStatus.unauthenticated,
  isAuthenticated: false,
}

type ContextType = {
  user: Account | null;
  status: Status;
  isAuthenticated: boolean;
}

export const AuthContext = React.createContext<ContextType>(InitialState);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<Account | null>(InitialState.user);
  const [status, setStatus] = React.useState<Status>(InitialState.status);

  React.useEffect(() => {
    const fetchUser = async () => {
      setStatus(SessionStatus.loading);
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setStatus(SessionStatus.authenticated);
      } else {
        setUser(null);
        setStatus(SessionStatus.unauthenticated);
      }
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={
      {
        user,
        status,
        isAuthenticated: status === SessionStatus.authenticated
      }
    }>
      {children}
    </AuthContext.Provider>
  )

}

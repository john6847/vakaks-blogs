import { getCurrentUser, isUserAuthenticated } from '@/lib/auth';
import { Account } from '@/types';
import React from 'react';

const SessionStatus = {
  authenticated: "authenticated",
  unauthenticated: "unauthenticated",
  loading: "loading"
} as const;

type Status = typeof SessionStatus[keyof typeof SessionStatus];

type Props = {
  getOnlyStatus?: boolean;
}
export const useSession = (mode?: 'only-status' | 'with-session') => {
  const [user, setUser] = React.useState<Account | null>();
  const [status, setStatus] = React.useState<Status>(SessionStatus.loading);

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
    const isAuthenticated = async () => {
      const res = await isUserAuthenticated();
      if (res) {
        setStatus(SessionStatus.authenticated);
      } else {
        setStatus(SessionStatus.unauthenticated);
      }
    };
    if (mode === 'only-status') {
      isAuthenticated();
    } else {
      fetchUser();
    }
  }, [mode]);

  return { user, status };

}



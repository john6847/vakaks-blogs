import { AuthContext } from '@/app/auth-provider';
import { getCurrentUser, isUserAuthenticated } from '@/lib/auth';
import { SessionStatus } from '@/lib/config/constants';
import { Account } from '@/types';
import React from 'react';

type Status = typeof SessionStatus[keyof typeof SessionStatus];

type Props = {
  getOnlyStatus?: boolean;
}
export const useSession = (mode?: 'only-status' | 'with-session') => {
  
  const {user, status, isAuthenticated} = React.useContext(AuthContext);

  return { 
    user, 
    status,
    isAuthenticated,
   };

}



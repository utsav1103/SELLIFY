import {useAuth, useUser} from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { syncUser } from '../lib/api';

function useUserSync() {

    const {isSignedIn} = useAuth();
    const {user} = useUser();
 
    const {mutate: syncUserMutate, isPending, isSuccess} = useMutation({mutationFn:syncUser});

    useEffect(()=>{
        if(isSignedIn && user && !isPending && !isSuccess){
            syncUserMutate({
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName || user.firstName,
                imageUrl: user.imageUrl,
            })
        }
    },[isSignedIn, user, syncUserMutate, isPending, isSuccess]);

  return {isSynced: isSuccess};
  
}

export default useUserSync
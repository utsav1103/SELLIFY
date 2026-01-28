import {useAuth, useUser} from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { syncUser } from '../lib/api';

function useUserSync() {

    const {isSignedIn} = useAuth();
    const {user} = useUser();
 
    const {mutate: syncUserMutate, isPending, isSuccess ,isError} = useMutation({mutationFn:syncUser,
    onError:(error)=>{
        console.error("Error syncing user:", error);
    }
    });

    useEffect(()=>{
        if(isSignedIn && user && !isPending && !isSuccess && !isError){
            syncUserMutate({
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName || user.firstName,
                imageUrl: user.imageUrl,
            })
        }
    },[isSignedIn, user, syncUserMutate, isPending, isSuccess, isError]);

  return {isSynced: isSuccess};
  
}

export default useUserSync
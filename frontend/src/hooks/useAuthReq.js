import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import api from "../lib/axios"

let isInterceptorRegistered = false;

function useAuthReq() {

    const { getToken, isLoaded, isSignedIn } = useAuth();

    useEffect(() => {
        if(isInterceptorRegistered) return;
        isInterceptorRegistered = true;
        //inslcude the token to teh request
        const interceptor = api.interceptors.request.use(
            async (config) => {
                if (isSignedIn) {
                    const token = await getToken();
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                }
                return config;
            });
       return () => {
        api.interceptors.request.eject(interceptor);
        isInterceptorRegistered = false;
       }
 }, [getToken, isSignedIn]);

    return {
        isSignedIn,
        isClerkLoaded:isLoaded
    };
}

export default useAuthReq
import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import api from "../lib/axios"


function useAuthReq() {

    const { getToken, isLoaded, isSignedIn } = useAuth();

    useEffect(() => {
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
        }
 }, [getToken, isLoaded, isSignedIn]);

    return {
        isSignedIn,
        isClerkLoaded:isLoaded
    };
}

export default useAuthReq
import { useAuth0 } from "@auth0/auth0-react";
import { useState, createContext, useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext();
const AuthStateContext = props => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [ isTokenReady, setTokenReady ] = useState(false);
    const [ token, setToken ] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            getAccessTokenSilently().then(token => { 
                axios.interceptors.request.use(config => {
                    config.headers.Authorization = `Bearer ${token}`;
                    return config;
                });
                setTokenReady(true);
                setToken(token);
            });
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider
            value={{ token, isTokenReady }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthStateContext };
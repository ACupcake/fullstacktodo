import { useState } from 'react';
import { JwtToken } from './types';

function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        if (!tokenString) {
            return null
        }
        // TODO: verify if token is valid and refresh
        return JSON.parse(tokenString);
    };

    const [token, setToken] = useState<JwtToken | null>(getToken());

    const saveToken = (userToken: JwtToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    return { token, setToken: saveToken }
}

export default useToken;

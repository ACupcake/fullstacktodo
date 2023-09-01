import axios from "axios";

const getToken = () => {
    let tokenString = localStorage.getItem('token') || null;
    let tokenJson = { access: "", refresh: "" };
    
    if (tokenString != null) {
        tokenJson = JSON.parse(tokenString)
    }

    return tokenJson;
}

let tokenJson = getToken();

let authorization_header = {'Authorization': `Bearer ${tokenJson?.access}`}

const api = axios.create({
 baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8000/api/v1",
 headers: tokenJson !== null && tokenJson.access !== "" ? authorization_header : {},
});

api.interceptors.response.use((response) => response, (error) => {
    // FIXME: logar desligar e ligar app no terminal e dar
    // f5 na pagina, bug de request infinito 

    // Refresh access token
    if (error.response?.data.code === "token_not_valid") {
        api.post("/token/refresh/", { refresh: tokenJson.refresh })
            .then((e) => {
                tokenJson.access = e.data.access
                localStorage.setItem('token', JSON.stringify(tokenJson));
                window.location.reload()
            })
            .catch((e) => {
                localStorage.setItem('token', "");
                throw e
            })
    }
    throw error;
});

export default api;
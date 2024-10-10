import axios from "axios";

import baseUrl from "../baseUrl";


export async function login(loginRequest) {

    console.log(baseUrl);
    
    try{
        const response = await axios.post(`${baseUrl}/auth/login`, {
            username: loginRequest.username,
            password: loginRequest.password
        },
            {
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data;
    }catch(error){
        return error.response.data;
    }
}
export async function register(registerRequest) {

    console.log(baseUrl);
    
    try{
        const response = await axios.post(`${baseUrl}/auth/register`, {
            username: registerRequest.username,
            password: registerRequest.password,
            name: registerRequest.name
        },
            {
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data;
    }catch(error){
        return error.response.data;
    }
}
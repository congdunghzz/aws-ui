import axios from "axios";

import authHeader from "../requestHeader";
import baseUrl from "../baseUrl";


export async function postImage(payload) {
    try {
        const response = await axios.post(`${baseUrl}/image`, payload,
            {
                headers:
                {
                    ...authHeader()
                }
            }
        )
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }

}


export async function getImages(page, size) {

    try {
        const response = await axios.get(`${baseUrl}/image?page=${page}&size=${size}`, {
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteImages(postId) {

    try {
        const response = await axios.delete(`${baseUrl}/image/${postId}`, {
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}
export async function download(postId) {

    try {
        const response = await axios.get(`${baseUrl}/image/download/${postId}`, {
            headers: {
                ...authHeader()
            },
            responseType: 'blob'
        })
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

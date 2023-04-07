import React from 'react';
import axios from "axios";
import {saveLocalStorage} from "./localStorage";
import env from "react-dotenv";


export const httpRequest = async(type: string, url: string, body: object | null, accessToken: string | null) => {

    const BASE_URL = (env.ENVIRONMENT === 'production') ? env.URL_API : 'http://localhost:8081/api';

    console.log(BASE_URL);
    const config = {
        headers: {Authorization: (accessToken) ? `Bearer ${(accessToken)}` : 'none'}
    };

    let httpResponse = null;

    try {
        switch (type) {
            case 'get':
                await axios.get(BASE_URL + url, config).then(
                    response => {
                        httpResponse = response;
                    }
                );
                break;
            case 'post':
                await axios.post(BASE_URL + url, body, config).then(
                    response => {
                        httpResponse = response;
                    }
                );
                break;
            case 'put':
                await axios.put(BASE_URL + url, body, config).then(
                    response => {
                        httpResponse = response;
                    }
                );
                break;
            case 'delete':
                await axios.delete(BASE_URL + url, config).then(
                    response => {
                        httpResponse = response;
                    }
                );
                break;
        }
    } catch (err: any) {
        console.log(err.code);
        if (err.response?.data.message === "Unauthorized" || err.code === 'ERR_NETWORK') {
            saveLocalStorage('complexData', '');
            document.location = '/login';
        }
        return err;
    }

    return httpResponse;
}

import React from 'react';
import axios from "axios";
import {AuthContextProps} from "../context/authContext";


export const httpRequest = async(type: string, url: string, body: object | null, auth: AuthContextProps) => {

    const BASE_URL = 'http://localhost:8081/api';

    const config = {
        headers: {Authorization: (auth.complexData.accessToken) ? `Bearer ${(auth.complexData.accessToken)}` : 'none'}
    };

    let httpResponse = null;

    switch (type) {
        case 'get':
            await axios.get(BASE_URL + url, config).then(
                response => {
                    httpResponse =  _evaluateResponse(response, auth);
                }
            ).catch(err => _evaluateResponse(err, auth));
            break;
        case 'post':
            await axios.post(BASE_URL + url, body, config).then(
                response => {
                    httpResponse =  _evaluateResponse(response, auth);
                }
            ).catch(err => _evaluateResponse(err, auth));
            break;
        case 'put':
            await axios.put(BASE_URL + url, body, config).then(
                response => {
                    httpResponse =  _evaluateResponse(response, auth);
                }
            ).catch(err => _evaluateResponse(err, auth));
            break;
        case 'delete':
            await axios.delete(BASE_URL+ url, config).then(
                response => {
                    httpResponse =  _evaluateResponse(response, auth);
                }
            ).catch(err => _evaluateResponse(err, auth));
            break;
    }

    return httpResponse;
}

function _evaluateResponse(response: any, auth: AuthContextProps) {
    if (response?.response?.data?.message === "Unauthorized") {
        auth.setAuth('');
        document.location = '/login';
    }
    return response;
}

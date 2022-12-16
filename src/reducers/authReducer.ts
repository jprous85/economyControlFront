import {Auth} from "../interfaces/AuthInterface";

type ScopeAction = {
    type: 'accessToken', payload: {complexData: string}
}

export const authReducer = (state: Auth, action: ScopeAction): Auth => {

    switch (action.type) {
        case 'accessToken':
            return {
                ...state,
                accessToken: action.payload.complexData
            }
        default:
            return state;
    }

}

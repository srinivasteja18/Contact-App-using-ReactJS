import {SET_CONTACTS, SET_LOADING, UPDATE_CONTACT, SINGLE_CONTACT} from './Action.types'

export default function Reducer(state,action) {
    switch (action.type) {
        case SET_CONTACTS:
           return  action.payload == null ? {...state, contacts:[]} : {...state, contacts:action.payload}
        case UPDATE_CONTACT:
            return {...state, UpdateContact:action.payload, ContactKey:action.key}
        case SET_LOADING:
            return {...state, isLoading:action.payload}
        case SINGLE_CONTACT:
            return {...state, contact:action.payload}
        default:
            break;
    }
}

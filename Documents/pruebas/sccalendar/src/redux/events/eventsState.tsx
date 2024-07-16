import {ActionTypes} from "../actionTypes.ts";

export const initialStateEvents = {
    screen: {
        screenName: '',
        events: {}
    }
};

const eventsState = (state = initialStateEvents, action: {type: string, payload: any}): any => {
    switch(action.type) {
        case ActionTypes.GET_EVENTS:
            return action.payload;
        default:
            return state;
    }
};

export  default eventsState;

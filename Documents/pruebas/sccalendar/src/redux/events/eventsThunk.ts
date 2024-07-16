import {ActionTypes} from "../actionTypes.ts";
import useHTTP from "../../hooks/useHttp.ts";
import Swal from "sweetalert2";
import moment from 'moment';
export const thunkGetEvents = (screenValue: {name: string, type: number}) =>  (dispatch: any) => {
    useHTTP({
        method: 'GET',
        endpoint: 'reservations',
        query: `?date=${new Date().toISOString()}&screen=${screenValue.type}`,
    }).then((res: {code: number, data: any}): void => {
        if (res.code === 200) {
            const convertedObject = {};
            for (const key in res.data[0]) {
                const numberKey = Number(key);
                convertedObject[numberKey] = res.data[0][key];
            }
            dispatch({type: ActionTypes.GET_EVENTS, payload: {screenName: screenValue, events: convertedObject}});
        }
    }).catch(e => {
        console.log("Error in thunkGetEvents", e)
    })
}

export const thunkCreateEvent = (screenValue: {name: string, type: number}, start: string, end: string) =>  (dispatch: any) => {
    useHTTP({
        method: 'POST',
        endpoint: 'reservations',
        body: {
            screen: screenValue.type,
            startDate: new Date(start).toISOString(),
            endDate: new Date(end).toISOString(),
            startWeek: moment(start).week(),
            endWeek: moment(start).week(),
        },
    }).then((res: {code: number, data: any}): void => {
        if (res.code === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Reserva exitoso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => dispatch(thunkGetEvents(screenValue)))
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al crear evento',
                text: res.data.error,
                customClass: {
                    confirmButton: 'swal2-confirm'
                }
            });
        }
    }).catch(e => {
        console.log("Error in thunkGetEvents", e)
    })
}

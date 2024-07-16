import useHTTP from "../../hooks/useHttp.ts";
import {ActionTypes} from "../actionTypes.ts";
import {initialStateEvents} from "../events/eventsState.tsx";
import {initialStateAuth} from "./authState.tsx";
import {thunkGetEvents} from "../events/eventsThunk.ts";
import Swal from 'sweetalert2';



export const thunkLogin = (body: {document: string, password: string}, callback: () => void) => dispatch => {
    useHTTP({
        method: 'POST',
        endpoint: 'login',
        body: body,
    }).then((response) => {
        if(response.code === 201) {
            localStorage.setItem(
                '@Login',
                response.data.accessToken,
            );
            dispatch({
                type: ActionTypes.SET_AUTHENTICATION,
                payload: response,
            })
            dispatch(thunkGetEvents({name: 'Pantalla 1', type: 1}))
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                callback();
            });
        }  else if (response.code === 401) {
            // Mostrar alerta de error de credenciales inválidas
            Swal.fire({
                icon: 'error',
                title: 'Credenciales inválidas',
                text: 'La cédula de identidad o la contraseña son incorrectas. Por favor, inténtelo de nuevo.',
                customClass: {
                    confirmButton: 'swal2-confirm'
                }
            });
        } else {
            // Manejar otros códigos de respuesta aquí si es necesario
            Swal.fire({
                icon: 'error',
                title: 'Error en el inicio de sesión',
                text: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.',
                customClass: {
                    confirmButton: 'swal2-confirm'
                }
            });
        }
    }).catch(error => console.log("Error in login", error))
}



export const thunkRegister = (body: {document: string, password: string, career: string, fullName: string}, callback: () => void) => dispatch => {
    useHTTP({
        method: 'POST',
        endpoint: 'register',
        body: body,
    }).then((response) => {
        if(response.code === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                callback();
            });
        }  else if (response.code === 400) {
            // Mostrar alerta de error de credenciales inválidas
            Swal.fire({
                icon: 'error',
                title: 'Campos inválidos',
                text: 'Verifique sus campos.',
                customClass: {
                    confirmButton: 'swal2-confirm'
                }
            });
        } else {
            // Manejar otros códigos de respuesta aquí si es necesario
            Swal.fire({
                icon: 'error',
                title: 'Error en el registro de cuenta',
                text: response.data.message,
                customClass: {
                    confirmButton: 'swal2-confirm'
                }
            });
        }
    }).catch(error => console.log("Error in login", error))
}


export const thunkLogout = (callback: () => void) => (dispatch) => {
    dispatch({
        type: ActionTypes.GET_EVENTS,
        payload: initialStateAuth,
    });
    dispatch({
        type: ActionTypes.SET_AUTHENTICATION,
        payload: initialStateEvents,
    });
    localStorage.removeItem('@Login');
    callback();
}

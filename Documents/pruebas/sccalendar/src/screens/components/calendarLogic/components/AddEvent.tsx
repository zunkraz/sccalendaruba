import React from 'react';
import moment from 'moment';
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";

function AddEvent (props) {
    const eventsState = useSelector(state => state.events)
    return (
        <React.Fragment>
            {props.editMode ?
                <Typography component={'h6'} variant={'h6'} textAlign={'center'}>
                    Desea eliminar el evento del horario <br/> <span
                    style={{color: '#A02955'}}>{moment(props.start).format('HH:mm a')} - {moment(props.end).format('HH:mm a')}</span><br/> si está de acuerdo presione "Eliminar"
                </Typography>
                :
                <Typography component={'h6'} variant={'h6'} textAlign={'center'}>
                    Usted va a reservar  el horario <br/> <span style={{color: '#A02955'}}>{moment(props.start).format('HH:mm a')} - {moment(props.end).format('HH:mm a')}</span><br/> en la consola "{eventsState?.screenName?.name || ''}”  <br/> en
                    la fecha:<span
                    style={{color: '#A02955'}}>{moment(props.start).format('DD/MM/YY')}</span>
                </Typography>
            }
        </React.Fragment>
    );
}

export default AddEvent;

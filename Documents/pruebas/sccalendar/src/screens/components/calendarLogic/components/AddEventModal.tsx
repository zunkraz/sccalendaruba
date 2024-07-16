import { Modal, Button } from 'antd';
import { useState, useEffect } from 'react';
import AddEvent from './AddEvent';
import {useDispatch, useSelector} from "react-redux";
import {thunkCreateEvent} from "../../../../redux/events/eventsThunk.ts";

const AddEventModal = (props) => {
    const [title, setTitle] = useState('');
    const events = useSelector(state => state.events);
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.eventTitle) {
            setTitle(props.eventTitle);
        } else {
            setTitle('');
        }
    }, [props.eventTitle]);



    const handleOk = () => {
        props.onOk("Reservado");
        dispatch(thunkCreateEvent(events.screenName, props.eventStart, props.eventEnd));
    };

    return (
        <Modal
            open={props.visible}
            onOk={handleOk}
            onCancel={props.onClose}
            footer={[
                <Button key="back" onClick={props.onCancel} style={{borderColor: '#274372'}}>
                    {props.editMode ? 'Eliminar' : 'Cancelar'}
                </Button>,
                !props.editMode && <Button key="submit" type="primary" onClick={handleOk} style={{backgroundColor: '#274372'}}>
                    Reservar
                </Button>,

            ]}
        >
            <AddEvent
                title={title}
                editMode={props.editMode}
                start={props.eventStart}
                end={props.eventEnd}
                onTimeChange={props.onTimeChange}
            />
        </Modal>
    );
};

export default AddEventModal;

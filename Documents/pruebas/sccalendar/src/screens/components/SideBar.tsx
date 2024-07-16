import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import logoUba from "../../assets/ubaLogo.svg";
import { useDispatch } from "react-redux";
import { thunkGetEvents } from "../../redux/events/eventsThunk";
import {useNavigate} from "react-router-dom";
import {thunkLogout} from "../../redux/auth/authThunks.ts";

const screens = [
    { name: 'Pantalla 1', type: 1 },
    { name: 'Pantalla 2', type: 2 },
    { name: 'Pantalla 3', type: 3 },
    { name: 'Pantalla 4', type: 4 },
    { name: 'Pantalla 5', type: 5 }
];

const styles = {
    sidebar: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column' as 'column',
        padding: '1em',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    logo: {
        marginBottom: '1em',
    },
    button: {
        marginTop: '10px',
    },
    title: {
        marginBottom: '1em',
    },
    logoutButton: {
        marginTop: 'auto',
        backgroundColor: '#A02955',
    },
};

const Sidebar: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>(screens[0].name);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const callback = () => navigate("/")
    const handleScreenBtn = (screen: { name: string, type: number }) => {
        setSelectedButton(screen.name);
        dispatch(thunkGetEvents(screen));
    };

    return (
        <div style={styles.sidebar}>
            <img
                src={logoUba}
                alt="Logo de la empresa"
                loading="lazy"
                style={styles.logo}
            />
            <Typography component="h6" variant="h6" style={styles.title}>
                Seleccione una pantalla
            </Typography>
            {screens.map((screen) => (
                <Button
                    key={screen.name}
                    variant={selectedButton === screen.name ? 'contained' : 'outlined'}
                    onClick={() => handleScreenBtn(screen)}
                    style={styles.button}
                >
                    {screen.name}
                </Button>
            ))}
            <Button variant="contained" style={styles.logoutButton} onClick={() => dispatch(thunkLogout(callback))}>
                Cerrar sesión
            </Button>
        </div>
    );
};

export default Sidebar;

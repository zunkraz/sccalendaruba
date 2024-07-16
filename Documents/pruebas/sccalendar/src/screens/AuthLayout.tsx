import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import logoUba from '../assets/ubaLogo.svg'
import LandingLayout from "./components/LandingLayout.tsx";
import { useNavigate} from "react-router-dom";
import {thunkLogin} from "../redux/auth/authThunks.ts";
import {useDispatch} from "react-redux";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.primary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Solaris Systems
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function SideComponent(props: any) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(thunkLogin({document: `${data.get('idCard')}`,password: `${data.get('password')}`}, () => navigate('calendar')))
    };
    return (
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={logoUba}
                        alt={'Logo de la empresa'}
                        loading="lazy"
                    />
                    <Typography component="h1" variant="h5" fontWeight={'bold'}>
                        Bienvenido al sistema de reserva {' '}
                        <Box component="span" color="text.secondary" fontWeight={'bold'}>
                            Gamer
                        </Box>
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="idCard"
                            label="Cédula de identidad"
                            name="idCard"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Iniciar Sesión
                        </Button>
                        <Grid container>
                            <Button onClick={() => navigate("/register")} variant="text">
                                <Typography variant={'subtitle1'}>
                                    No tienes cuenta? Regístrate aquí
                                </Typography>
                            </Button>
                        </Grid>
                        <Copyright sx={{mt: 5}}/>
                    </Box>
                </Box>
    );
}

function AuthLayout() {
    return (
        <Grid container component='main' sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                sm={12} // Ocupa 5 de las 12 columnas en pantallas pequeñas y medianas
                md={3} // Ocupa 5 de las 12 columnas en pantallas grandes
                component={Paper}
                elevation={6}
                square
            >
              <SideComponent/>
            </Grid>
            <Grid
                item
                md={9} // Ocupa 7 de las 12 columnas en pantallas grandes
                sx={{
                    background: 'linear-gradient(to right, #274372, #A02955)',
                    backgroundSize: 'cover',
                    padding: 2, // Ejemplo de padding para espacio interior
                    color: '#FFF', // Ejemplo de color de texto
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <LandingLayout/>
            </Grid>
        </Grid>
    );
}

export default AuthLayout;

import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Grid,
    InputAdornment,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {thunkRegister} from "../redux/auth/authThunks.ts";

interface Errors {
    document: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    career: string;
}

const RegistrationForm: React.FC = () => {
    const [document, setdocument] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [fullName, setfullName] = useState<string>('');
    const [career, setcareer] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({
        document: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        career: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
        event: ChangeEvent<HTMLInputElement | { value: unknown }>
    ) => {
        setter(event.target.value as string);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        let validationErrors: Errors = {
            document: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            career: '',
        };

        if (!document) {
            validationErrors.document = 'Identificación es requerida';
        } else if (!/^\d+$/.test(document)) {
            validationErrors.document = 'Identificación debe ser numérica';
        }

        if (!password) {
            validationErrors.password = 'Contraseña es requerida';
        } else if (password.length < 6) {
            validationErrors.password = 'Contraseña debe tener al menos 6 caracteres';
        }

        if (!confirmPassword) {
            validationErrors.confirmPassword = 'Confirmar contraseña es requerida';
        } else if (confirmPassword !== password) {
            validationErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        if (!fullName) {
            validationErrors.fullName = 'Nombre completo es requerido';
        }

        if (!career) {
            validationErrors.career = 'career es requerida';
        }

        if (
            validationErrors.document ||
            validationErrors.password ||
            validationErrors.confirmPassword ||
            validationErrors.fullName ||
            validationErrors.career
        ) {
            setErrors(validationErrors);
        } else {
            // Aquí puedes manejar el envío del formulario
            dispatch(thunkRegister({
                document,
                password,
                fullName,
                career
            }))
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(to right, #274372, #A02955)',
            }}
        >
            <Container component={Paper} maxWidth="xs" sx={{ padding: 4 }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Registro
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Nombre completo"
                        type="text"
                        value={fullName}
                        onChange={handleInputChange(setfullName)}
                        error={Boolean(errors.fullName)}
                        helperText={errors.fullName}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Identificación"
                        type="text"
                        value={document}
                        onChange={handleInputChange(setdocument)}
                        error={Boolean(errors.document)}
                        helperText={errors.document}
                    />
                    <FormControl variant="outlined" margin="normal" fullWidth error={Boolean(errors.career)}>
                        <InputLabel id="career-label">Carrera</InputLabel>
                        <Select
                            labelId="career-label"
                            value={career}
                            onChange={handleInputChange(setcareer)}
                            label="Carrera"
                        >
                            <MenuItem value="Ing. de sistemas">Ing. de sistemas</MenuItem>
                            <MenuItem value="Ing. eléctrica">Ing. eléctrica</MenuItem>
                            <MenuItem value="Psicología">Psicología</MenuItem>
                            <MenuItem value="Derecho">Derecho</MenuItem>
                            <MenuItem value="Comunicación social">Comunicación social</MenuItem>
                        </Select>
                        {errors.career && (
                            <Typography color="error" variant="caption">
                                {errors.career}
                            </Typography>
                        )}
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handleInputChange(setPassword)}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Confirmar Contraseña"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={handleInputChange(setConfirmPassword)}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={toggleShowConfirmPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Registrar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => {
                                        setdocument('');
                                        setPassword('');
                                        setConfirmPassword('');
                                        setfullName('');
                                        setcareer('');
                                        setErrors({
                                            document: '',
                                            password: '',
                                            confirmPassword: '',
                                            fullName: '',
                                            career: '',
                                        });
                                        navigate('/');
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Container>
        </Box>
    );
};

export default RegistrationForm;

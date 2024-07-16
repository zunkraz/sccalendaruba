import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NoMatch from './screens/NoMatch.tsx';
import AuthLayout from './screens/AuthLayout.tsx';
import HomeLayout from './screens/HomeLayout.tsx';
import {Providers} from "./redux/Provider.tsx";
import RegisterLayout from "./screens/RegisterLayout.tsx";

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#274372', // Color principal
        },
        secondary: {
            main: '#A02955', // Color secundario
        },
        text: {
            primary: '#274372', // Color principal del texto
            secondary: '#A02955', // Color secundario del texto
            white: '#FFFFFF',
        },
    },
    typography: {
        allVariants: {
            color: '#274372', // Aplica a todas las variantes de tipografía por defecto
        },
    },
});

function App() {
    localStorage.setItem(
        '@BASE_URL',
        'https://gamer-room-reserves.onrender.com',
    );
    return (
        <ThemeProvider theme={customTheme}>
            <Providers>
                <Routes>
                    <Route index path={'/'} element={<AuthLayout />} />
                        <Route index element={<HomeLayout />} />
                        <Route index path="register" element={<RegisterLayout />} />
                        <Route index path="calendar" element={<HomeLayout />} />
                        <Route index path="*" element={<NoMatch />} />
                </Routes>
            </Providers>
        </ThemeProvider>
    );
}

export default App;

import Box from '@mui/material/Box';
import landingOne from '../../assets/landingOne.png'
import landingTwo from '../../assets/landingTwo.png'
import landingThree from '../../assets/landingThree.png'
const LandingLayout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/*<img*/}
            {/*    src={landingOne}*/}
            {/*    alt={'Logo de la empresa'}*/}
            {/*    loading="lazy"*/}
            {/*/>*/}
            {/*<img*/}
            {/*    src={landingTwo}*/}
            {/*    alt={'Logo de la empresa'}*/}
            {/*    loading="lazy"*/}
            {/*/>*/}
            {/*<img*/}
            {/*    src={landingThree}*/}
            {/*    alt={'Logo de la empresa'}*/}
            {/*    loading="lazy"*/}
            {/*/>*/}
        </Box>
    );
};

export default LandingLayout;

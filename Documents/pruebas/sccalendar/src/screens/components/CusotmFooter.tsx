import { Layout } from 'antd';

const { Footer } = Layout;

const CustomFooter = () => {
    return (
        <Footer style={{ height: '7vh' , backgroundColor: 'rgba(39, 67, 114, 1)', color: 'white', textAlign: 'center' }}>
            ©2024  Universidad Bicentenaria de Aragua en colaboración con Solaris System.
        </Footer>
    );
};

export default CustomFooter;

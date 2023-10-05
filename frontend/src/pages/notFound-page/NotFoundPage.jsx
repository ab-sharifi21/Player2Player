import HeaderSecond from '../../components/header-second/HeaderSecond';
import Footer from '../../components/footer/Footer';
import MainButton from '../../components/main-button/MainButton';
import gameOverImage from '../../assets/space.webp';
import { useNavigate } from 'react-router-dom';
import './notfound.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    function handleClick () {
        navigate('/');
    }

    return (
        <>
            <HeaderSecond />
            <main className='not-found'>
                <img src={gameOverImage} alt="Imagen de Game Over" />
                <h1>GAME <br /><span>OVER</span></h1>
                <h2>PUNTUACIÓN <span>404</span></h2>
                <p>¡Más suerte la próxima vez!</p>
                <MainButton text={'Volver a cargar'} handleClick={handleClick}/>
            </main>
            <Footer />
        </>
    );
};

export default NotFoundPage;

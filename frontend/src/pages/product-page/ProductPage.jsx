import MainHeader from '../../components/header-main/MainHeader';
import Footer from '../../components/footer/Footer';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useGetProduct from '../../hooks/useGetProduct';
import Loading from '../../components/loading/Loading';
import UserWithRating from '../../components/user-with-rating/UserWithRating';
import MainButton from '../../components/main-button/MainButton';
import SliderPhotoProduct from './SliderPhotoProduct';
import { useContext, useState } from 'react';
import { UserAuthContext } from '../../context/UserAuthContext';
import { addOrderService } from '../../service';
import ReadOnlyRating from '../../components/readOnly-rating/ReadOnlyRating';

const ProductPage = () => {
    const [errorBack, setErrorBack] = useState(false);
    const { idProduct } = useParams();
    const { article, error, loading } = useGetProduct(idProduct);
    const { token } = useContext(UserAuthContext);
    const navigate = useNavigate();

    const { product, productImages, user } = article;
    const userSellerId = user?.id;

    if (loading) return <Loading/>;
    if (error) return <p>{error}</p>;

    const handleClick = async () => {
        try {
            await addOrderService(idProduct, token, { userSellerId });
        } catch (error) {
            setErrorBack(error.message);
        }
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    return (
        <>
            <MainHeader/>
            <main>
                <UserWithRating
                    username={user?.first_name}
                    lastName={user?.last_name}
                    avatar={`${import.meta.env.VITE_BACK_URL}/uploads/${user?.avatar}`}/>
                <ReadOnlyRating value={product?.avg_review_stars}/>
                <article>
                    <SliderPhotoProduct productImages={productImages}/>
                    <h2>{product?.name}</h2>
                    <p>{product?.category}</p>
                    <p>{product?.description}</p>
                    <p>{user?.city}, {new Date(product?.time).toLocaleString('es-ES', { month: 'short', day: '2-digit' })}</p>
                    <p>{product?.state}</p>
                    <p>{product?.price} €</p>
                    {
                        token
                            ? <MainButton text={'Comprar'} handleClick={handleClick}/>
                            : <Link to={'/user/login'}><MainButton text={'Comprar'}/></Link>
                    }
                </article>
                {
                    errorBack ? <p>{errorBack}</p> : null
                }
            </main>
            <Footer/>
        </>
    );
};

export default ProductPage;

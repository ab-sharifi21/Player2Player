import Footer from '../../components/footer/Footer';
import MainHeader from '../../components/header-main/MainHeader';
import { UserAuthContext } from '../../context/UserAuthContext';
import { useContext } from 'react';
import useSeeOrders from '../../hooks/useSeeOrders';
import ProductOrderInfo from './ProductOrderInfo';
import Loading from '../../components/loading/Loading';

const SeeOrders = () => {
    const { token } = useContext(UserAuthContext);
    const { orders, error, loading } = useSeeOrders(token);

    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <MainHeader />
            <main>
                { error
                    ? <p>{'No tienes ningún pedido de momento'}</p>
                    : <>
                        <section>
                            <h2>Tus Pedidos</h2>
                            <ul>
                                {
                                    orders.orders
                                        ? orders.orders.filter((order) => order.status === 'Pendiente').map((order) => {
                                            return <li key={order.id}>
                                                <ProductOrderInfo order={order} />
                                            </li>;
                                        })
                                        : <p>{error.message}</p>
                                }

                            </ul>
                        </section>
                        <section>
                            {
                                orders.orders && orders.orders.some((order) => {
                                    return order.status === 'Aceptado';
                                })
                                    ? <>
                                        <h2>Aceptados</h2>
                                        <ul>
                                            {orders.orders.filter((order) => order.status === 'Aceptado').map((order) => {
                                                return <li key={order.id}>
                                                    <ProductOrderInfo order={order} />
                                                </li>;
                                            })}
                                        </ul>
                                    </>
                                    : null
                            }
                        </section>
                        <section>
                            {
                                orders.orders && orders.orders.some((order) => {
                                    return order.status === 'Rechazado';
                                })
                                    ? <>
                                        <h2>Rechazados</h2>
                                        <ul>
                                            {orders.orders.filter((order) => order.status === 'Rechazado').map((order) => {
                                                return <li key={order.id}>
                                                    <ProductOrderInfo order={order} />
                                                </li>;
                                            })}
                                        </ul>
                                    </>
                                    : null
                            }
                        </section>

                    </>}
            </main>
            <Footer />
        </>
    );
};

export default SeeOrders;

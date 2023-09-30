export const getAllProductsService = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/products`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data.data;
};

export const getSearchProductsService = async (params) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/${params}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data.data;
};

export const loginUserService = async ({ email, password }) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error);
    }

    return [data.data.token, data.data.userInfo[0]];
};



export const getProductByIdService = async (idProduct) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/products/${idProduct}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data.data;
};

export const addOrderService = async (idProduct, token, { userSellerId }) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/orders/user/${idProduct}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token
        },
        body: JSON.stringify({ userSellerId })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }
};


export const getUserProfileService = async (idUser) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/profile/${idUser}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data.data;
};

export const getUserReviewsService = async (idUser) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/reviews/${idUser}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data.data;
};

export async function addProductService (token, formData) {
    console.log();
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/products/addProduct`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        throw new Error('Error en la solicitud');
    }

    const data = await response.json();

    return data;
}
export const registerUserService = async ({ firstName, lastName, email, phone, password }) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, phone, password })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }
};


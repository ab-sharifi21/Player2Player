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

export const addProductService = async (token, formData) => {
    const addProductForm = new FormData();

    addProductForm.append('name', formData.title);
    addProductForm.append('category', formData.category);
    addProductForm.append('description', formData.description);
    addProductForm.append('price', formData.price);
    addProductForm.append('state', formData.state);

    formData.photos.forEach((photo) => {
        addProductForm.append('photos', photo);
    });

    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/products/addProduct`, {
        method: 'POST',
        headers: {
            token
        },
        body: addProductForm
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }
};

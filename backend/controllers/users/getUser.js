const getPool = require('../../db/connectDB');
const generateError = require('../../helpers/generateError');

async function getUser (req, res, next) {
    try {
        const { userId } = req.params;
        const pool = await getPool();

        const [[user]] = await pool.query(`SELECT first_name, last_name, bio, email, phone_number, city, postal_code, avatar
        FROM users
        WHERE id = ?`, [userId]);

        if (!user) {
            return next(generateError(`El usuario con el id ${userId} no existe`, 404));
        }

        const [[avgReview]] = await pool.query(`
        SELECT user_seller_id, AVG(stars) AS userAvgReviews FROM reviews
        WHERE user_seller_id = ?                                                                                  GROUP BY user_seller_id;
        `, [userId]);


        const [[products]] = await pool.query(`SELECT P.name, P.description, P.category, P.state, P.price, PP.name AS photo
        FROM products P
        INNER JOIN users U ON P.user_id = U.id
        INNER JOIN product_photo PP ON PP.product_id = P.id
        WHERE U.id = ?;`, [userId]);


        res.status(200).send({
            status: 'ok',
            data: {
                user,
                avgReview,
                products: [products]
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = getUser;

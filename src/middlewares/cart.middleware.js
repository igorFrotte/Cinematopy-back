import { ObjectId } from "mongodb";
import mongo from "../db/db.js";

async function validProduct(req, res, next){
    const productId = new ObjectId(req.body.productId);

    try {

        const db = await mongo();
        const product = await db.collection('products').findOne({ productId });
        if (!product) {
            res.status(404).send('Produto não encontrado');
        }
        
        res.locals.product = product;
        next();

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export default validProduct;
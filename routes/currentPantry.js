// NPM MODULES
const express = require('express');

// LOCAL MODULES
const CurrentPantryServices = require('../services/currentPantry');
const { convertToGrams } = require('../services/weightConversions');

//CREATE ADD PRODUCT TO CURRENT_PANRTY
const createProductInPantry = (request, response) => {
    const { product_id, owner_id, weight_left } = request.body;
    CurrentPantryServices.createProductInPantry(product_id, owner_id, weight_left)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully added product to pantry with weight left of ${data.weight_left}.`,
                data,
            });
        })
        .catch(e => {
            console.log(e)
            response.status(400).json({
                'msg': `Something went wrong.`,
                e,
            });
        });
}

//GET PANTRY ITEM BY ID
const getPantryItemByID = (request, response) => {
    const { id, } = request.params;
    CurrentPantryServices.getPantryItemByID(id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved ingredient data.`,
                data,
            });
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong.`,
                e,
            });
        });
};

//GET PANTRY ITEM/ITEMS THAT INCLUDE NAME
const getPantryItemByName = (request, response) => {
    const { name, } = request.params;
    const likeName = `%${name}%`;
    CurrentPantryServices.getPantryItemByName(likeName)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved ingredient data.`,
                data,
            });
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong.`,
                e,
            });
        });
};


const getCurrentPantryRouter = _ => {
    const CurrentPantryRouter = express.Router();

    CurrentPantryRouter.post('/', createProductInPantry);
    CurrentPantryRouter.get('/:id', getPantryItemByID);
    CurrentPantryRouter.get('/name/:name', getPantryItemByName);

    return CurrentPantryRouter;
};

module.exports = {
    getCurrentPantryRouter,
};
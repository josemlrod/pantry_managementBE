// LOCAL MODULES
const { getDbConn, } = require('./db/db');
const { dbAddr, } = require('./db/config');

//CREATE PRODUCT
const createProductInPantry = (product_id, owner_id, weight_left) => getDbConn(dbAddr).one(
    `   
        INSERT INTO current_pantry
        (product_id, 
        owner_id, 
        weight_left) 
        VALUES 
        ($[product_id], 
        $[owner_id], 
        $[weight_left]) RETURNING weight_left;`
    , { product_id, owner_id, weight_left }
);

//GET INGREDIENT BY ID
const getPantryItemByID = id => getDbConn(dbAddr).any(
    `
        SELECT current_pantry.*,
            products.*
            FROM current_pantry
            JOIN products
            ON products.product_id = current_pantry.product_id
        WHERE current_pantry.product_id = $[id]
    `, { id, }
);

//GET PANTRY ITEM BY NAME
const getPantryItemByName = name => getDbConn(dbAddr).any(    
    `
        SELECT current_pantry.*,
            products.*
            FROM current_pantry
            JOIN products
            ON products.product_id = current_pantry.product_id
        WHERE products.product_name LIKE $[name]
    `, { name, }
);

//GET INGREDIENT BY ID
const getPantryItemsOfUser = id => getDbConn(dbAddr).any(
    `
        SELECT current_pantry.*,
            products.*,
            ingredients.*
            FROM current_pantry
            JOIN products
            ON products.product_id = current_pantry.product_id
            JOIN ingredients
            ON ingredients.product_id = products.product_id
        WHERE current_pantry.owner_id = $[id]
    `, { id, }
);

//GET PANTRY ITEMS THAT INCLUDE NAME FOR SPECIFIC USERS
const getPantryItemOfUserByName = (name, id) => getDbConn(dbAddr).any(    
    `
        SELECT current_pantry.*,
            products.*
            FROM current_pantry
            JOIN products
            ON products.product_id = current_pantry.product_id
        WHERE products.product_name LIKE $[name] AND current_pantry.owner_id = $[id]
    `, { name, id, }
);

// UPDATE PANTRY ITEM BY PRODUCT_ID
const updatePantryItemByProductID = (product_id, weight_left) => getDbConn(dbAddr).oneOrNone(
    `
        UPDATE 
            current_pantry
        SET
            weight_left = $[weight_left]
        WHERE
            product_id = $[product_id]    
    `, {product_id, weight_left,}
);

module.exports = {
    getPantryItemByID,
    getPantryItemByName,
    createProductInPantry, 
    getPantryItemsOfUser, 
    getPantryItemOfUserByName,  
    updatePantryItemByProductID,
};
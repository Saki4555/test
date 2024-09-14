const createError = require('http-errors');



const getUsers = (req, res, next) => {
   try{
    res.status(400).json(
        {
            message: 'user is found',
        }
    );
   }
   catch(error){
    next(error);
   }
}

module.exports = { getUsers }

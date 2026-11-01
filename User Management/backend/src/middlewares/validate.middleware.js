

const validate = (validator )=>{

    return async (req,res , next )=>{

        const error = validator(req);

        if(error.length > 0){
            return res.status(400).json({
                success : false,
                message : "Validation Failed",
                errors : error
            })
        }
        
        next(); 
        
    }
}


export default validate ; 

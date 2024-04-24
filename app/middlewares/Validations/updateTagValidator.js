import { catchError } from "../../utils/catchAsyncError.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import validator from "../../utils/updateTagValidator.js"

export default catchError(async (req, res, next)=>{
    if(validator(req.body)){
        req.valid = 1
        next()
    }else return next(ErrorMessage(403, "forbidden command"));
})
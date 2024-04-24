import { catchError } from "../../utils/catchAsyncError.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import validator from "../../utils/createPostValidator.js"

export default catchError(async (req, res, next)=>{
    req.body.description = JSON.parse(req.body.description);
    req.body.tags = JSON.parse(req.body.tags);
    if(validator(req.body)){
        req.valid = 1
        next()
    }else return next(ErrorMessage(403, "forbidden command"));
})
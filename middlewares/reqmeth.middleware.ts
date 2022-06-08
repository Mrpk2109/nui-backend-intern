export const requestMethod = function (req,res,next){
    console.log('Request Type:', req.method)
    next()
}
export default exports;
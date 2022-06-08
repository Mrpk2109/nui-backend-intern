export const requestTime = function (req:any, res:any, next:any) {
    req.requestTime = new Date()
    console.log(req.requestTime);
    
    next()
  }
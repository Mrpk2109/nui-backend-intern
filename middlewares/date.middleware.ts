export const requestTime = function (req, res, next) {
    req.requestTime = new Date()
    console.log('Request time is : '+req.requestTime);
    next()
  }
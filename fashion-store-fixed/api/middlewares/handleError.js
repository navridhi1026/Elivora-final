const { isCelebrateError } = require('celebrate')

const handleMalformedJson = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ 
    	status: "error", 
    	message: err.message,
    })
  }
  next();
}

const formatCelebrateErrors = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const bodyErrors = err.details?.get?.('body')
    
    if (bodyErrors) {
      const { details: [errorDetails] } = bodyErrors
      
      return res.status(400).json({
        status: "error",
        message: errorDetails.message,
        params: errorDetails.path,
      })
    }
  }
  return next(err);
}

module.exports = {
  handleMalformedJson,
  formatCelebrateErrors,
}
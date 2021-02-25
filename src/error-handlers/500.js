'use strict';

module.exports = (err, req, res, next) => {
  let error = { error: err.message || err };
  res.statusCode = err.status || 500;
  res.statusMessage = err.statusMessage || 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};

// module.exports = function (err, req, res, next) {

//   // Sometimes, errors come in as an object, others as a string
//   const error = err.message ? err.message : err;

//   const errorObject = {
//     status: 500,
//     message: error
//   }
//   res.status(500).json(errorObject);
// }

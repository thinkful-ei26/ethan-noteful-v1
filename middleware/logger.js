'use strict';

const logger = function (req, res, next){
  const time = new Date();
  console.log(
    `${time.toLocaleDateString()} ${time.toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
};

module.exports = {logger};
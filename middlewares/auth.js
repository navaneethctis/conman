const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (request, response, next) => {
  const token = request.header('X-Auth-Token');

  if (!token) return response.status(401).json({message: '401 Unauthorized'});

  try {
    const payload = jwt.verify(token, config.get('privateKey'));

    request.user = payload.user;

    next();
  } catch (error) {
    response.status(401).json({message: '401 Unauthorized'});
  }
};

module.exports = auth;

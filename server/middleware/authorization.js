const authorize = (roles) => {
    return async (request, reply) => {
      const user = request.user; // Assuming you have user information in the request
  
      if (!user) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
  
      if (!roles.includes(user.role)) {
        reply.status(403).send({ error: 'Forbidden' });
        return;
      }
  
      // User has the required role, proceed to the route handler
      return reply.continue;
    };
  };
  
  module.exports = { authorize };
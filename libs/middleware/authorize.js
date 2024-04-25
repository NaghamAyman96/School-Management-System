const authorize = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.userData.role)) {
        return res.status(403).json({ message: 'You do not have permission to perform this action' });
      }
      next();
    };
  };
  
  module.exports = authorize;
  
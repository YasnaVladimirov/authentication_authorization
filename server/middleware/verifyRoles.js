const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const requestRoles = req.roles;
    if (!requestRoles) return res.status(400).json("Invalid or missing role(s)");
    
    const roles = [...allowedRoles];
    
    const result = requestRoles.map(code => roles.includes(code)).find(val => val === true);
    if (!result) return res.status(401).json("Unauthorized access!");
    next();
  }
}

module.exports = { verifyRoles } 
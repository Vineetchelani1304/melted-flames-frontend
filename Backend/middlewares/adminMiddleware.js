
// Admin middleware: adminOnly
exports.adminOnly = (req, res, next) => {
  try {
    if (req.user && req.user.role === 'ADMIN') {
      return next();
    }
    res.status(403).json({ message: 'Forbidden: Admins only' });
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

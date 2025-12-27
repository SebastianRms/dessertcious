export const requestLogger = (req, res, next) => {
  const dateTime = new Date();
  console.log(`📡 [${dateTime.toISOString()}] ${req.method} ${req.url}`);
  next();
};
module.exports = (fn) => {
  return (req, res, next) => {
    // confused a bit about the .catch(next), refer back to the tutorial later on
    fn(req, res, next).catch(next);
  };
};

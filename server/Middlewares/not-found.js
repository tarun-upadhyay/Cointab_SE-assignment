const notFound = (req, res) =>
  res.status(404).send("<h2>Route dosen't exist </h2>");

module.exports = notFound;

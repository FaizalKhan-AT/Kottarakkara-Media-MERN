const getUser = (req, res) => {
  if (!req.user)
    return res.status(404).json({
      status: "error",
      error: "User not found or doesn't exist",
    });

  return res.status(200).json({ status: "ok", data: req.user });
};
module.exports = {
  getUser,
};

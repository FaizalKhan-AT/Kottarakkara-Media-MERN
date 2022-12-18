const getUser = (req, res) => {
  if (!req.user)
    return res.json({ status: "error", error: "User doesn't exist" });

  return res.json({ status: "ok", data: req.user });
};
module.exports = {
  getUser,
};

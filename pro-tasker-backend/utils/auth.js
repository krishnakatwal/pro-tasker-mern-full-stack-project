import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expiration = "2h";

export function authMiddleware(req, res, next) {
  let token = req.body?.token || req.query?.token || req.headers.authorization;

  //Extract token from "Bearer <token>"
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "You must be logged in to do that." });
  }

  try {
    //Verify the token
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch (error) {
    console.log("Invalid token");
    return res.status(401).json({ message: "Invalid token." });
  }
  next();
}
export function signToken({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

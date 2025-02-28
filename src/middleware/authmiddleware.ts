import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied" }); // ✅ RETURN to stop further execution
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (decoded) next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" }); // ✅ RETURN to prevent further execution
  }
};
export default authMiddleware;

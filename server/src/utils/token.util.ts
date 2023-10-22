import jwt, { JwtPayload } from "jsonwebtoken";
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const tokenUtil = () => {
  const generate = (payload: JwtPayload) => {
    const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN as string });
    return token;
  };

  const verify = (token: string) => {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    return decoded;
  };

  return { generate, verify };
};
export default tokenUtil();

import jwt, { JwtPayload } from "jsonwebtoken";
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: string;
}

const generate = (payload: JwtPayload) => {
  const token = jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_IN as string,
  });
  return token;
};

const verify = (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET as string) as CustomJwtPayload;
  return decoded;
};

export default { generate, verify };

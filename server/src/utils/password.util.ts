import bcrypt from "bcryptjs";

const hash = async (password: string) => {
  const genSalt = 10;
  const hashedPassword = await bcrypt.hash(password, genSalt);
  return hashedPassword;
};

const compare = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export default { hash, compare };

import * as bcrypt from "bcryptjs";

export function hashPassword(psw: string) {
  return bcrypt.hashSync(psw, 8);
}

export function comparePassword(plain: string, encrypted: string) {
  return bcrypt.compareSync(plain, encrypted);
}

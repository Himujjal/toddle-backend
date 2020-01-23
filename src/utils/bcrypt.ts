import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export function hashPassword(passwordToHash: string): string {
  return bcrypt.hashSync(passwordToHash, salt);
}

export function comparePasswords(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}

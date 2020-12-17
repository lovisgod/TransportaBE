import bcrypt from "bcrypt";


export class PasswordHasher {

    /**
 * Encrypts password to store in db
 * @param password
 */
  hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

/**
 * Compare inserted password with encrypted stored password
 * @param hashed
 * @param password
 */
  comparePassword = (password, hashed) => bcrypt.compareSync(password, hashed);

  
}

import crypto from "crypto";
import bcrypt from "bcryptjs";

class HashService {
  hashOtp(data) {
    return crypto
      .createHmac("sha256", process.env.TASKS_OTP_HASH_SECRET)
      .update(data)
      .digest("hex");
  }

  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  comparePasswordHash(requestPassword, dbPassword) {
    return bcrypt.compareSync(requestPassword, dbPassword);
  }
}

export default new HashService();

import dotenv from "dotenv";
import path from "path";
dotenv.config();

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  base_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret: process.env.JWT_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES_IN,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRECT,
  stripe_weebhook: process.env.STRIPE_WEBHOOK_SECRET,
  stripe_secret: process.env.STRIPE_SECRET_KEY,
  smtp_host: process.env.SMTP_HOST,
  smtp_user: process.env.SMTP_USER,
  smtp_port: process.env.SMTP_PORT,
  smtp_pass: process.env.SMTP_PASS,
  smtp_from: process.env.SMTP_FROM,
  nodemailer_user: process.env.NODE_MAILER_USER,
  nodemailer_pass: process.env.NODE_MAILER_PASS,
};

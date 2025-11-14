import 'dotenv/config';
const SMTPConfigs = {
  provider: process.env.SMTP_PROVIDER,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_POR,
  user: process.env.SMTP_USER,
  from: process.env.SMTP_FROM,
  password: process.env.SMTP_PASSWORD,
};

export default SMTPConfigs;

export const JWTConstants = {
  secret: process.env.JWT_SECRET || 'default-min-32-char-secret-key',
  expiration: 86400,
};

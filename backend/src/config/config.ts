import { registerAs } from "@nestjs/config";

const google = registerAs("google", () => ({
  CLIENT_ID:
    "1070310261194-8dkpov8j5n6rp2tm1gjnb76nkaohhc3t.apps.googleusercontent.com",
  CLIENT_SECRET: "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",
  CALLBACK_URL: "http://localhost:3000/api/auth/google/callback",
}));
const jwt = registerAs("jwt", () => ({
  SECRET: "12312312312",
}));
export const configurations = { google, jwt };

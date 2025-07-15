import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { db } from "../db/connection";
import { users, sessions, accounts, verificationTokens } from "../db/schema";
import { resend } from "../emails/config";

console.log("🔐 Initializing Better Auth...");

const isDev = process.env.NODE_ENV === "development";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verificationTokens,
    },
  }),
  secret: process.env.BETTER_AUTH_SECRET!,
  basePath: "/auth",
  trustedOrigins: [
    process.env.APP_URL!,
    process.env.API_URL!,
    "https://qrsedweb.localhost",
    "https://qrsedapi.localhost"
  ],
  advanced: {
    trustProxy: true,
    database: {
      generateId: () => crypto.randomUUID(),
    },
    // ...(isDev && {
      cookies: {
        session_token: {
          attributes: {
            httpOnly: false,
            secure: true,
            sameSite: "none",
          },
        },
      },
    // }),
  },
  plugins: [
    ...(isDev ? [
      openAPI({
        path: "/reference",
        disabled: false,
      })
    ] : []),
  ],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user,  token }) => {
       await resend.emails.send({
        from: "noreply@dnd.failytales.com",
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${process.env.APP_URL}/reset-password?token=${token}`,
      });
    },
  },
});

console.log("✅ Better Auth initialized successfully");
console.log("🛣️ Better Auth handler:", typeof auth.handler);

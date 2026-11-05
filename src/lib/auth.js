
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

// 1. MongoDB Connection
const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tcyjszt.mongodb.net/`
);

const db = client.db("studioSpace");

// 2. Better Auth Configuration
export const auth = betterAuth({

  // 3. Database
  database: mongodbAdapter(db, {
    client,
  }),

  // 4. Email and Password Login
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  // 5. Google Login
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_CLIENT_SECRET,
    },
  },

  // 6. Account Linking
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },

  // 7. JWT Plugin
  plugins: [
    jwt(),
  ],

  // 8. Session Settings
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },

});

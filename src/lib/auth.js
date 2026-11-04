import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"


const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tcyjszt.mongodb.net/`
);
const db = client.db("studioSpace");

export const auth = betterAuth({
   emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

    // socialProviders: {
    //     google: {
    //         clientId: process.env.GOOGLE_CLIENT_ID,
    //         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //     },
        
    // },

    database: mongodbAdapter(db, {
        client,
    }),

      plugins: [
        jwt(), 
    ],
    session: {
      cookieCache: {
        enabled: true,
        strategy: "jwt",
        maxAge: 7 * 24  * 60  * 60, // 7 days
      },  
    }
});
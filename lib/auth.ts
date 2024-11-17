// auth.ts
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: {
          label: "User Name",
          type: "text",
          placeholder: "Enter your user name",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          // Validate credentials
          if (!credentials || !credentials.userName || !credentials.password) {
            throw new Error("Missing credentials");
          }

          // Make a POST request to the API with the user's credentials
          const res = await fetch("http://10.10.10.74:2001/api/Account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userName: credentials.userName,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          // If the response is not OK, throw an error
          if (!res.ok) {
            throw new Error(data.message || "Failed to authenticate");
          }

          // Extract token and user information from the response
          const { token, expiration, fullName, uesrType, userPlace, typee } =
            data;

          // Create a user object to return
          const user: User = {
            id: credentials.userName,
            name: fullName,
            email: "", // Email is not provided by the API
            token,
            expiration,
            role: uesrType,
            place: userPlace,
            type: typee,
          };

          return user;
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/api/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
    updateAge: 0, // Disable session update on access
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = user.token;
        token.expiration = user.expiration;
        token.role = user.role;
        token.place = user.place;
        token.type = user.type;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        token: token.token,
        expiration: token.expiration,
        role: token.role,
        place: token.place,
        type: token.type,
      };
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);

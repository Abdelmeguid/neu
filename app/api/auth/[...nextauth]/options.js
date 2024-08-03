import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../../lib/mongodb"; // Adjust the path as necessary
import User from "../../../../models/User"; // Adjust the path as necessary
import bcrypt from "bcryptjs";

const options = {
  providers: [
    CredentialsProvider({
      id: "password",
      name: "Username and Password",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username...",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await dbConnect();

        const user = await User.findOne({ username: credentials.username });

        if (!user) {
          return null;
        }

        const match = await bcrypt.compare(credentials.password, user.password);

        if (match) {
          
          return user;
        }
        

        return null;
      },
      
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.isAdmin = user.isAdmin;
        token.username = user.username;
        
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin;
        session.user.username = token.username ;
      }
      console.log(session.user.username)
      console.log(session.user.isAdmin)
      return session;
    },
  },
};

export default options;

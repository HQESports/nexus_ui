// auth.ts
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Discord({
            clientId: process.env.AUTH_DISCORD_ID,
            clientSecret: process.env.AUTH_DISCORD_SECRET,
            // Add this block to fix the "invalid_client" issue
            client: {
                token_endpoint_auth_method: "client_secret_post",
            },
        }),
    ],
    // ... rest of your config
});
import { v } from "convex/values";
import { QueryCtx, internalMutation, mutation } from "./_generated/server";

/** Create a new Clerk user or update existing Clerk user data. */
export const createUser = internalMutation({
    args: { userId: v.string(), email: v.string() }, // no runtime validation, trust Clerk
    async handler(ctx, { userId, email }) {
        const userRecord = await userQuery(ctx, userId);

        if (userRecord === null) {
            await ctx.db.insert("users", { userId, email });
        }
    },
});

export async function userQuery(
    ctx: QueryCtx,
    clerkUserId: string
) {
    return await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("userId", clerkUserId))
        .unique();
}
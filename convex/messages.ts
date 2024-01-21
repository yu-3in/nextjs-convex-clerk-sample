import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("UnAuthorized");
    }
    const userId = identity.subject;

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return messages;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("UnAuthorized");
    }
    const userId = identity.subject;

    const message = await ctx.db.insert("messages", {
      title: args.title,
      content: args.content,
      userId,
    });

    return message;
  },
});

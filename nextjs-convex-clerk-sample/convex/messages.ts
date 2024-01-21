import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("UnAuthorized");
    }
    const userId = identity.subject;

    const message = await ctx.db.get(args.messageId);

    if (!message) {
      throw new Error("Not found");
    }

    if (message?.userId !== userId) {
      throw new Error("Not authorized");
    }

    return message;
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

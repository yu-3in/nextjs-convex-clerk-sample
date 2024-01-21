import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    title: v.string(),
    content: v.optional(v.string()),
    userId: v.string(),
  }).index("by_user", ["userId"]),
});

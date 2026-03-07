import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  bio: z.string().max(200).optional(),
  headline: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  isProfilePublic: z.boolean().optional(),
  avatarUrl: z.string().url().optional().nullable(),
});

export const updateTagsSchema = z.object({
  tagIds: z.array(z.string()).max(20),
});

export const followSchema = z.object({
  targetUserId: z.string(),
});

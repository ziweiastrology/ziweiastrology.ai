import { Tier } from "@prisma/client";

export const TIER_LIMITS = {
  [Tier.FREE]: {
    postsPerDay: 2,
    viewPostsPerDay: Infinity,
    canVote: true,
    canComment: true,
    matchesPerDay: 0,
    dmsPerDay: 0,
    canSendDm: false,
    groupsJoin: 1,
    groupsCreate: 0,
    matchReadingsPerDay: 0,
    maxTags: 5,
    canUploadAvatar: true,
    canViewFullProfile: true,
    canViewMatchScore: false,
  },
  [Tier.BASIC]: {
    postsPerDay: 3,
    viewPostsPerDay: Infinity,
    canVote: true,
    canComment: true,
    matchesPerDay: 3,
    dmsPerDay: 10,
    canSendDm: true,
    groupsJoin: 5,
    groupsCreate: 0,
    matchReadingsPerDay: 0,
    maxTags: 15,
    canUploadAvatar: true,
    canViewFullProfile: true,
    canViewMatchScore: false,
  },
  [Tier.PREMIUM]: {
    postsPerDay: 10,
    viewPostsPerDay: Infinity,
    canVote: true,
    canComment: true,
    matchesPerDay: 10,
    dmsPerDay: 50,
    canSendDm: true,
    groupsJoin: 15,
    groupsCreate: 1,
    matchReadingsPerDay: 3,
    maxTags: 30,
    canUploadAvatar: true,
    canViewFullProfile: true,
    canViewMatchScore: true,
  },
  [Tier.SIFU]: {
    postsPerDay: Infinity,
    viewPostsPerDay: Infinity,
    canVote: true,
    canComment: true,
    matchesPerDay: Infinity,
    dmsPerDay: Infinity,
    canSendDm: true,
    groupsJoin: Infinity,
    groupsCreate: Infinity,
    matchReadingsPerDay: Infinity,
    maxTags: Infinity,
    canUploadAvatar: true,
    canViewFullProfile: true,
    canViewMatchScore: true,
  },
} as const;

export type TierLimits = (typeof TIER_LIMITS)[Tier];

export function getTierLimits(tier: Tier): TierLimits {
  return TIER_LIMITS[tier];
}

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// ========================
// Case Study Interactions
// ========================

export const caseReactionSchema = z.object({
  type: z.enum(["INSIGHTFUL", "MIND_BLOWN", "RELATABLE", "WANT_MORE"]),
});

export const caseCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(2000, "Comment too long"),
  parentId: z.string().optional(),
});

export const casePollVoteSchema = z.object({
  optionId: z.string().min(1, "Option is required"),
});

export const celebritySubmissionSchema = z.object({
  subjectName: z.string().min(1, "Name is required").max(200),
  subjectNameCn: z.string().max(100).optional(),
  birthDate: z.string().min(1, "Birth date is required"),
  birthTime: z.string().optional(),
  birthLocation: z.string().max(300).optional(),
  birthTimeVerified: z.boolean().optional(),
  category: z.enum(["Health", "Career", "Relationships", "Children", "Property"]),
  context: z.string().max(1000).optional(),
  sourceUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type CaseReactionInput = z.infer<typeof caseReactionSchema>;
export type CaseCommentInput = z.infer<typeof caseCommentSchema>;
export type CasePollVoteInput = z.infer<typeof casePollVoteSchema>;
export type CelebritySubmissionInput = z.infer<typeof celebritySubmissionSchema>;

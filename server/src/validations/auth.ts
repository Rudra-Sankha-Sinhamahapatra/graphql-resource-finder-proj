import { z } from "zod";

const signupValidation = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signinValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const userValidation = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
});

export const authValidation = {
  signup: signupValidation,
  signin: signinValidation,
  user: userValidation,
};

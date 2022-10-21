import { z } from "zod";

export const AuthProviders = z.enum(["google", "email/password"]);
export type AuthProviders = z.infer<typeof AuthProviders>;

export const SupportedLanguages = z.enum(["en", "hr"]);
export type SupportedLanguages = z.infer<typeof SupportedLanguages>;

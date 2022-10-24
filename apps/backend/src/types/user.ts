import { z } from "zod";

export const address = z.object({
    street: z.string().optional(),
    zipcode: z.number().optional(),
    city: z.string(),
});

export type Address = z.infer<typeof address>;

export const profile = z.object({
    name: z.string(),
    gender: z.enum(["male", "female", "other"]),
    contactInfo: z.object({
        telephone: z.string(),
        address: address,
    }),
});

export type Profile = z.infer<typeof profile>;

export const contact = z.object({
    email: z.string().email(),
    userID: z.string(),
    title: z.string(),
    contents: z.string(),
    reason: z.string(),
});

export type Contact = z.infer<typeof contact>;

export const settings = z.object({
    deactivated: z.boolean(),
    language: z.string()
});

export type Settings = z.infer<typeof settings>;

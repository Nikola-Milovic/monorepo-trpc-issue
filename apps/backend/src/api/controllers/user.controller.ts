import UserService from "@/services/user.service";

import { Container } from "typedi";

import { protectedProcedure, trpc } from "..";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { profile } from "@/types/user";
import { AuthProviders } from "@/types/common";

const accountCreate = trpc.procedure
    .input(
        z.object({
            email: z.string().min(1).email(),
            userID: z.string().min(1),
            provider: AuthProviders,
            presignupEmail: z.string().email().optional(),
        })
    )
    .mutation(async ({ input }) => {
        const { provider, presignupEmail, userID, email } = input;
        try {
            const userService = Container.get(UserService);
            const { id, exists } = await userService.CreateNewUser(
                email,
                userID,
                provider,
                presignupEmail
            );

            return { id, exists, email };
        } catch (e: any) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `failed to create account: ${e}`,
                cause: e,
            });
        }
    });

const profileUpdate = protectedProcedure
    .input(
        z.object({
            userID: z.string(),
            profile: profile.required(),
        })
    )
    .mutation(async ({ input }) => {
        const { userID, profile } = input;
        const userService = Container.get(UserService);
        await userService.UpdateProfile(userID, profile);
    });

const login = protectedProcedure
    .input(
        z.object({
            userID: z.string(),
        })
    )
    .query(async ({ input }) => {
        const { userID } = input;

        const userService = Container.get(UserService);
        const data = await userService.GetLogin(userID);

        return data;
    });

export const userRouter = trpc.router({
    accountCreate,
    profileUpdate,
    login,
});

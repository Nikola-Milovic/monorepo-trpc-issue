import { TRPCError } from "@trpc/server";
import { trpc } from ".";

export const isAuthed = trpc.middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});


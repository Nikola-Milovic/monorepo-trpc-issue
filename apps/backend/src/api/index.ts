import { Router } from "express";

import { userRouter } from "./controllers/user.controller";
import * as trpcExpress from "@trpc/server/adapters/express";

//TRPC
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Logger } from "winston";
import Container from "typedi";
import { Context, sessionContext } from "./context";
import { isAuthed } from "./middleware";
import { Profile } from "@/types/user"
import { z } from "zod";

const logger: Logger = Container.get("logger");

export const trpc = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter: ({ error, type, path, input, ctx }) => {
        //TODO log error somewhere
        logger.error("error: %o", error);
        if (error.code === "INTERNAL_SERVER_ERROR") {
            // send to bug reporting
        }
    },
});

export const protectedProcedure = trpc.procedure.use(isAuthed);

export const appRouter = trpc.router({
    user: userRouter,
});

export type ProfileType = Profile;

const emailValidator = z.object({
    business: z.string().email(),
    valid: z.boolean()
});
export type EmailType = z.infer<typeof emailValidator>;

export type Test = {
    some: string;
    foo: {
        bar: string;
    }
    email: EmailType;
}

// export type definition of API
export type AppRouter = typeof appRouter;

export default () => {
    const app = Router();

    app.use(
        "/trpc",
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext: sessionContext,
        })
    );

    return app;
};

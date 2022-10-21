import { inferAsyncReturnType } from "@trpc/server";
import type { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";

import { IncomingMessage, ServerResponse } from "http";

import { firebaseAdmin } from "@/loaders/firebase-admin";

//https://github.com/mikealche/next-trpc-prisma-postgresql-auth-monorepo/blob/master/packages/backend/src/Context.ts
export const sessionContext = async ({
    req,
}: NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse>) => {
    try {
        // Get auth token if available and if it follows the "bearer" pattern
        // https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_the_firebase_admin_sdk
        // The verifyIdToken needs a project ID, but should be taken care of if firebase admin has been initialised properly or runs on gcp infra
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            const token = req.headers.authorization.split(" ")[1] as string;
            const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

            if (!decodedToken.email) {
                return {};
            }

            return {
                user: {
                    uid: decodedToken.uid,
                    email: decodedToken.email,
                },
            };
        }
        // 401 Missing auth token
        return {};
    } catch (error) {
        // 403 identity known but denied / failed authentication
        return {};
    }
};

export type Context = inferAsyncReturnType<typeof sessionContext>;

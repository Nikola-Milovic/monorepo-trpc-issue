// The type is imported directly from backend, here we use type alias to make it cleaner
import type { AppRouter } from "@company/backend/trpc";

export type { AppRouter } from "@company/backend/trpc";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { inferProcedureOutput } from "@trpc/server";

const API_URL = process.env.SERVER_URL;

// The type is inferred to any
// Also if you hover over the app router, the context is also any
type test = inferProcedureOutput<AppRouter["user"]["login"]>;

export const trpc = createTRPCNext<AppRouter>({
    config({ }) {
        return {
            links: [
                httpBatchLink({
                    url: `${API_URL}/api/trpc`,
                    headers() {
                        return {
                            Authorization: "Bearer ",
                        };
                    },
                }),
            ],
        };
    },
});

// The type is imported directly from backend, here we use type alias to make it cleaner
import type { AppRouter, EmailType, ProfileType, Test } from "@company/backend/trpc";

export type { AppRouter } from "@company/backend/trpc";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { inferProcedureOutput } from "@trpc/server";

const API_URL = process.env.SERVER_URL;

// The type is inferred to any
// Also if you hover over the app router, the context is also any
type loginOutputType = inferProcedureOutput<AppRouter["user"]["login"]>;
//Profile type doesn't have test field but it lets me set it
const a: ProfileType = {};
a.test = false;

//Same as well here, but it errors out as it should
const b: EmailType = {};
b.test = false;

//
const t: Test = {}

//To get rid of the unused error
console.log(a, b, test, t)

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

### Intro

This repository is made to showcase my issue `tRPC` types being lost between my client and my server. This repo reflects my real project but is stripped down of majority of the functionality and probably won't even run nor build. But that doesn't really matter, I just want to get the correct types.

### Project setup

The project is built with `Yarn Workspaces` and it's structured as following

- `apps/site`, the NextJS client importing the tRPC `AppRouter`
- `apps/backend`, the express backend that is exposing the `AppRouter`
- `apps/config`, here are the base `tsconfig`s used throught the project
- `packages/frontend-shared`, not important for this issue, shared UI components

### The issue

The issue is that the types on the client are inferred as `any`, and I've exhausted the ideas as to what is causing the issue.

The `tRPC` server setup is inside the `apps/backend/src/api` directory, the `tRPC` setup for the Nextjs is inside the `apps/site/src/lib/APIProvider.ts`

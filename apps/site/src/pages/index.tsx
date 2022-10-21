import { GetStaticPropsResult } from "next";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

export default function Proposals() {
    return <div className="h-full w-full"></div>;
}

Proposals.protected = true;

export async function getStaticProps({
    locale,
}: {
    locale: string;
}): Promise<GetStaticPropsResult<SSRConfig>> {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["proposals", "common"])),
            // Will be passed to the page component as props
        },
    };
}

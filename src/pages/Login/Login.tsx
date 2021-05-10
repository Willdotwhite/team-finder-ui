import * as React from "react";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";

export const Login: React.FC = () => {
    const url = `${import.meta.env.VITE_API_URL}/oauth2/authorization/discord`

    return (
        <PageContainer>
            <PageHeader>Login</PageHeader>
            <a href={url}>Login with Discord</a>
        </PageContainer>
    )
}
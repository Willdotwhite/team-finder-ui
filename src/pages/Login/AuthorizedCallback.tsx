import * as React from "react";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import { useLocation } from "react-router-dom"

export const AuthorizedCallback: React.FC = () => {
    const query = new URLSearchParams(useLocation().search)
    const token = query.get("token")
    if (token == null) {
        return (
            <PageContainer>
                <PageHeader>Error</PageHeader>
                <div>Should show error page</div>
            </PageContainer>
        )
    }

    localStorage.setItem("token", token)
    return (
        <PageContainer>
            <PageHeader>Authorization Successful</PageHeader>
            <div>We made it!</div>
        </PageContainer>
    )
}
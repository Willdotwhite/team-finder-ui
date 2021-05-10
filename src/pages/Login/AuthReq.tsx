import * as React from "react";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";

export const AuthReq: React.FC = () => {
    const token = localStorage.getItem("token")

    fetch("http://localhost:8080/teams/1", {
        headers: {
            "Authorization": "Bearer " + token,
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(r => r.json())
    .then(r => console.log(r))
    .catch(e => console.log("ERROR: ", e))

    return (
        <PageContainer>
            <PageHeader>Authorization Successful</PageHeader>
            <div>We made it!</div>
        </PageContainer>
    )
}

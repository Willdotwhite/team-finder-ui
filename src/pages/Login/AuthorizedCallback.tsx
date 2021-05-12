import * as React from "react";
import jwt_decode from "jwt-decode";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import { useLocation } from "react-router-dom";
import {UserInfo} from "../../components/UserInfo";

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

    const rawUserData = jwt_decode(token);

    // .sub and .aud shouldn't be long-lived, as this is a misuse of claims
    // Expect these to change before long
    const userInfo: UserInfo = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      avatar:   rawUserData.aud as string,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      username: rawUserData.sub as string
    };

    localStorage.setItem("token", token)
    localStorage.setItem("userData", JSON.stringify(userInfo))

    // Redirect to homepage, we don't need to stay here!
    window.location.replace("/");

    return (<></>)
}

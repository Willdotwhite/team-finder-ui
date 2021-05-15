import * as React from "react";
import { PageHeader } from "../../components/PageHeader";

export const loginUrl = `${import.meta.env.VITE_API_URL}/oauth2/authorization/discord`

export const Login: React.FC = () => {

  return (<>
    <PageHeader>Login</PageHeader>
    <a href={loginUrl}>Login with Discord</a>
  </>)
}

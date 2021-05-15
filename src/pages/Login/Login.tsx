import * as React from "react";
import { PageHeader } from "../../components/PageHeader";

export const Login: React.FC = () => {
  const url = `${import.meta.env.VITE_API_URL}/oauth2/authorization/discord`

  return (<>
    <PageHeader>Login</PageHeader>
    <a href={url}>Login with Discord</a>
  </>)
}
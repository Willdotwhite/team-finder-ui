import * as React from "react";
import {loginUrl} from "../Login/Login";

export const LoginFailure: React.FC = () => {
  return (<>
    <p>Sorry, we could authenticate you against Discord</p>
    <p>
      <a href={loginUrl}>
        Please try again, or contact the developers if you keep seein this issue.
      </a>
    </p>
  </>)
}

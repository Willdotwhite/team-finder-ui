import * as React from "react";

export const loginUrl = `${import.meta.env.VITE_API_URL}/oauth2/authorization/discord`

export const Login: React.FC = () => {

  return (<>
    <div className="text-center text-3xl text-primary font-light my-12">
      Login with Discord to continue
    </div>

    <a className="block mb-8" href={loginUrl}>
      <div className="text-center text-2xl p-4 border-2 border-white">
        <img
          className="inline-block"
          src="/DiscordLogo.svg"
          width={320}
          height={180}
        />
        <h2>Click here to login</h2>
      </div>
    </a>

    <p>This site uses your Discord account to track your team, and let other jammers find you easily!</p>
    <p>Please be respectful and follow the guidelines on the Register page once you&rsquo;ve logged in.</p>
  </>)
}

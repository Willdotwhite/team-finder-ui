import React from "react";
import { PageHeader } from "../../components/PageHeader";

export const About: React.FC = () => {

  return (<>
    <div className="text-center text-3xl text-primary font-light my-12">
    Welcome to the GMTK Game Jam 2021 Team Finder!<br></br>
    </div>

    <PageHeader>
      What is this website?
    </PageHeader>

    <p className="mb-2">
      This is a semi-official fan project aimed at supporting the jam in becoming more community-driven,
      and to help you jammers make new teams and maybe even meet new friends!
    </p>

    <p className="mb-2">
      <span className="italic">This is not run by Mark Brown!</span> Mark gave his blessing for us to use his shiny logos and branding,
      but other than that Mark isn&#39;t directly involved in the development of this tool.
      Please do not contact Mark with questions about this tool.
    </p>
    <h2 className="text-3xl text-white font-light my-6">
      How do I find teams to join?
    </h2>

    <p className="mb-2">
      If you are looking for a team to join, click on the Team Finder tab above!
    </p>

    <p className="mb-2">
      You can scroll through the list of teams that other jammers have posted
      and filter them according to what skills they are looking for.
    </p>

    <p className="mb-2">
      Once you find a team that looks good, click their name/message bubble 
      <img
        className="inline-block m-0 mr-1 w-6 pl-1 fill-primary"
        src="/Speechbubble.svg"
        width={21}
        height={24}
        alt="Click here to open this user's Discord profile"
      />
      and a window will open to their Discord profile where you can contact them.
    </p>
    <h2 className="text-3xl text-white font-light my-6">
      How do I post my own team?
    </h2>

    <p className="mb-2">
      If you want to post about your own team to find new teammates, click on the Post / Edit Your Team tab above.
    </p>

    <p className="mb-2">
      You will be asked to authenticate your Discord account (don&#39;t worry, we only get access to your Discord username).
    </p>

    <p className="mb-2">
      Once you&#39;re logged in, you can fill in what roles you are looking for and write a short description about your team.
      Make sure that you allow for friend requests from &quot;Everyone&quot; in your <a href="FinderSettingsImage_2.png" className="underline">Discord settings</a>, otherwise people can&#39;t contact you!
    </p>
    <h2 className="text-3xl text-white font-light my-6">
      I&#39;ve found someone for my team, what do I do now?
    </h2>

    <p className="mb-2">
      If you&#39;ve filled a role and are no longer looking for it, you can edit your team post in the Post / Edit Your Team tab above.<br />
      If you&#39;re no longer looking for any more team members, make sure to delete your post in the Post / Edit Your Team tab!
    </p>
    <h2 className="text-3xl text-white font-light my-6">
      Can I report team posts?
    </h2>

    <p className="mb-2">
      Yes! If you have any moderation concerns, use the Report function
      <img
        className="inline-block m-0 mr-1 w-6 pl-1 fill-primary"
        src="/Flag.svg"
        width={21}
        height={24}
        alt="Click here to open this user's Discord profile"
      />
      or contact the Jam Moderators on the GMTK Discord server.
      If you are encountering technical problems, please contact Discord user <a className="text-primary font-medium" href="https://discordapp.com/users/427486675409829898">Dotwo#5394</a>.
    </p>

    <div className="my-12"></div>
  </>);
};

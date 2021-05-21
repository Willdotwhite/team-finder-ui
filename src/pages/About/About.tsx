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
    <div>
      This is a semi-official fan project aimed at supporting the jam in becoming more community-driven,
      and to help you jammers make new teams and maybe even meet new friends!<br />
      This is not run by Mark Brown! Mark gave his blessing for us to use his shiny logos and branding,
      but other than that Mark isn&#39;t directly involved in the development of this tool.
      Please do not contact Mark with questions about this tool.
    </div>
    <PageHeader>
      How do I find teams to join?
    </PageHeader>
    <div>
      If you are looking for a team to join, click on the Team Finder tab above!<br />
      You can scroll through the list of teams that other jammers have posted
      and filter them according to what skills they are looking for.<br /> 
      Once you find a team that looks good, click their name/message bubble 
      <img
        className="inline-block m-0 mr-1 w-6 pl-1 fill-primary"
        src="/Speechbubble.svg"
        width={21}
        height={24}
        alt="Click here to open this user's Discord profile"
      />
      and a window will open to their Discord profile where you can contact them.
    </div>
    <PageHeader>
      How do I post my own team?
    </PageHeader>
    <div>
      If you want to post about your own team to find new teammates, click on the Post / Edit Your Team tab above.<br />
      You will be asked to authenticate your Discord account (don&#39;t worry, we only get access to your Discord username).<br />
      Once you&#39;re logged in, you can fill in what roles you are looking for and write a short description about your team.
      Make sure that you allow for friend requests from &quot;Everyone&quot; in your <a href="FinderSettingsImage_2.png" className="underline">Discord settings</a>, otherwise people can&#39;t contact you!
    </div>
    <PageHeader>
      I&#39;ve found someone for my team, what do I do now?
    </PageHeader>
    <div>
      If you&#39;ve filled a role and are no longer looking for it, you can edit your team post in the Post / Edit Your Team tab above.<br />
      If you&#39;re no longer looking for any more team members, make sure to delete your post in the Post / Edit Your Team tab!
    </div>
    <PageHeader>
      Can I report team posts?
    </PageHeader>
    <div>
      Yes! If you have any moderation concerns, use the Report function
      <img
        className="inline-block m-0 mr-1 w-6 pl-1 fill-primary"
        src="/Flag.svg"
        width={21}
        height={24}
        alt="Click here to open this user's Discord profile"
      />
      or contact the Jam Moderators on the GMTK Discord server.
      If you are encountering technical problems, please contact Discord user Dotwo#5394.
    </div>
    <div className="my-12"></div>
  </>);
};

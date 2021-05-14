import * as React from "react";
import { PageContainer } from "../../components/PageContainer";
import { NavLink } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";

export const NotFound: React.FC = () => {
  return (
    <PageContainer>
      <NavLink to="/">
        <div className="text-center">
          {/* TODO: Resize and optimise this image before launch */}
          <img className="inline-block my-6" src="MainLogo100px.png" alt="GMTK Game Jam 2021 - Team Finder"/>
        </div>
      </NavLink>
      <PageHeader>
        404: Not Found
      </PageHeader>
      <p>We couldn&apos;t find the page you were looking for.</p>
      <p><NavLink to="/">Click here to continue using this site.</NavLink></p>
    </PageContainer>
  )
}

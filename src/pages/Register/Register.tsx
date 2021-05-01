import * as React from "react";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";

export const Register: React.FC = () => {
  const [description, setDescription] = React.useState("");

  return (
    <PageContainer>
      <PageHeader>Register a Team</PageHeader>
      <label className="text-lg mb-2 block" htmlFor="description">
        Tell us a bit about yourself and the team you&rsquo;d like to see!
      </label>
      <textarea
        className="text-md bg-transparent border border-white focus:border-primary px-4 py-2 block w-full mb-2"
        placeholder="todo"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="prose prose-sm text-white text-opacity-70">
        <p>It&rsquo;s good to talk about:</p>
        <ul>
          <li>Your experience with game development</li>
          <li>Your experience with game jams</li>
          <li>Your specific skillset</li>
          <li>The types of games you like to work on</li>
          <li>The size of team you&rsquo;d like to work with</li>
          <li>Anything else you&rsquo;d like a potential teammate to know!</li>
        </ul>
      </div>
    </PageContainer>
  );
};

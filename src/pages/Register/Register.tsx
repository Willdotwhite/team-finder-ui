import * as React from "react";
import { Button } from "../../components/Button";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";

export const Register: React.FC = () => {
  const [description, setDescription] = React.useState("");

  return (
    <PageContainer>
      <PageHeader>Register a Team</PageHeader>
      <form
        className="max-w-prose mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-2 mb-4">
          <label className="text-lg block" htmlFor="description">
            Tell us a bit about yourself and the team you&rsquo;d like to see!
          </label>
          <textarea
            className="text-md bg-transparent border border-white focus:border-primary px-4 py-2 block w-full placeholder-white placeholder-opacity-40 h-40"
            placeholder="Hi, I'm Mark! I've been learning Unity for about a year, but this is my first jam. I like level design, and I can do a bit of programming too! I like platformers and games that make it feel good to move around. I'd love to pair up with an artist and maybe a programmer."
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
              <li>
                Anything else you&rsquo;d like a potential teammate to know!
              </li>
            </ul>
          </div>
        </div>
        <Button type="submit">Register</Button>
      </form>
    </PageContainer>
  );
};

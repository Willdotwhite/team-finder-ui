import * as React from "react";
import { NestedValue, useForm } from "react-hook-form";
import classNames from "classnames";
import immer from "immer";
import { Button } from "../../components/Button";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import { roles } from "../../utils/Roles";

interface FormData {
  description: string;
  skillsets: NestedValue<Record<number, boolean>>;
}

export const Register: React.FC = () => {
  const {
    register,
    formState,
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      description: "",
      skillsets: {},
    },
  });

  React.useEffect(() => {
    register("skillsets", {
      validate: (value) => {
        if (Object.keys(value).length === 0) {
          return "Required";
        }
      },
    });
  }, [register]);

  const skillsets = watch("skillsets");

  const toggleSkillset = (id: number) =>
    setValue(
      "skillsets",
      immer(skillsets, (prev) => {
        if (prev[id]) {
          delete prev[id];
        } else {
          prev[id] = true;
        }
      }),
      {
        shouldValidate: true,
      }
    );

  return (
    <PageContainer>
      <PageHeader>Register a Team</PageHeader>
      <form
        className="max-w-prose mx-auto space-y-4"
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={handleSubmit(() => {})}
      >
        <div className="space-y-2">
          <label className="text-lg block">
            What skillsets are you looking for from team members?
          </label>
          <p className="text-xs">
            TODO: use Guitar&rsquo;s much nicer-looking selection UI!
          </p>
          <div>
            {roles.map((role) => (
              <label key={role.id} className="block">
                <input
                  type="checkbox"
                  className="mr-1"
                  onChange={() => toggleSkillset(role.id)}
                  checked={Boolean(skillsets[role.id])}
                />
                {role.name}
              </label>
            ))}
          </div>
          {formState.errors.skillsets && (
            <div className="text-red-400">
              {formState.errors.skillsets?.message}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-lg block" htmlFor="description">
            Tell us a bit about yourself and the team you&rsquo;d like to see!
          </label>
          <textarea
            className={classNames(
              "text-md bg-transparent border  px-4 py-2 block w-full placeholder-white placeholder-opacity-40 h-40",
              formState.errors.description
                ? "border-red-400 focus:border-red-500"
                : "border-white focus:border-primary"
            )}
            placeholder="Hi, I'm Mark! I've been learning Unity for about a year, but this is my first jam. I like level design, and I can do a bit of programming too! I like platformers and games that make it feel good to move around. I'd love to pair up with an artist and maybe a programmer."
            id="description"
            {...register("description", { required: "Required" })}
          />
          {formState.errors.description && (
            <div className="text-red-400">
              {formState.errors.description.message}
            </div>
          )}
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

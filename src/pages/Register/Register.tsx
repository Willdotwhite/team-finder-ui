import * as React from "react";
import { Controller, NestedValue, useForm, useWatch } from "react-hook-form";
import classnames from "classnames";
import { useMutation, useQuery } from "react-query";
import { Button } from "../../components/Button";
import { isUserLoggedIn } from "../../components/PageUserInfo";
import { SkillsetSelector } from "../../components/SkillsetSelector";
import { createTeam, updateTeam, getTeam, deleteTeam, TeamDto } from "../../utils/TeamActions";
import { getSkillsets } from "../../utils/Skillsets";
import match from "../../utils/match";

export interface FormData {
  description: string;
  skillsets: NestedValue<number[]>;
}

const charLimit = 240;
const defaultTeam = {description: "", skillsets: [] as number[]};

// There's SURELY a better way of doing this, right?
export const Register: React.FC = () => {
  const {data, isLoading} = useQuery("userTeam", async () => {
    return getTeam();
  }, {
    // has to be 0, otherwise when you leave and come back to Register the the cache isn't invalidated, and it shows the wrong thing
    cacheTime: 0
  });

  if(isLoading) return null;
  return (<RegisterForm userTeam={data!} />);
}

const RegisterForm: React.FC<{userTeam: TeamDto | null}> = ({userTeam}) => {
  const [userHasTeam, updateUserHasTeam] = React.useState(userTeam != null);

  // sending data changes to server
  const { status, data, mutate, error, isLoading } = useMutation(
    async (formData: FormData | null) => {
      // ensures a minimum of 200ms wait to ensure status bar transitions smoothly
      let waitForBarAnim = new Promise(resolve => setTimeout(resolve, 200));

      let rtn: string;

      if(formData == null) {
        await deleteTeam();
        rtn = "delete";
      } else {
        if(userHasTeam){
          await updateTeam(formData);
          rtn = "update";
        } else {
          await createTeam(formData);
          rtn = "create";
        }
      }
      
      await waitForBarAnim;
      return rtn;
    },
    {
      onSuccess: action => updateUserHasTeam(action != "delete")
    }
  );

  // setting up the form
  const { register, formState, handleSubmit, control, getValues } = useForm<FormData>({
    criteriaMode: "all",
    defaultValues: userTeam == null ? defaultTeam : {
      description: userTeam.description,
      skillsets: getSkillsets(userTeam.skillsetMask).map(s => s.id)
    }
  });

  // validation
  React.useEffect(() => {
    register("skillsets", {
      validate: (value) => {
        if(value.length === 0) return "Required";
      },
    });
    register("description", {
      validate: (value) => {
        if(value.length > charLimit) return "The character limit is "+charLimit;
      },
    });
  }, [register]);


  // Counts how many characters are left for the description
  useWatch({control, name:"description"});
  let charRemain = charLimit - getValues("description").length;
  let remainColor = charRemain <= 0 ? "text-red-400" : "";

  // Configures the status bar's appearance
  let statusBarBG = data ? "bg-primary-dark" : error ? "bg-red-500" : "bg-transparent border";
  let statusBarMsg = match(data,
    ["create", "Team successfully created!"],
    ["update", "Team successfully updated!"],
    ["delete", "Team successfully deleted!"]
  ) || match(status,
    ["idle", "Use the form below to let people know about your team!"],
    ["error", "An error occurred while updating, please try again."],
    ["loading", "Updating..."]
  );

  return (<>
    <div className={"p-2 m-8 rounded text-center text-lg font-bold transition "+statusBarBG}>{statusBarMsg}</div>
    <form
      className="mx-auto space-y-8"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <div className="space-y-2">
        <label
          className={classnames(
            "text-lg block",
            formState.errors.skillsets && "text-red-400"
          )}
        >
          What skills do you need from new teammates?
        </label>
        <Controller
          control={control}
          name="skillsets"
          render={({ field: { value, onChange } }) => (
            <SkillsetSelector selectedSkillsets={value} onChange={onChange} />
          )}
        />
        {formState && formState.errors && formState.errors.skillsets && (
          <div className="text-red-400">
            {formState.errors.skillsets.message}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <label
          className={classnames(
            "text-lg block",
            formState.errors.description && "text-red-400"
          )}
          htmlFor="description"
        >
          Tell us a bit about yourself and the team you&rsquo;d like to see!<br/>
          Characters Remaining: <span className={remainColor}>{charRemain}</span>
        </label>
        <textarea
          style={{resize:"none"}}
          className={classnames(
            "text-md bg-transparent border  px-4 py-2 block w-full placeholder-white placeholder-opacity-40 h-36",
            formState.errors.description
              ? "border-red-400 focus:border-red-500"
              : "border-white focus:border-primary"
          )}
          placeholder="This is my first jam, though I've made some small games before&#10;I like to do level design for platformers (like Celeste), and sometimes I code for Unity&#10;Ideally I want a team of 3 people - mostly I need an artist"
          id="description"
          {...register("description", { required: "Required" })}
        />
        {formState.errors.description && (
          <div className="text-red-400">
            {formState.errors.description.message}
          </div>
        )}
        <div className="max-width-max text-white text-sm text-opacity-70 leading-relaxed">
          Don&rsquo;t forget to mention:
          <ul className="list-disc pl-6">
            <li>Your game dev/jam experience</li>
            <li>Your skills</li>
            <li>The type of games you like to make, or an idea you have for your jam game</li>
            <li>How big you want your team, and if there's anybody you <em>really</em> need</li>
            <li>If you're looking for a coder, make sure to mention what engine/language you're using!</li>
            <li>Anything else you&rsquo;d like a potential teammate to know!</li>
          </ul>
        </div>
      </div>
      <Button type="submit" disabled={isLoading}>
        {userHasTeam ? "Update Team" : "Post Team"}
      </Button>
      {userHasTeam ?
        <Button onClick={() => mutate(null)} className={"bg-red-500"} disabled={isLoading}>
          {"Delete Team"}
        </Button>
      : null}
    </form>
  </>);
};

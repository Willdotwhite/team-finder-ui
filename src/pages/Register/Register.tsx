import * as React from "react";
import { Controller, NestedValue, useForm, useWatch } from "react-hook-form";
import classnames from "classnames";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { SkillsetSelector } from "../../components/SkillsetSelector";
import {
  createTeam,
  updateTeam,
  getTeam,
  deleteTeam,
  TeamDto,
} from "../../utils/TeamActions";
import { getSkillsets } from "../../utils/Skillsets";
import match from "../../utils/match";

export interface FormData {
  description: string;
  skillsets: NestedValue<number[]>;
}

const charLimit = 240;
const defaultTeam = { description: "", skillsets: [] as number[] };

type FormEvent = "create" | "update" | "delete" | "error";

export const Register: React.FC = () => {
  const [lastFormEvent, setLastFormEvent] =
    React.useState<FormEvent | null>(null);

  const queryClient = useQueryClient();

  const {
    data: userTeam,
    isLoading,
    error: errorLoading,
  } = useQuery("userTeam", async () => {
    return getTeam();
  });

  const userHasTeam = Boolean(userTeam);

  // mutations
  const { mutate: saveMutate, isLoading: isSaving } = useMutation(
    async (args: {
      userTeam: TeamDto | null | undefined;
      formData: FormData;
    }) => {
      const { userTeam, formData } = args;
      if (userTeam) {
        return updateTeam(formData);
      } else {
        return createTeam(formData);
      }
    },
    {
      onSuccess: (result, args) => {
        setLastFormEvent(args.userTeam ? "update" : "create");
        queryClient.setQueryData<TeamDto | null>("userTeam", result);
        queryClient.invalidateQueries(["Teams"], { exact: false });
      },
      onError: () => {
        setLastFormEvent("error");
      },
    }
  );

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation(
    async () => {
      return deleteTeam();
    },
    {
      onSuccess: () => {
        setLastFormEvent("delete");
        queryClient.setQueryData("userTeam", null);
        queryClient.invalidateQueries(["Teams"], { exact: false });
      },
      onError: () => {
        setLastFormEvent("error");
      },
    }
  );

  const allowMutation = !(isLoading || isSaving || isDeleting);

  // setting up the form
  const { register, formState, handleSubmit, control, reset } =
    useForm<FormData>({
      criteriaMode: "all",
      defaultValues: defaultTeam,
    });

  // Reset form state depending on server-side userTeam
  React.useEffect(() => {
    const newDefaultValues =
      userTeam == null
        ? defaultTeam
        : {
            description: userTeam.description,
            skillsets: getSkillsets(userTeam.skillsetMask).map((s) => s.id),
          };
    reset(newDefaultValues);
  }, [userTeam, reset]);

  // validation
  React.useEffect(() => {
    register("skillsets", {
      validate: (value) => {
        if (value.length === 0) return "Required";
      },
    });
    register("description", {
      validate: (value) => {
        if (value.length > charLimit)
          return "The character limit is " + charLimit;
      },
    });
  }, [register]);

  // Counts how many characters are left for the description
  const description = useWatch({ control, name: "description" });
  const charRemain = charLimit - description.length;
  const remainColor = charRemain <= 0 ? "text-red-400" : "";

  let statusBar;
  const statusBarCommonClasses =
    "p-2 m-8 rounded text-center text-lg font-bold transition ";
  if (lastFormEvent && lastFormEvent != "error") {
    const message = match(
      lastFormEvent,
      ["create", "Team successfully created!"],
      ["update", "Team successfully updated!"],
      ["delete", "Team successfully deleted!"],
      [null, "Use the form below to let people know about your team!"]
    );
    statusBar = (
      <div className={statusBarCommonClasses + "bg-primary-dark"}>
        {message}
      </div>
    );
  } else if (isSaving) {
    statusBar = (
      <div className={statusBarCommonClasses + "bg-transparent border"}>
        Saving...
      </div>
    );
  } else if (isDeleting) {
    statusBar = (
      <div className={statusBarCommonClasses + "bg-transparent border"}>
        Deleting...
      </div>
    );
  } else if (lastFormEvent == "error") {
    statusBar = (
      <div className={statusBarCommonClasses + "bg-red-500"}>
        An error occurred while updating, please try again.
      </div>
    );
  } else if (errorLoading) {
    statusBar = (
      <div className={statusBarCommonClasses + "bg-red-500"}>
        An error occurred while checking if you already have a team, please
        refresh the page.
      </div>
    );
  } else {
    statusBar = (
      <div className={statusBarCommonClasses + "bg-transparent border"}>
        Use the form below to let people know about your team!
      </div>
    );
  }

  return (
    <>
      {statusBar}
      <form
        className="mx-auto space-y-8"
        onSubmit={handleSubmit((data) =>
          saveMutate({ userTeam, formData: data })
        )}
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
              <SkillsetSelector
                disabled={isLoading}
                selectedSkillsets={value}
                onChange={onChange}
              />
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
            Tell us a bit about yourself and the team you&rsquo;d like to see!
            <br />
            Characters Remaining:{" "}
            <span className={remainColor}>{charRemain}</span>
          </label>
          <textarea
            style={{ resize: "none" }}
            className={classnames(
              "text-md bg-transparent border px-4 py-2 block w-full placeholder-white placeholder-opacity-40 h-36 disabled:opacity-50",
              formState.errors.description
                ? "border-red-400 focus:border-red-500"
                : "border-white focus:border-primary"
            )}
            disabled={isLoading}
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
              <li>
                The type of games you like to make, or an idea you have for your
                jam game
              </li>
              <li>
                How big you want your team, and if there&rsquo;s anybody you{" "}
                <em>really</em> need
              </li>
              <li>
                If you&rsquo;re looking for a coder, make sure to mention what
                engine/language you&rsquo;re using!
              </li>
              <li>
                Anything else you&rsquo;d like a potential teammate to know!
              </li>
            </ul>
          </div>
        </div>
        <Button type="submit" disabled={!allowMutation}>
          {userHasTeam ? "Update Team" : "Post Team"}
        </Button>
        {userHasTeam ? (
          <Button
            type="button"
            onClick={() => deleteMutate()}
            className={"bg-red-500"}
            disabled={!allowMutation}
          >
            {"Delete Team"}
          </Button>
        ) : null}
      </form>
    </>
  );
};

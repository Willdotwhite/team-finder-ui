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
import { match, matchif } from "../../utils/match";
import { PageUserInfo } from "../../components/PageUserInfo";
import { languages } from "../../utils/LanguageData";
import { AddMessage } from "../../components/StatusMessenger";
import { MultiSelect } from "../../components/MultiSelect";
import { ArrayToRecord } from "../../utils/ArrayToRecord";

const languageSelectIndex: Record<string, string> = ArrayToRecord(languages, l => [l.code, l.display]);

export interface FormData {
  description: string;
  languages: string[];
  skillsets: NestedValue<number[]>;
}

const charLimit = 240;
const defaultTeam = { description: "", languages: ["en"], skillsets: [] as number[] };

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
  type saveArgs = {
    userTeam: TeamDto | null | undefined;
    formData: FormData;
  };
  const { mutate: saveMutate, isLoading: isSaving } = useMutation(
    (args: saveArgs) => args.userTeam ? updateTeam(args.formData) : createTeam(args.formData),
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
    async () => deleteTeam(),
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
      !userTeam
        ? defaultTeam
        : {
            description: userTeam.description,
            languages: userTeam.languages || ["en"],
            skillsets: getSkillsets(userTeam.skillsetMask).map((s) => s.id),
          };
    
    // Hack, due to the fact that the API returns wrong data
    // eslint-disable-next-line
    // @ts-ignore
    if(typeof newDefaultValues.languages === "string") newDefaultValues.languages = newDefaultValues.languages.split(",");
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
        if (value.length > charLimit) return "The character limit is " + charLimit;
      },
    });
  }, [register]);

  // Counts how many characters are left for the description
  const description = useWatch({ control, name: "description" });
  const charRemain = charLimit - description.length;
  const remainColor = charRemain <= 0 ? "text-red-400" : "";

  // Configuring the look + message of the status message
  const [statusClass, statusMsg] = matchif(
    [isSaving, ["bg-black border", "Saving..."]],

    [isDeleting, ["bg-black border", "Deleting..."]],

    [lastFormEvent == "error", [
      "bg-red-500",
      "An error occurred while updating, please try again."
    ]],

    [lastFormEvent, [
      "bg-primary-dark",
      match(lastFormEvent,
        ["create", "Team successfully created!"],
        ["update", "Team successfully updated!"],
        ["delete", "Team successfully deleted!"]
      )!
    ]],

    [errorLoading, [
      "bg-red-500",
      "An error occurred while checking if you already have a team, please refresh the page."
    ]],
  ) || ["", ""];

  React.useEffect(() => {
    if(statusMsg != "") AddMessage(statusClass, statusMsg);
  }, [statusClass, statusMsg]);

  return (
    <>
      <PageUserInfo />
      <form
        className="mx-auto space-y-14 pb-14"
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
              "rounded text-md bg-transparent border px-4 py-2 block w-full placeholder-white placeholder-opacity-40 h-36 disabled:opacity-50",
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
        </div>

        <div className="space-y-2">
          <div className="text-lg">
            Select preferred languages
          </div>
          <Controller
            control={control}
            name="languages"
            render={({ field: { value, onChange } }) => (
              <MultiSelect
                placeholder="Click here to add languages..."
                disabled={isLoading}
                selected={value}
                changeCallback={onChange}
                valueDisplayIndex={languageSelectIndex}
              />
            )}
          />
        </div>

        <div className="text-white text-sm p-3 pl-5 leading-relaxed border-red-500 border-l-4" style={{background:"#270202"}}>
          <div className="text-2xl font-bold text-red-500 mb-1">Don&rsquo;t forget!</div>
          You might want to mention:
          <ul className="list-disc pl-6">
            <li>If you have a timezone you prefer to work in</li>
            <li>If you have a specific game engine in mind (Unity, Unreal, Godot etc) - especially if you need a coder!</li>
            <li>The type of games you like to make, or an idea you have for your jam game</li>
            <li>Anything else you&rsquo;d like a potential teammate to know!</li>
          </ul>
          <div className="font-bold mt-3">And:</div>
          To allow interested jammers to contact you, you need to set your Discord account to allow for friend requests and messages from &quot;Everyone&quot;.
          <br></br>You can find this setting in your <a href="FinderSettingsImage_1.png" target="_blank" className="underline">Discord User Settings</a> under the <a href="FinderSettingsImage_2.png" target="_blank" className="underline"> Privacy &amp; Safety tab </a>.
        </div>
        
        <Button className="inline-block" type="submit" disabled={!allowMutation}>
          {userHasTeam ? "Update Team" : "Post Team"}
        </Button>

        {userHasTeam ? (
          <Button
            type="button"
            onClick={() => deleteMutate()}
            className={"inline-block ml-5 bg-red-500"}
            disabled={!allowMutation}
          >
            {"Delete Team"}
          </Button>
        ) : null}
      </form>
    </>
  );
};

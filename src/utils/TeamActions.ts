import {FormData} from "../pages/Register/Register";
import {filterValidLanguageCodes} from "../components/LanguageSelector";

export interface TeamDto {
  description: string;
  languages: string[];
  skillsetMask: number;
}

export const createTeam = async (formData: FormData): Promise<TeamDto> => {
  const team = teamFromForm(formData);
  await makeApiRequest("/teams", "POST", team);
  return team;
};

export const getTeam = async (): Promise<TeamDto | null> => {
  return (await makeApiRequest("/teams/mine", "GET")).json();
};

export const updateTeam = async (formData: FormData): Promise<TeamDto> => {
  const team = teamFromForm(formData);
  await makeApiRequest("/teams/mine", "PUT", teamFromForm(formData));
  return team;
};

export const deleteTeam = async (): Promise<Response> => {
  return makeApiRequest("/teams/mine", "DELETE");
};

export const reportTeam = async (teamId: string): Promise<Response> => {
  return await makeApiRequest(`/teams/report?teamId=${teamId}`, "POST");
};

/**
 * Convert FormData to the format needed to create/update a Team record
 * @param formData
 */
const teamFromForm = (formData: FormData): TeamDto => {
  return {
    description: formData.description,
    // TODO: Get the form to submit the correct multi-select data!
    // languages: filterValidLanguageCodes(formData.languages),
    languages: ["en", "ja", "ko"],
    skillsetMask: formData.skillsets.reduce((a, b) => a + b, 0),
  };
};

/**
 * Horrific general API request method
 * @param path
 * @param method
 * @param body
 */
const makeApiRequest = async (path: string, method: string, body: TeamDto | undefined = undefined) => {
  const token = localStorage.getItem("token");

  const options: RequestInit = {
    method: method,
    mode: "cors",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    }
  };
  
  if (body) {
    options['body'] = JSON.stringify(body);
  }
  
  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, options);
  if(!res.ok) {
    if(res.status == 401) window.location.replace(`${import.meta.env.VITE_API_URL}/oauth2/authorization/discord`);
    else throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`);
  }
  return res;
}

import {FormData} from "../pages/Register/Register";

interface TeamDto {
  description: string;
  skillsetMask: number;
}

export const getAllTeams = (queryParams: Record<string, any>): Promise<Array<Record<string, unknown>>> => {
  const url = new URL(`${import.meta.env.VITE_API_URL}/teams`);

  for(let k in queryParams){
    let v = queryParams[k];
    if(queryParams.hasOwnProperty(k) && v != null && v != undefined)
      url.searchParams.append(k, v.toString());
  }

  return fetch(url.toString(), {mode: "cors"}).then((res) => res.json());
};

export const createTeam = (formData: FormData): Promise<TeamDto> => {
  return makeApiRequest("/teams", "POST", teamFromForm(formData));
};

export const getTeam = (): Promise<TeamDto> => {
  return makeApiRequest("/teams/mine", "GET");
};

export const updateTeam = (formData: FormData): Promise<TeamDto> => {
  return makeApiRequest("/teams/mine", "PUT", teamFromForm(formData));
};

export const deleteTeam = (): Promise<TeamDto> => {
  return makeApiRequest("/teams/mine", "DELETE");
};

/**
 * Convert FormData to the format needed to create/update a Team record
 * @param formData
 */
const teamFromForm = (formData: FormData): TeamDto => {
  return {
    description: formData.description,
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

  const options = {
    method: method,
    mode: "cors",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    }
  };
  
  if (body) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    options['body'] = JSON.stringify(body);
  }
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${await response.text()}`
    );
  }
  return await response.json();
}

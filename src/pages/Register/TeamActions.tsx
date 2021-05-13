import {FormData} from "./Register";

interface TeamDto {
  description: string;
  skillsetMask: number;
}


export const createTeam = async (formData: FormData): Promise<TeamDto> => {
  return makeApiRequest("/teams", "POST", teamFromForm(formData));
};

export const getTeam = async (): Promise<TeamDto> => {
  return makeApiRequest("/teams/mine", "GET");
};

export const updateTeam = async (formData: FormData): Promise<TeamDto> => {
  return makeApiRequest("/teams/mine", "PUT", teamFromForm(formData));
};

export const deleteTeam = async (): Promise<TeamDto> => {
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

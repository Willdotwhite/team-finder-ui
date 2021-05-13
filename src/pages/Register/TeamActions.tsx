import {FormData} from "./Register";
import {getUserInfo, UserInfo} from "../../components/UserInfo";

interface TeamDto {
  description: string;
  skillsetMask: number;
}

const teamFromForm = (formData: FormData): TeamDto => {
  return {
    description: formData.description,
    skillsetMask: formData.skillsets.reduce((a, b) => a + b, 0),
  };
};

export const createTeam = async (formData: FormData): Promise<TeamDto> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/teams`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamFromForm(formData)),
  });

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${await response.text()}`
    );
  }
  return await response.json();
};


export const updateTeam = async (formData: FormData): Promise<TeamDto> => {
  const token = localStorage.getItem("token");
  const userInfo = getUserInfo()

  const response = await fetch(`${import.meta.env.VITE_API_URL}/teams/${userInfo.id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamFromForm(formData)),
  });

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${await response.text()}`
    );
  }
  return await response.json();
};


export const deleteTeam = async (): Promise<TeamDto> => {
  const token = localStorage.getItem("token");
  const userInfo = getUserInfo()

  const response = await fetch(`${import.meta.env.VITE_API_URL}/teams/${userInfo.id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${await response.text()}`
    );
  }
  return await response.json();
};

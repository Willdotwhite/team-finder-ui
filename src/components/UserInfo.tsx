export type UserInfo = {
  avatar: string | undefined,
  id: string | undefined,
  username: string | undefined
};


export const getUserInfo = () => {
  const storedUserData = localStorage.getItem("userData");
  const userInfo = JSON.parse(storedUserData!) as UserInfo;

  return userInfo;
}

export const useGetCurrentUserInfo = () => {
  const { name, profilePhoto, userID, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {}; // Get the current user info from localStorage

  return { name, profilePhoto, userID, isAuth };
};

import { useContext } from "react";
import { userDataContext } from "../context/userContext";

export function useUserData() {
  const context = useContext(userDataContext);
  if(!context){
    console.error('Error deploying App Context!!!');
  }
  return context;
};

import { useContext } from "react";
import { languageContext } from "../context/languageContext";

export function useLanguage(){
    const context = useContext(languageContext);
    if(!context)
        //nothing to-do

    return context;
}
import React from 'react';
import TreeDModel from '../3DModels/3Dmodel'
import Image from "next/image";
import styles from "./PopUp.module.scss";
import content from "../../../translate/en.json";
import CloseIcon from '@mui/icons-material/Close';
import { useUserData } from "../../../context/hooks/useUserData";


export default function PopUp({title, text, image}) {
  const { showPopUp, setShowPopUp } = useUserData();

  const handleToShowPopUp = () => {
    setShowPopUp(!showPopUp)
}
    return (
        <div className={styles.PopUp}>
            <div className={styles.PopUp_close} >
                <CloseIcon className={styles.PopUp_close_icon} sx={{ fontSize: 30, color: '#39879d',fontWeight:'bolder' }}  onClick={handleToShowPopUp}/>
            </div>
            <div className={styles.PopUp_information}>
                <h3>{title}</h3>  
                <p>{text}</p>
               
            </div>
        </div>
    );
}



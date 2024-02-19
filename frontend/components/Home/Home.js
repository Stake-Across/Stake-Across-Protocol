import {useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FooterMini from "../Misc/FooterMini/FooterMini";
import Section1 from "./Section1/Section1"
import Section2 from "./Section2/Section2"
import Section3 from "./Section3/Section3"
import Section4 from "./Section4/Section4"
import NetworkPopUp from "./NetworksPopup/NetworkPopUp";
import PopUp from "../Misc/PopUp/PopUp";
import Navbar from "../Misc/Navbar/Navbar";
import Spinner from "../Misc/Spinner/Spinner";
import Box from '@mui/material/Box';
import content from "../../translate/es.json";
import styles from "./Home.module.scss";
import { useUserData } from "../../context/hooks/useUserData";


export default function Home({ children }) {
  const { showNetworkPopUp, setShowNetworkPopUp } = useUserData();
  const { showPopUp, setShowPopUp } = useUserData();
  const {popUpInfo, setPopUpInfo} = useUserData();
  const { showSection, setshowSection } = useUserData();
  const {showSpinner, setShowSpinner}=useUserData();

  useEffect(() => {
    setShowSpinner(false)
  }, [setshowSection, setShowNetworkPopUp,setShowSpinner]);

  return (
    <>
      <div className={styles.Home}>
        <Navbar  />
        {showSpinner?<Box > <Spinner /> </Box>:<></>}
        {showNetworkPopUp ? <NetworkPopUp /> : ''}
        {showPopUp ? <PopUp title={popUpInfo.title} text={popUpInfo.detail}/> :''}
        <div className={styles.Home_section1}>
          {showSection === 1 ? <Section1 /> : ''}
        </div>
        <div className={styles.Home_section2}>
          {showSection === 2 ? <Section2 /> : ''}
        </div>
        <div className={styles.Home_section3}>
          {showSection === 3 ? <Section3 /> : ''}
        </div>
        <div className={styles.Home_section4}>
          {showSection === 4 ? <Section4 /> : ''}
        </div>
        <div className={styles.Home_footer}>
        <FooterMini />
        </div>
      </div>
    </>
  );
}

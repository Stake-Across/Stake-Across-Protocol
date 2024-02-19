import React from "react";
import styles from "./Profile.module.scss";
import Navbar from "../Misc/Navbar/Navbar";
import FooterMini from "../Misc/FooterMini/FooterMini";
import Referral from "./Referral/Referral";
import { useUserData } from "../../context/hooks/useUserData";
import Loader from "../Misc/Loader/FooterMini/Loader";

export default function Profile() {
  const { userData, setUserData } = useUserData();

  return (
    <div className={styles.Profile}>
      <Navbar userData={userData} id={2}/>
      <Referral />
      <FooterMini profile={true} />
    </div>
  );
}

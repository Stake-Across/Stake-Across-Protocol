import React from "react";
import styles from "./Error.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
//import { logout } from "../../../store/AccessTokenStore";
import { useUserData } from "../../../context/hooks/useUserData";
//import { cancelReferral } from "../../../services/ReferralService";

export default function Error({ type, title, msg, btn }) {
  const { userData } = useUserData();
  const router = useRouter();
  const cancelPurchase = {
    userId: userData.id
  
  };
 

  const goHome = () => {
    router.push("/");
  };

  return (
    <>
      {title === "Error de identificación" && (
        <div
          style={{
            backgroundImage: "url('')",
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            filter: "blur(24px)",
          }}
        ></div>
      )}
      <div
        className={styles.Error}
        style={{
          backdropFilter:
            title !== "Error de identificación" ? "blur(24px)" : "",
        }}
      >
        <div className={styles.Error_title}>{title}</div>
        <div className={styles.Error_text}>{msg}</div>
        <div className={styles.Error_button}>
        <button onClick={goHome}>
            Home
          </button>
        </div>
      </div>
    </>
  );
}

import React from 'react';
import { useRef, useEffect, useState } from "react";
import TreeDModel from '../../Misc/3DModels/3Dmodel'
import { useUserData } from "../../../context/hooks/useUserData";
import { isConnected } from "../../../helpers/validators";
import { metamask } from "../../../helpers/metamask";
import content from "../../../translate/en.json";
import styles from "./Section1.module.scss";
import Image from "next/image";



export default function Section1() {
  const { userData, setUserData } = useUserData();
  const { currentNetwork, setCurrentNetwork } = useUserData()
  const { stakeList, setStakeList } = useUserData()
  const { showSection, setshowSection } = useUserData();
  const {showPopUp, setShowPopUp } = useUserData();
  const {popUpInfo, setPopUpInfo} = useUserData();

  const goToAccountSection = () => {
    setshowSection(3)
  }
  async function signIn() {
    let browserCurrentNetwork = await metamask.validateNetwork(currentNetwork);
    console.log(browserCurrentNetwork)
      if (browserCurrentNetwork !== currentNetwork) {
        await metamask.doWalletSwitch(currentNetwork)
     
      }
    await metamask.getAddress(currentNetwork).then(async (address) => {     
      const currentBlockchainInformation = { networkName: currentNetwork, publicKey: address, tokenSymbol: undefined, currentBalance: undefined }
      if (userData.length === 0 || !isConnected(userData, currentBlockchainInformation)) {
        let completeBalance = await metamask.getBalance(currentNetwork,currentBlockchainInformation.publicKey);
        let currentNetworkTokenInformation = completeBalance.find(value => value.networkName === currentNetwork);
        currentBlockchainInformation.currentBalance = currentNetworkTokenInformation.tokenBalance;
        currentBlockchainInformation.tokenSymbol = currentNetworkTokenInformation.tokenSymbol;
        setUserData([...userData, ...completeBalance])
        goToAccountSection();
      }else{
        setPopUpInfo({title:content.popUp.metamaskConnection.existing.title,detail:content.popUp.metamaskConnection.existing.detail,image:''})
        setShowPopUp(true); 
      }
    })
    setStakeList(...stakeList, await metamask.previewRedeem())
  }
  useEffect(() => {

  }, [setshowSection, setCurrentNetwork,setShowPopUp]);
  return (
    <div className={styles.Section1}>
      < div className={styles.Section1_left}>
        <div className={styles.Section1_left_texts}>
          <h1>{content.home.section1.title} </h1>
          <h3>{content.home.section1.subtitle}</h3>
          <h2>{content.home.section1.paragraph}</h2>
        </div>
        <div className={styles.Section1_left_goto}>
          <button onClick={() => signIn(true)} >{content.navbar.LoginBtn}</button>
        </div>
        <div > <p></p></div>


      </div>

      <div className={styles.Section1_right}>
        <Image
          src="/Home/Section1/capi.webp"
          alt="Descripción de la imagen"
          width={1000} // Ancho deseado de la imagen
          height={600} // Altura deseada de la imagen
        />
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { metamask } from "../../../helpers/metamask";
import content from "../../../translate/en.json";
import styles from "./Navbar.module.scss";
import { useUserData } from "../../../context/hooks/useUserData";
import validators from "../../../helpers/validators";
import TreeDModel from '../3DModels/3Dmodel'
import { isConnected } from "../../../helpers/validators";
import { useRef, useEffect, useState } from "react";



export default function Navbar({ }) {
  const { blockchainInformation, setBlockchainInformation } = useUserData();
  const { showPopUp, setShowPopUp } = useUserData();
  const { popUpInfo, setPopUpInfo } = useUserData();
  const { currentNetwork, setCurrentNetwork } = useUserData()
  const { showSection, setshowSection } = useUserData();
  const { showNetworkPopUp, setShowNetworkPopUp } = useUserData();
  const { stakeList, setStakeList } = useUserData()
  const router = useRouter();
  const url = router.pathname;
  const { userData, setUserData } = useUserData();
  const scrollToElement = () => reference.current.scrollIntoView();
  const {showSpinner, setShowSpinner}=useUserData();


  async function signIn(desiredNetwork='') {
    desiredNetwork = desiredNetwork!=='' ? desiredNetwork : currentNetwork
    let browserCurrentNetwork = await metamask.validateNetwork(desiredNetwork);
    if (browserCurrentNetwork !== desiredNetwork) {
      await metamask.doWalletSwitch(desiredNetwork)
      setCurrentNetwork(desiredNetwork);
    }
    await metamask.getAddress(desiredNetwork).then(async (address) => {
      const currentBlockchainInformation = { networkName: desiredNetwork, publicKey: address, tokenSymbol: undefined, currentBalance: undefined }
      if (userData.length === 0 || !isConnected(userData, currentBlockchainInformation)) {
        let completeBalance = await metamask.getBalance(desiredNetwork, currentBlockchainInformation.publicKey);
        let currentNetworkTokenInformation = completeBalance.find(value => value.networkName === desiredNetwork);
        currentBlockchainInformation.currentBalance = currentNetworkTokenInformation.tokenBalance;
        currentBlockchainInformation.tokenSymbol = currentNetworkTokenInformation.tokenSymbol;
        setUserData([...userData, ...completeBalance])
      } else {
        setPopUpInfo({ title: content.popUp.metamaskConnection.existing.title, detail: content.popUp.metamaskConnection.existing.detail, image: '' })
        setShowPopUp(true);
      }
    })
    setStakeList(...stakeList, await metamask.previewRedeem())
  }

  const handleToShowNetworkPopup = () => {
    setShowNetworkPopUp(!showNetworkPopUp)
  }
  const handleSectionToShow = async(event) => {
    router.push("/")
    const sectionToShow = event.target.id;
    const codeSection = parseInt(sectionToShow.charAt(sectionToShow.length - 1), 10);

    if (userData.length === 0) {
      await signIn('ethereum');
    }
    setShowSpinner(true)
    setshowSection(codeSection)
  }

  const goToTheProject = () => {
    router.push("/theProject")
  }


  useEffect(() => {


  }, [   setShowSpinner,setshowSection, setShowPopUp, setShowNetworkPopUp, setUserData]);
  return (
    <>

      <div className={`${styles.NavBar} pt-0`}>
        <div className={styles.NavBar_sectionA}>
          <div onClick={handleSectionToShow} id='Section1'>
            <Image onClick={handleSectionToShow} id='Section1'
              src="/Navbar/logow.png"
              alt="Descripción de la imagen"
              width={500} // Ancho deseado de la imagen
              height={300} // Altura deseada de la imagen
            />
          </div>
        </div>
        <div className={styles.NavBar_sectionB}>
          <button onClick={handleSectionToShow} id='Section2'>{content.navbar.stake}</button>
          <button onClick={handleSectionToShow} id='Section3'>{content.navbar.account}</button>
          
          <button onClick={goToTheProject}>{content.navbar.theProject}</button>
          <div onClick={handleToShowNetworkPopup}
            //onClick={() =>signIn('avalanche')}
            className={styles.NavBar_sectionB_network}
          >
            {content.navbar.network}
          </div>

          <div
            onClick={() => signIn()}
            className={styles.NavBar_sectionB_btnFuture}
          >
            {content.navbar.LoginBtn}
          </div>
        </div>
      </div>

    </>
  );
}

import React from 'react';
import TreeDModel from '../../Misc/3DModels/3Dmodel'
import Image from "next/image";
import styles from "./NetworkPopUp.module.scss";
import content from "../../../translate/en.json";
import CloseIcon from '@mui/icons-material/Close';
import { useUserData } from "../../../context/hooks/useUserData";
import { metamask } from "../../../helpers/metamask";

export default function NetworkPopUp() {

    const { showNetworkPopUp, setShowNetworkPopUp } = useUserData();
    const handleCapital = () => { }
    const {currentNetwork, setCurrentNetwork}= useUserData()
    const currentNetworks=metamask.availableNetworks();
    const handleToShowNetworkPopup = () => {
        setShowNetworkPopUp(!showNetworkPopUp)
    }
    async function chooseNetwork(event) {
        const address = await metamask.getAddress(event.target.id);
        const addressObj = {
          publicKey: address,
        };
        setCurrentNetwork(event.target.id);
      }

    return (
        <div className={styles.NetworkPopUp}>
            <div className={styles.NetworkPopUp_close} >
                <CloseIcon className={styles.NetworkPopUp_close_icon} sx={{ fontSize: 30, color: '#39879d',fontWeight:'bolder' }}  onClick={handleToShowNetworkPopup}/>
            </div>
            <div className={styles.NetworkPopUp_networksList}>
            { currentNetworks.map((d, index) => {
                return (
                  <div  className={styles.NetworkPopUp_networksList_currentNetwork} key={index} id={d.name}>
                    <Image
                        src={d.img}
                        alt={d.chainName}
                        width={30} // Ancho deseado de la imagen
                        height={30} // Altura deseada de la imagen
                        id={d.name}
                        onClick={chooseNetwork}
                    /> 
                    <p id={d.name} >{d.chainName}</p>
                  </div>

                );
              })}
            </div>
        </div>
    );
}



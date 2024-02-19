import React, { useState, useEffect } from 'react';
import styles from "./Section2.module.scss";
import content from "../../../translate/en.json";
import { TextField, InputAdornment } from '@mui/material';
import { useUserData } from "../../../context/hooks/useUserData";
import { metamask } from "../../../helpers/metamask";


export default function Section2() {

  let [tokensToStake, setTokensToStake] = useState();
  const { showPopUp, setShowPopUp } = useUserData();
  const { popUpInfo, setPopUpInfo } = useUserData();
  const [showStake, setShowStake] = useState(true);
  const { userData, setUserData } = useUserData();
  const { currentNetwork, setCurrentNetwork } = useUserData();
  const currentNetworks = metamask.availableNetworks();
  const currentNetworkInformation = currentNetworks.find((n) => n.name === currentNetwork);
  const {stakeList, setStakeList} = useUserData();
  const handleStakeToShow = async () => {
    let network = currentNetwork;
    if (showStake) {
      network='ethereum';
      setShowStake(false)
    } else {
      network="avalanche"
      setShowStake(true)
    }
    if(currentNetwork!== network){
      await metamask.doWalletSwitch(network)
      setCurrentNetwork(network)
      let currentBalance = await metamask.getBalance(network );
      for (let i = 0; i < userData.length-1; i++) {
        for (let j = 0; j < currentBalance.length-1; j++) {
          if ( userData[i].tokenSymbol === currentBalance[j].tokenSymbol &&
            userData[i].tokenBalance === currentBalance[j].tokenBalance) {
              console.log(currentBalance[j].tokenSymbol)
              currentBalance.splice(j, 1);
          }

        }
      }
      console.log(currentBalance)
        setUserData([...userData, ... currentBalance])
      

      
    }


   

  }

  const handleCapital = (e) => {
    setTokensToStake(parseFloat(e.target.value));
  }
  const understaking = async (e) => {
    let amount = stakeList[e.target.id][e.target.value];
    await metamask.doRedeem(amount).then(result => {
      setPopUpInfo({ title: result.title, detail: result.detail, image: '' })
      setShowPopUp(true);
    })
    setStakeList(await metamask.previewRedeem())
  }


  const stakeNow = async () => {
    let browserCurrentNetwork = await metamask.validateNetwork(currentNetwork);
    if (browserCurrentNetwork !== currentNetwork) {
      setCurrentNetwork(browserCurrentNetwork);
    }
    let userInfo = userData.find((user) => user.networkName === browserCurrentNetwork)
    if (userInfo.tokenBalance >= tokensToStake) {
      await metamask.sendTokens(userInfo.publicKey, tokensToStake, browserCurrentNetwork).then(result => {
        setPopUpInfo({ title: result.title, detail: result.detail, image: '' })
        setShowPopUp(true);
      })

    } else {

      setPopUpInfo({ title: content.popUp.balance.failed.title, detail: content.popUp.balance.failed.detail, image: '' })
      setShowPopUp(true);

    }
  }



  useEffect( () => {
   handleStakeToShow();
  }, [setShowStake, setStakeList, setShowPopUp, setUserData, setCurrentNetwork]);

  return (
    <div className={styles.Section2}>
      < div className={styles.Section2_subNavBar}>
        <button className={styles.Section2_subNavBar_myStakeButton} onClick={handleStakeToShow}>{content.home.section2.mystake}</button>
        <button className={styles.Section2_subNavBar_stakeButton} onClick={handleStakeToShow}>{content.home.section2.stake}</button>
      </div>
      {showStake ?
        <div className={styles.Section2_stake}>
          <div className={styles.Section2_stake_process}>
            <TextField className={styles.Section2_stake_process_capital}
              variant="outlined"
              onChange={handleCapital}
              id="capital"
              name="capital"
              inputProps={{ min: 0 }}
              InputProps={{
                endAdornment: (<InputAdornment position="end">{currentNetworkInformation.token}<>&nbsp;</></InputAdornment>)
              }} />
            <button onClick={stakeNow}>{content.home.section2.stakeNow}</button>
          </div>
        </div> :
        <div className={styles.Section2_listStake} >
          <div className={styles.Section2_listStake_currentList}>
            <div className={styles.Section2_listStake_currentList_head}>
              <p className={styles.Section2_listStake_currentList_head_title}>Token</p>
              <p className={styles.Section2_listStake_currentList_head_title}>Amount</p>
              <p className={styles.Section2_listStake_currentList_head_title}>Network</p>
              <p className={styles.Section2_listStake_currentList_head_title}>APR</p>
              <p className={styles.Section2_listStake_currentList_head_title}>Reward</p>
              <p className={styles.Section2_listStake_currentList_head_title}> </p>
              <p className={styles.Section2_listStake_currentList_head_title}> </p>
            </div>
          </div>

          {stakeList.map((d, index) => {
            return (
              <div className={styles.Section2_listStake_currentList_currentStake} id={index}>
                <p className={styles.Section2_listStake_currentList_currentStake_information} id={index}> {d.token} </p>
                <p className={styles.Section2_listStake_currentList_currentStake_information} id={index} > {d.amount.slice(0, 6)} </p>
                <p className={styles.Section2_listStake_currentList_currentStake_information} id={index}> {d.network} </p>
                <p className={styles.Section2_listStake_currentList_currentStake_information} id={index}> {d.apr} </p>
                <p className={styles.Section2_listStake_currentList_currentStake_information} id={index}> {d.reward.slice(0, 6)} </p>
                <p className={styles.Section2_listStake_currentList_currentStake_action} id={index}>
                  <button id={index} value='reward' onClick={understaking}
                /*  () => dispatch({ type: 'remove', index: { index } })} */ >
                    Claim reward
                  </button></p>
                <p className={styles.Section2_listStake_currentList_currentStake_action} id={index}>
                  <button id={index} value='all' onClick={understaking}
                /*() => dispatch({ type: 'remove', index: { index } })}  */>
                    Understaking
                  </button></p>

              </div>

            );
          })}

        </div>
      }
    </div>
  );
}

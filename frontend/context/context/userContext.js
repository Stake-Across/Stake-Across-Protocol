/* eslint-disable react-hooks/exhaustive-deps */
import { useState, createContext, useEffect } from "react";

/**
 * The initial context values.
 */
export const userDataContext = createContext();
 
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [blockchainInformation, setBlockchainInformation] = useState({networkName:'',publicKey:'',tokenSymbol:'',currentBalance:''}); 
  const [currentNetwork, setCurrentNetwork] = useState("ethereum");
  const [showSection, setshowSection] = useState(1);
  const [showNetworkPopUp, setShowNetworkPopUp]= useState(false)
  const [showPopUp, setShowPopUp]= useState(false)
  const [popUpInfo, setPopUpInfo]= useState({title:'',detail:'',image:''})
  const [showBanner, setShowBanner]= useState(false)
  const [missing, setMissing]= useState(false)
  const [page, setPage] = useState(0);
  const [referral, setReferral] = useState(0);
  const [stakeList, setStakeList]=useState([]);


  //TODO: Hacer Referral context

  useEffect(() => {

  }, [userData, setUserData]);

  const value = {
    userData,
    setUserData,
    showBanner,
    setShowBanner,
    page,
    setPage,
    referral,
    setReferral,
    missing, 
    setMissing,
    showSection,
    setshowSection,
    showNetworkPopUp, 
    setShowNetworkPopUp,
    currentNetwork, 
    setCurrentNetwork,
    blockchainInformation,
    setBlockchainInformation,
    showPopUp, 
    setShowPopUp,
    popUpInfo, 
    setPopUpInfo,
    stakeList, setStakeList
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

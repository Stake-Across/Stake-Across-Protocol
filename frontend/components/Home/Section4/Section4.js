import React from 'react';
import TreeDModel from '../../Misc/3DModels/3Dmodel'
import CachedIcon from '@mui/icons-material/Cached';
import styles from "./Section4.module.scss";
import content from "../../../translate/en.json";
import { TextField, InputAdornment } from '@mui/material';
import { BorderColorOutlined } from '@mui/icons-material';
import { metamask } from "../../../helpers/metamask";
import { useUserData } from "../../../context/hooks/useUserData";

export default function Section4() {

    const {currentNetwork, setCurrentNetwork}= useUserData()
 
    const handleCapital = () => { }

    async function test() {
        //debugger;
        const address = await metamask.getContractInfo();
    
      }


    return (
        <div className={styles.Section4}>
            < div className={styles.Section4_connectionInformation}>
                <p className={styles.Section4_connectionInformation_ccip}>CCIP</p>
                <p className={styles.Section4_connectionInformation_currentNetwork}>{currentNetwork}</p>
            </div>
            < div className={styles.Section4_subNavBar}>
                <TextField className={styles.Section4_stake_process_capital}
                    variant="outlined"
                    onChange={handleCapital}
                    id="capital"
                    name="capital"
                    inputProps={{ min: 1 }}
                    onInput={(e) => {
                        e.target.value =  Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                    }}
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">Ep<>&nbsp;</></InputAdornment>)
                    }} />
            </div>
            < div className={styles.Section4_cachedIncon}>
                <CachedIcon sx={{ fontSize: 50, color:'#39879d' }}/>
            </div>
            < div className={styles.Section4_subNavBar}>
                <TextField className={styles.Section4_stake_process_capital}
                    variant="outlined"
                    onChange={handleCapital}
                    id="capital"
                    name="capital"
                    inputProps={{ min: 1 }}
                    onInput={(e) => {
                        e.target.value =  Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                    }}
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">Ep<>&nbsp;</></InputAdornment>)
                    }} />
            </div>

            < div className={styles.Section4_actionZone}>
                <button  onClick={() =>test()} className={styles.Section4_actionZone_ccipButton} >transfer</button>
            </div>

        </div>
    );
}



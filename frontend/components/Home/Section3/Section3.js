import React from 'react';
import TreeDModel from '../../Misc/3DModels/3Dmodel'
import styles from "./Section3.module.scss";
import content from "../../../translate/en.json";
import { TextField, InputAdornment } from '@mui/material';
import { BorderColorOutlined } from '@mui/icons-material';
import { useUserData } from "../../../context/hooks/useUserData";


export default function Section3() {
    const { userData, setUserData } = useUserData();

    return (
        <div className={styles.Section3}>
            <h5>Account information</h5>
            <h6> Your assets</h6>

            <div className={styles.Section3_assets}>
                {userData.map((asset, index) => {
                    return (
                    <TextField className={styles.Section3_assets_asset}
                        variant="outlined"
                        key={index}
                        id={index + ' ' + asset}
                        value={asset.tokenBalance.slice(0, 6)}
                        inputProps={{ min: 1 }}
                        onInput={(e) => {
                            e.target.value =  Math.max(0, parseInt(e.target.value)).slice(0, 6)
                        }}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (<InputAdornment position="end">{asset.tokenSymbol}<>&nbsp;</></InputAdornment>)
                        }} />)
                })}
            </div>
        </div>
    );
}



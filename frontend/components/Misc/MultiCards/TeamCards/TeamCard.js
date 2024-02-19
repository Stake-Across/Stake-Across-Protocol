import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from "./TeamCard.module.scss";
import Link from "@mui/material/Link";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function TeamCard({ member }) {
    return (
        <Card className={styles.TeamCard} sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={member.pictureOrAvatar}
                    alt="green iguana"
                />
                <CardContent>
                    <h5> {member.name} </h5>
                    <p>
                        {member.role}
                    </p>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link href={member.linkedin} style={{ color: "blue" }}>
                    <LinkedIn />
                </Link>

            </CardActions>
        </Card>
    );
}
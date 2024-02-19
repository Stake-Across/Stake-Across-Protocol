import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material"
import styles from "./FooterMini.module.scss";

export default function FooterMini() {
  return (
      <Box
        className={styles.Footer}
        component="footer"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? '#39879d'//theme.palette.brown[200]
              : '#205068',//theme.palette.brown[800],
          p: 6,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="white" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="white">
              We are a revolutionary staking protocol, empowered by CCIP and Chainlink technology, 
              designed specifically for cross-chain staking to optimize yield generation across 
              various blockchain networks
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="white" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" color="white">
                Email: stakeacrossprotocol@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="white" gutterBottom>
                Follow Us
              </Typography>
              <Link href="https://www.facebook.com/"  style={{ color: "white" }}>
                <Facebook />
              </Link>
              <Link
                href="https://www.instagram.com/"  style={{ color: "white" }} sx={{ pl: 1, pr: 1 }}
              >
                <Instagram />
              </Link>
              <Link href="https://twitter.com/StakeAcross" style={{ color: "white" }}>
                <Twitter />
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" color="white" align="center">
              {"Copyright © "}
              <Link color="inherit" href="https://your-website.com/">
                Your Website
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Container>
      </Box>
    );

}

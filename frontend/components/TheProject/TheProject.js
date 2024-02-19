import React from "react";
import styles from "./TheProject.module.scss";
import { useEffect } from "react";
import NetworkPopUp from "../Home/NetworksPopup/NetworkPopUp";
import Navbar from "../Misc/Navbar/Navbar";
import FooterMini from "../Misc/FooterMini/FooterMini";
import TeamCard from "../Misc/MultiCards/TeamCards/TeamCard";
import content from "../../translate/en.json";
import { useUserData } from "../../context/hooks/useUserData";


export default function TheProject() {

  const { showNetworkPopUp, setshowNetworkPopUp } = useUserData();
  const { showSection, setshowSection } = useUserData();



  useEffect(() => {

  }, [setshowSection, setshowNetworkPopUp]);

  return (
    <div className={styles.TheProject}>
      <Navbar />
      {showNetworkPopUp ? <NetworkPopUp /> : ''}
      <div className={styles.TheProject_section_aboutTheProject}>
        <h3>{content.theProject.aboutTheProject.title} </h3>
        <h4>{content.theProject.aboutTheProject.subtitle} </h4>
        <h5>{content.theProject.aboutTheProject.context.title} </h5>
        <p>{content.theProject.aboutTheProject.context.paragraphOne}</p>
        <p>{content.theProject.aboutTheProject.context.paragraphTwo}</p>

        <h5>{content.theProject.aboutTheProject.problem.title} </h5>
        <h6>{content.theProject.aboutTheProject.problem.sectionOne.title}</h6>
        <p>{content.theProject.aboutTheProject.problem.sectionOne.paragraphOne}</p>
        <h6>{content.theProject.aboutTheProject.problem.sectionTwo.title}</h6>
        <p>{content.theProject.aboutTheProject.problem.sectionTwo.paragraphOne}</p>
        <h6>{content.theProject.aboutTheProject.problem.sectionTree.title}</h6>
        <p>{content.theProject.aboutTheProject.problem.sectionTree.paragraphOne}</p>
        <h6>{content.theProject.aboutTheProject.problem.sectionFour.title}</h6>
        <p>{content.theProject.aboutTheProject.problem.sectionFour.paragraphOne}</p>

        <h5 >{content.theProject.aboutTheProject.proposal.title} </h5>
        <h6>{content.theProject.aboutTheProject.proposal.sectionOne.title}</h6>
        <p>{content.theProject.aboutTheProject.proposal.sectionOne.paragraphOne}</p>
        <h6>{content.theProject.aboutTheProject.proposal.sectionTwo.title}</h6>
        <p>{content.theProject.aboutTheProject.proposal.sectionTwo.paragraphOne}</p>
        <h6>{content.theProject.aboutTheProject.proposal.sectionTree.title}</h6>
        <p>{content.theProject.aboutTheProject.proposal.sectionTree.paragraphOne}</p>

        <h5 >{content.theProject.aboutTheProject.benefits.title} </h5>
        <h6>{content.theProject.aboutTheProject.benefits.sectionOne.title}</h6>
        <p>{content.theProject.aboutTheProject.benefits.sectionOne.paragraphOne}</p>
        <h6>{content.theProject.aboutTheProject.benefits.sectionTwo.title}</h6>
        <p>{content.theProject.aboutTheProject.benefits.sectionTwo.paragraphOne}</p>

        <h3 >{content.theProject.aboutTheProject.summary.title} </h3>
        <p>{content.theProject.aboutTheProject.summary.paragraphOne}</p>

      </div>
      <div className={styles.TheProject_section_aboutTheTeam}>
        <h2>{content.theProject.aboutTheTeam.title} </h2>
        <div className={styles.TheProject_section_aboutTheTeam_members}>
          {content.theProject.aboutTheTeam.members.map((member, index) => (
            <TeamCard key={index} id={index} member={member} />
          ))}
        </div>
      </div>
      <FooterMini />
    </div>
  );
}

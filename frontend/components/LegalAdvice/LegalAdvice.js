import Link from "next/link";
import Image from "next/image";
import content from "../../translate/es.json";
import styles from "./LegalAdvice.module.scss";

export default function LegalAdvice({ checked, setChecked, setShowLegal }) {
  const onChange = () => {
    setChecked(!checked);
  };
  const onClick = () => {
    setShowLegal(false);
  };
  return (
    <div className={styles.LegalAdvice}>
      <div className={styles.LegalAdvice_skeleton}>
        <div className={styles.LegalAdvice_container}>
          <h1 className={styles.LegalAdvice_container_title}>
            {content.legal.title}
          </h1>
          <div className={`${styles.LegalAdvice_container_info} my-9`}>
            <span className={styles.LegalAdvice_container_info_title}>
              {content.legal.subtitle}
            </span>
            <p
              className={`${styles.LegalAdvice_container_info_content} my-5`}
            >
              <span className={styles.LegalAdvice_container_info_title}>
                {content.legal.liable.title}&nbsp;
              </span>
              {content.legal.liable.content}
            </p>
            {content.legal.points.map((point, i) => (
              <p
                className={`${styles.LegalAdvice_container_info_content} my-5`}
                key={i}
              >
                <span className={styles.LegalAdvice_container_info_title}>
                  {point.title}&nbsp;
                </span>
                {point.content}
                <a
                  href="/privacy"
                  className={styles.LegalAdvice_container_info_more}
                >
                  &nbsp;{point.moreInfo}
                </a>
              </p>
            ))}
          </div>
          <div className={`${styles.LegalAdvice_check} mt-5`}>
            <input
              type="checkbox"
              required
              checked={checked}
              name="checked"
              onChange={onChange}
              className={styles.LegalAdvice_check_input}
            />
            <p className={styles.LegalAdvice_check_text}>
              {content.legal.check1}&nbsp;
              <span className={styles.LegalAdvice_check_text_Referral}>
                <Link href="/privacy">{content.legal.Referral}</Link>
              </span>
              &nbsp;{content.legal.check2}
            </p>
          </div>
        </div>
        <div className={styles.LegalAdvice_button}>
          <button
            disabled={!checked ? true : false}
            onClick={onClick}
            className={styles.LegalAdvice_button_btn}
          >
            <div className={styles.LegalAdvice_button_btn_txt}>
              {content.legal.btnLegal}
            </div>
            <Image width={16} height={16} src="/Legal/arrow.png"></Image>
          </button>
        </div>
      </div>
    </div>
  );
}

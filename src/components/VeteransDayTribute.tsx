import Link from "next/link";
import styles from "./VeteransDayTribute.module.css";

/** Shared decorative backdrop; the tribute remains real, accessible text. */
function TributeFlag() {
  return (
    <svg className={styles.flag} viewBox="0 0 1000 526" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="tribute-stars" width="52" height="44" patternUnits="userSpaceOnUse">
          <path d="M26 5 30 17 43 17 33 25 37 38 26 30 15 38 19 25 9 17 22 17Z" fill="currentColor" />
        </pattern>
      </defs>
      {Array.from({ length: 13 }, (_, index) => (
        <rect key={index} x="0" y={index * 40.5} width="1000" height="40.5" fill={index % 2 === 0 ? "#b5c4d0" : "#314965"} />
      ))}
      <rect width="400" height="283.5" fill="#10243a" />
      <rect width="400" height="283.5" fill="url(#tribute-stars)" />
    </svg>
  );
}

export function VeteransDayAnnouncement() {
  return (
    <div className={styles.announcement}>
      <span aria-hidden="true">★</span>
      <p>November 11 <span className={styles.separator}>·</span> Honoring all who served</p>
      <span aria-hidden="true">★</span>
    </div>
  );
}

export function VeteransDayTribute() {
  return (
    <section aria-labelledby="veterans-tribute-heading" className={styles.home}>
      <div className={styles.hero}>
        <TributeFlag />
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>Sandstone salutes you</p>
            <h1 id="veterans-tribute-heading" className={styles.salute}>
              To all who <span>served.</span>
            </h1>
          </div>
          <div className={styles.thanks}>
            <p>For your courage.<br />For your commitment.<br />For all you have given.</p>
            <p className={styles.thankYou}>Thank you.</p>
          </div>
        </div>
      </div>
      <div className={styles.gratitude}>
        <p className={styles.redEyebrow}>To our veterans &amp; their families</p>
        <h2>Your service. Our gratitude.</h2>
        <p className={styles.message}>This Veterans Day, we honor the men and women who served our country and the families who stood beside them.</p>
        <div className={styles.profileLink}>
          <h3>Service that continues at home.</h3>
          <p>Meet Alejandro Gamboa <span aria-hidden="true">·</span> U.S. Navy Veteran</p>
          <Link href="/agents/alejandro-gamboa" className={styles.button}>Meet Alejandro <span aria-hidden="true">↗</span></Link>
        </div>
        <p className={styles.motto}>Luxury. Lifestyle. Legacy.</p>
      </div>
    </section>
  );
}

export function AlejandroVeteransTribute() {
  return (
    <section aria-labelledby="alejandro-service-heading" className={styles.profile}>
      <TributeFlag />
      <div className={styles.profileInner}>
        <p className={styles.eyebrow}>Veterans Day <span aria-hidden="true">·</span> November 11</p>
        <p className={styles.stars} aria-hidden="true">★ ★ ★</p>
        <h2 id="alejandro-service-heading">Honoring a life of service.</h2>
        <p>This Veterans Day, we recognize Alejandro Gamboa’s service in the U.S. Navy and honor all veterans and their families.</p>
        <p className={styles.profileThankYou}>Thank you for your service.</p>
      </div>
    </section>
  );
}

import Link from "next/link";
import styles from "./VeteransDayTribute.module.css";
import brave from "./HomeOfTheBrave.module.css";
import { getAgentBySlug } from "@/data/agents";

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
  const alejandro = getAgentBySlug("alejandro-gamboa");
  if (!alejandro) return null;

  return (
    <section className={brave.service} aria-labelledby="service-beyond-uniform-heading">
      <h2 id="service-beyond-uniform-heading">Service that goes beyond the uniform.</h2>
      <div className={brave.divider} aria-hidden="true">
        <img src="/mobile-header-logo.webp" alt="" width={32} height={36} />
      </div>
      <div className={brave.agent}>
        <img src={alejandro.image} alt={alejandro.name} width={400} height={400} className={brave.portrait} loading="lazy" />
        <div className={brave.agentCopy}>
          <h3>{alejandro.name}</h3>
          <p className={brave.credentials}>U.S. Navy Veteran <span aria-hidden="true">·</span> REALTOR®</p>
          <p className={brave.description}>Serving military families, veterans and the El Paso community.</p>
          <Link href={`/agents/${alejandro.slug}`} className={brave.agentLink}>Meet Alejandro <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <p className={brave.motto}>Luxury. Lifestyle. Legacy.</p>
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

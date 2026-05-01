import styled from "styled-components";
import { SUPPORT_EMAIL } from "../config/contact";
import { APP_TRADEMARK } from "../config/legal";

const C = {
  text: "#3B230A",
  beigeMid: "#E8E0D5",
  accent: "#F05E20",
} as const;

export default function Credits() {
  return (
    <StyledPage>
      <StyledInner>
        <StyledH1>Crédits</StyledH1>
        <StyledLead>
          Sources de contenu et services tiers — Application{" "}
          <strong>{APP_TRADEMARK}</strong>
        </StyledLead>
        <StyledContent>
          <h2>1. Texte arabe (Coran, graphie Othmanie)</h2>
          <p>
            Le texte arabe affiché dans l&apos;application provient du projet
            Tanzil (
            <a
              href="https://tanzil.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              tanzil.net
            </a>
            ), sous licence Creative Commons Attribution 3.0 (
            <a
              href="https://creativecommons.org/licenses/by/3.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY 3.0
            </a>
            ).
          </p>

          <h2>2. Traduction française métadonnées</h2>
          <p>
            Les traductions et données structurées associées sont issues de
            l&apos;API Al-Quran Cloud (
            <a
              href="https://alquran.cloud"
              target="_blank"
              rel="noopener noreferrer"
            >
              alquran.cloud
            </a>
            ), exploitée conformément aux règles du service.
          </p>

          <h2>3. Récitations audio</h2>
          <p>
            Les récitations sont lues en streaming depuis le CDN Islamic Network
            (
            <a
              href="https://cdn.islamic.network"
              target="_blank"
              rel="noopener noreferrer"
            >
              cdn.islamic.network
            </a>
            ) et l&apos;écosystème Al-Quran Cloud. Récitateurs utilisés dans
            l&apos;app : Mishary Rashid Alafasy et Abdurrahmaan As-Sudais. Les
            droits sur les enregistrements appartiennent à leurs détenteurs
            respectifs. Conditions du service :{" "}
            <a
              href="https://alquran.cloud/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
            >
              alquran.cloud/terms-and-conditions
            </a>
            .
          </p>

          <h2>4. Contact</h2>
          <p>
            Pour toute question relative à ces sources :{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
        </StyledContent>
      </StyledInner>
    </StyledPage>
  );
}

const StyledPage = styled.article`
  background-color: ${C.beigeMid};
  min-height: 60vh;
  padding: 140px 24px 80px;
`;

const StyledInner = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const StyledH1 = styled.h1`
  font-family: "Epilogue", sans-serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: ${C.text};
  margin-bottom: 12px;
`;

const StyledLead = styled.p`
  font-family: "Epilogue", sans-serif;
  font-size: 15px;
  color: ${C.text};
  opacity: 0.85;
  margin-bottom: 28px;
  line-height: 1.5;
`;

const StyledContent = styled.div`
  font-family: "Epilogue", sans-serif;
  font-size: 16px;
  line-height: 1.75;
  color: ${C.text};

  h2 {
    font-size: 20px;
    font-weight: 700;
    margin: 32px 0 12px;
  }

  h3 {
    font-size: 17px;
    font-weight: 700;
    margin: 22px 0 8px;
  }

  p {
    margin-bottom: 16px;
    opacity: 0.9;
  }

  a {
    color: ${C.accent};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

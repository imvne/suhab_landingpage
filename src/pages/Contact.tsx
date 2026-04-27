import styled from "styled-components";
import { SUPPORT_EMAIL } from "../config/contact";

const C = {
  text: "#3B230A",
  beigeMid: "#E8E0D5",
  accent: "#F05E20",
} as const;

const lanternSrc = `${import.meta.env.BASE_URL}images/lantern_thumb.png`;

export default function Contact() {
  return (
    <StyledPage>
      <StyledInner>
        <StyledH1>Contact</StyledH1>
        <StyledBlock>
          <StyledLanternWrap>
            <img
              src={lanternSrc}
              alt="Lanterne Suhab"
              width={160}
              height={160}
              loading="lazy"
            />
          </StyledLanternWrap>
          <StyledContent>
            <p>
              Si tu as besoin d&apos;aide ou d&apos;informations, envoie-nous un
              message à{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              &nbsp;: nous te répondrons dès que possible.
            </p>
          </StyledContent>
        </StyledBlock>
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
  margin-bottom: 28px;
`;

const StyledBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 32px;
  }
`;

const StyledLanternWrap = styled.div`
  flex-shrink: 0;

  img {
    display: block;
    width: min(160px, 42vw);
    height: auto;
    object-fit: contain;
  }
`;

const StyledContent = styled.div`
  font-family: "Epilogue", sans-serif;
  font-size: 16px;
  line-height: 1.75;
  color: ${C.text};

  p {
    margin: 0;
    opacity: 0.92;
  }

  a {
    color: ${C.accent};
    text-decoration: underline;
    text-underline-offset: 2px;
    word-break: break-all;
  }
`;

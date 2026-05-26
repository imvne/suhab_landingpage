import styled from "styled-components";

const C = {
      text: "#3B230A",
      beigeMid: "#E8E0D5",
} as const;

const lanternSrc = `${import.meta.env.BASE_URL}images/lantern_thumb.png`;

export default function AndroidConfirm() {
      return (
            <StyledPage>
                  <StyledInner>
                        <StyledH1>C&apos;est noté&nbsp;!</StyledH1>
                        <StyledBlock>
                              <StyledLanternWrap>
                                    <img
                                          src={lanternSrc}
                                          alt="Lanterne Suhab"
                                          width={120}
                                          height={120}
                                          loading="lazy"
                                          style={{ marginLeft: "12px" }}
                                    />
                              </StyledLanternWrap>
                              <StyledContent>
                                    <p>
                                          Merci d&apos;avoir confirmé ton
                                          intérêt pour{" "}
                                          <strong>ṣuḥab sur Android</strong>.
                                    </p>
                              </StyledContent>
                        </StyledBlock>
                  </StyledInner>
            </StyledPage>
      );
}

const StyledPage = styled.article`
      background-color: ${C.beigeMid};
      box-sizing: border-box;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 72px 24px 24px;
`;

const StyledInner = styled.div`
      max-width: 720px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
`;

const StyledH1 = styled.h1`
      font-family: "Epilogue", sans-serif;
      font-size: clamp(28px, 4vw, 40px);
      font-weight: 800;
      color: ${C.text};
      margin: 0 0 28px;
`;

const StyledBlock = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      width: 100%;
`;

const StyledLanternWrap = styled.div`
      flex-shrink: 0;

      img {
            display: block;
            width: min(140px, 38vw);
            height: auto;
            object-fit: contain;
      }
`;

const StyledContent = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: "Epilogue", sans-serif;
      font-size: 16px;
      line-height: 1.75;
      color: ${C.text};

      p {
            margin: 0 0 24px;
            opacity: 0.92;
            max-width: 480px;
      }

      strong {
            font-weight: 700;
      }
`;

import styled from "styled-components";

const C = {
  text: "#3B230A",
  beigeMid: "#E8E0D5",
} as const;

export default function Contact() {
  return (
    <StyledPage>
      <StyledInner>
        <StyledH1>Contact</StyledH1>
        <StyledContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <h2>Nous contacter</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <h2>Horaires</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
            ab illo inventore veritatis et quasi architecto beatae vitae dicta
            sunt explicabo.
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
  margin-bottom: 32px;
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

  p {
    margin-bottom: 16px;
    opacity: 0.9;
  }
`;

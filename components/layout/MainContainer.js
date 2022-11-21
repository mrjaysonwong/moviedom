import styled from '@emotion/styled';

const MainContainer = styled.main`
  min-height: 100vh;
  background: var(--background-primary);
  color: #e7ecef;
  padding-bottom: 80px;

  h1,
  h2,
  h3,
  h4 {
    font-weight: 500;
  }

  h1 {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }

  h2 {
    font-size: clamp(1rem, 4vw, 1.5rem);
  }

  h3 {
    font-size: clamp(0.9rem, 3vw, 1.25rem);
  }

  h4 {
    font-size: clamp(0.8rem, 2vw, 0.8rem);
  }

  p {
    font-size: clamp(0.8rem, 1.25vw, 1rem);
  }

  p {
    white-space: pre-wrap;
  }
`;

export default MainContainer;

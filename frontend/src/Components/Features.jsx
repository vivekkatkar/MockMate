import React from "react";
import styled from "styled-components";

const Features = () => {
  return (
    <StyledFeatureSection>
      <h2 className="features_title">What Makes Us Different</h2>
      <div className="features_container">
        <FeatureCard
          emoji="🎯"
          title="Realistic Interview Scenarios"
          description="AI-powered coding challenges simulating real interviews to boost your experience."
        />
        <FeatureCard
          emoji="📈"
          title="Advanced Analytics"
          description="Track your performance and get insights on areas to improve and maximize preparation efficiency."
        />
        <FeatureCard
          emoji="🏆"
          title="Build Confidence"
          description="Practice with challenging questions, receive feedback, and gain confidence to tackle interviews."
        />
      </div>
    </StyledFeatureSection>
  );
};

const FeatureCard = ({ emoji, title, description }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__border" />
        <div className="card_emoji">{emoji}</div>
        <div className="card_title__container">
          <span className="card_title">{title}</span>
          <p className="card_paragraph">{description}</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledFeatureSection = styled.div`
  padding: 5rem 0;
  background-color: #121820;
  color: white;
  text-align: center;

  .features_title {
    font-size: 1.75rem;
    font-weight: bold;
    color: #00bfff;
    margin-bottom: 2rem;
  }

  .features_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: center;
    }
  }
`;

const StyledWrapper = styled.div`
  .card {
    --white: hsl(0, 0%, 100%);
    --black: hsl(240, 15%, 9%);
    --paragraph: hsl(0, 0%, 83%);
    --primary: hsl(189, 92%, 58%);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    padding: 1.5rem;
    width: 18rem;
    background-color: #1a1f26;
    border-radius: 1.5rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

    .card__border {
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      background: linear-gradient(45deg, hsl(189, 92%, 58%), transparent);
      border-radius: 1.5rem;
    }

    .card_emoji {
      font-size: 3rem;
      color: var(--primary);
    }

    .card_title__container {
      text-align: center;
    }

    .card_title {
      font-size: 1.125rem;
      color: var(--white);
    }

    .card_paragraph {
      font-size: 0.875rem;
      color: var(--paragraph);
    }
  }
`;

export default Features;

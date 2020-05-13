import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";

const Container = styled.div`
  &:not(:last-child) {
    margin-bottom: 50px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

const TVPresenter = ({ topRated, popular, airingToday, error, loading }) => {
  console.log(popular);
  return loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated TV shows">
          {topRated.map((tvShow) => (
            <div>{tvShow.name}</div>
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular TV shows">
          {popular.map((tvShow) => (
            <div>{tvShow.name}</div>
          ))}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title="Airing TV show today">
          {airingToday.map((tvShow) => (
            <div>{tvShow.name}</div>
          ))}
        </Section>
      )}
    </Container>
  );
};

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TVPresenter;

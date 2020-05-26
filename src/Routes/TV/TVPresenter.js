import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

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
              <Poster imageUrl={tvShow.poster_path}
                id={tvShow.id}
                key={tvShow.id}
                title={tvShow.name}
                rating={tvShow.vote_average}
                year={tvShow.first_air_date && tvShow.first_air_date.substring(0, 4)}
                isMovie={false} />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Popular TV shows">
            {popular.map((tvShow) => (
              <Poster imageUrl={tvShow.poster_path}
                id={tvShow.id}
                key={tvShow.id}
                title={tvShow.name}
                rating={tvShow.vote_average}
                year={tvShow.first_air_date && tvShow.first_air_date.substring(0, 4)}
                isMovie={false} />
            ))}
          </Section>
        )}
        {airingToday && airingToday.length > 0 && (
          <Section title="Airing TV show today">
            {airingToday.map((tvShow) => (
              <Poster imageUrl={tvShow.poster_path}
                id={tvShow.id}
                key={tvShow.id}
                title={tvShow.name}
                rating={tvShow.vote_average}
                year={tvShow.first_air_date && tvShow.first_air_date.substring(0, 4)}
                isMovie={false} />
            ))}
          </Section>
        )}
        {error && <Message text={error} />}
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

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Message from "Components/Message";
import Loader from "Components/Loader";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 0px 10px;
`;
const HomePresenter = ({ nowPlaying, upcoming, popular, error, loading }) => {
  return loading ? (
    <Loader />
  ) : (
      <Container>
        {nowPlaying && nowPlaying.length > 0 && (
          <Section title="Now Playing">
            {nowPlaying.map((movie) => (
              <Poster imageUrl={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                id={movie.id}
                key={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date && movie.release_date.substring(0, 4)}
                isMovie={true} />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Popular">
            {popular.map((movie) => (
              <Poster imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                id={movie.id}
                key={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date && movie.release_date.substring(0, 4)}
                isMovie={true} />
            ))}
          </Section>
        )}
        {upcoming && upcoming.length > 0 && (
          <Section title="Upcoming">
            {upcoming.map((movie) => (
              <Poster imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                id={movie.id}
                key={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date && movie.release_date.substring(0, 4)}
                isMovie={true} />
            ))}
          </Section>
        )}
        {error && <Message text={error} />}
      </Container>
    );
};

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  upcoming: PropTypes.array,
  popular: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default HomePresenter;

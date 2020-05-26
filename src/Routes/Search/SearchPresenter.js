import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 0px 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 24px;
  width: 100%;
`;

const SearchPresenter = ({
  movieResult,
  tvResult,
  error,
  loading,
  searchTerm,
  onSubmit,
  onChange,
}) => {
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Search TV or movies by text."
          value={searchTerm}
          onChange={onChange}
        />
      </Form>
      {loading ? (
        <Loader />
      ) : (
          <>
            {movieResult && movieResult.length > 0 && (
              <Section title="Movie Results...">
                {movieResult.map((movie) => (
                  <Poster imageUrl={movie.poster_path}
                    id={movie.id}
                    key={movie.id}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date && movie.release_date.substring(0, 4)}
                    isMovie={true} />
                ))}
              </Section>
            )}
            {tvResult && tvResult.length > 0 && (
              <Section title="TV Show Results...">
                {tvResult.map((show) => (
                  <Poster imageUrl={show.poster_path}
                    id={show.id}
                    key={show.id}
                    title={show.name}
                    rating={show.vote_average}
                    year={show.first_air_date && show.first_air_date.substring(0, 4)}
                    isMovie={false} />
                ))}
              </Section>
            )}
            {tvResult &&
              movieResult &&
              tvResult.length === 0 &&
              movieResult.length === 0 && (
                <Message
                  text={`No results found for: ${searchTerm}`}
                  color="red"
                />
              )}
            {error && <Message text={error} />}
          </>
        )}
    </Container>
  );
};

SearchPresenter.propTypes = {
  movieResult: PropTypes.array,
  tvResult: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  saerchTerm: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchPresenter;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";

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
                <div key={movie.id}>{movie.title}</div>
              ))}
            </Section>
          )}
          {tvResult && tvResult.length > 0 && (
            <Section title="TV Show Results...">
              {tvResult.map((show) => (
                <div key={show.id}>{show.name}</div>
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

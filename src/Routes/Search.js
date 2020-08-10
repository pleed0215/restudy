import React, { useState } from "react";
import { tvApi, movieApi } from "api";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { Helmet } from "react-helmet";

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

const Search = () => {
  const [state, setState] = useState({
    movieResult: null,
    tvResult: null,
    error: null,
    loading: false,
    searchTerm: "",
  });

  const onSubmit = (event) => {
    const { searchTerm } = state;

    event.preventDefault();

    console.log(searchTerm);
    if (searchTerm !== "") {
      searchByTerm();
    }
  };

  const onChange = (event) => {
    setState({ searchTerm: event.target.value });
  };

  const searchByTerm = async () => {
    const { searchTerm: query } = state;
    try {
      setState({ loading: true });

      const {
        data: { results: movieResult },
      } = await movieApi.search(query);
      const {
        data: { results: tvResult },
      } = await tvApi.search(query);

      setState((prevState) => ({
        ...prevState,
        movieResult,
        tvResult,
      }));
      console.log("fetching: ", state);
    } catch {
      setState({ error: "Can't get results", loading: false });
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Search ... | Fuckflex</title>
      </Helmet>
      <Container>
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Search TV or movies by text."
            value={state.searchTerm}
            onChange={onChange}
          />
        </Form>
        {state.loading ? (
          <Loader />
        ) : (
          <>
            {state.movieResult && state.movieResult.length > 0 && (
              <Section title="Movie Results...">
                {state.movieResult.map((movie) => (
                  <Poster
                    imageUrl={movie.poster_path}
                    id={movie.id}
                    key={movie.id}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={
                      movie.release_date && movie.release_date.substring(0, 4)
                    }
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
            {state.tvResult && state.tvResult.length > 0 && (
              <Section title="TV Show Results...">
                {state.tvResult.map((show) => (
                  <Poster
                    imageUrl={show.poster_path}
                    id={show.id}
                    key={show.id}
                    title={show.name}
                    rating={show.vote_average}
                    year={
                      show.first_air_date && show.first_air_date.substring(0, 4)
                    }
                    isMovie={false}
                  />
                ))}
              </Section>
            )}
            {state.tvResult &&
              state.movieResult &&
              state.tvResult.length === 0 &&
              state.movieResult.length === 0 && (
                <Message
                  text={`No results found for: ${state.searchTerm}`}
                  color="red"
                />
              )}
            {state.error && <Message text={state.error} />}
          </>
        )}
      </Container>
    </>
  );
};

export default Search;

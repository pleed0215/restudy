import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Section from "Components/Section";
import Message from "Components/Message";
import Loader from "Components/Loader";
import Poster from "Components/Poster";
import { Helmet } from "react-helmet";
import { movieApi } from "api";

const Container = styled.div`
  padding: 0px 10px;
`;

const Home = (props) => {
  const [state, setState] = useState({
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fetchDatas = async () => {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await movieApi.upcoming();
      const {
        data: { results: popular },
      } = await movieApi.popular();

      setState((prevState) => ({
        ...prevState,
        nowPlaying,
        upcoming,
        popular,
      }));
    };

    try {
      fetchDatas();
    } catch {
      setState({
        error: "Can't get detail information of movie(or tv show).",
      });
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Movies | Fuckflex</title>
      </Helmet>
      {state.loading ? (
        <Loader />
      ) : (
        <Container>
          {state.nowPlaying && state.nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {state.nowPlaying.map((movie) => (
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
          {state.popular && state.popular.length > 0 && (
            <Section title="Popular">
              {state.popular.map((movie) => (
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
          {state.upcoming && state.upcoming.length > 0 && (
            <Section title="Upcoming">
              {state.upcoming.map((movie) => (
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
          {state.error && <Message text={state.error} />}
        </Container>
      )}
    </>
  );
};

export default Home;

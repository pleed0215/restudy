import React, { useState, useEffect } from "react";
import { tvApi } from "api";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { Helmet } from "react-helmet";

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

const TV = (props) => {
  const [state, setState] = useState({
    topRated: null,
    popular: null,
    airingToday: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fetchDatas = async () => {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();

      setState((prevState) => ({
        ...prevState,
        topRated,
        airingToday,
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
        <title>TV shows | Normflex</title>
      </Helmet>
      {state.loading ? (
        <Loader />
      ) : (
        <Container>
          {state.topRated && state.topRated.length > 0 && (
            <Section title="Top Rated TV shows">
              {state.topRated.map((tvShow) => (
                <Poster
                  imageUrl={tvShow.poster_path}
                  id={tvShow.id}
                  key={tvShow.id}
                  title={tvShow.name}
                  rating={tvShow.vote_average}
                  year={
                    tvShow.first_air_date &&
                    tvShow.first_air_date.substring(0, 4)
                  }
                  isMovie={false}
                />
              ))}
            </Section>
          )}
          {state.popular && state.popular.length > 0 && (
            <Section title="Popular TV shows">
              {state.popular.map((tvShow) => (
                <Poster
                  imageUrl={tvShow.poster_path}
                  id={tvShow.id}
                  key={tvShow.id}
                  title={tvShow.name}
                  rating={tvShow.vote_average}
                  year={
                    tvShow.first_air_date &&
                    tvShow.first_air_date.substring(0, 4)
                  }
                  isMovie={false}
                />
              ))}
            </Section>
          )}
          {state.airingToday && state.airingToday.length > 0 && (
            <Section title="Airing TV show today">
              {state.airingToday.map((tvShow) => (
                <Poster
                  imageUrl={tvShow.poster_path}
                  id={tvShow.id}
                  key={tvShow.id}
                  title={tvShow.name}
                  rating={tvShow.vote_average}
                  year={
                    tvShow.first_air_date &&
                    tvShow.first_air_date.substring(0, 4)
                  }
                  isMovie={false}
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

export default TV;

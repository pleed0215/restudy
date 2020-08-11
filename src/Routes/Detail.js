import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "Components/Loader";
import { Helmet } from "react-helmet";
import { Tab, Tabs, TabContent } from "Tabs";
import { SeasonPoster } from "Components/Poster";
import { tvApi, movieApi } from "api";

import getCountryName from "country";

const Container = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
  position: relative;
`;

const Backdrop = styled.div`
  position: absolute;
  left: 0;
  top: -30px;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center center;
  filter: blur(3px);
  opacity: 0.5;
  z-index: -1;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  opacity: 1;
  padding: 20px;
`;
const Cover = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center center;
  width: 30%;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const TagLine = styled.h3`
  font-size: 18px;
  font-weight: 600;
  font-style: italic;
  margin-bottom: 10px;
`;
const UnderTitle = styled.ul`
  margin-bottom: 20px;
`;
const UnderTitleItem = styled.li`
  float: left;
  position: relative;
  left: 10px;
  &:not(:first-child) {
    margin-left: 20px;
    list-style-type: disc;
  }
  &:not(:first-child) span {
    margin-left: 20px;
  }
  &:not(:last-child) {
    margin-right: 30px;
  }
`;
const Overview = styled.p`
  margin-bottom: 20px;
`;

const TabItemContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 20vh;
  grid-gap: 15px;
`;

const YouTubeStyle = styled.iframe`
  width: 100%;
  height: 100%;
`;

const CompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const CompanyLogo = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: white;
  width: 80%;
  height: 80%;
  border: 1px solid white;
  border-radius: 50%;
  z-index: 10;
  margin-bottom: 5px;
`;

const CountryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const CountryLogo = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: white;
  width: 80%;
  height: 80%;
  border: 1px solid white;
  border-radius: 20px;
  z-index: 10;
  margin-bottom: 5px;
`;

const IMDB = styled.a`
  width: 50px;
  height: 20px;
  font-weight: 600;
  color: black;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  &:hover {
    transition: background-color 0.3s ease-in-out;
    background-color: #95a5a6;
  }
`;

const Detail = (props) => {
  const {
    match: { path },
  } = props;

  const [state, setState] = useState({
    result: null,
    error: null,
    loading: true,
    isMovie: path.includes("/movie/"),
  });

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = props;
    const { isMovie } = state;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return push("/");
    }

    const fetchDatas = async (apicall, id) => {
      const { data } = await apicall(id);
      setState((prevState) => ({ ...prevState, result: data }));
    };

    try {
      fetchDatas(isMovie ? movieApi.detail : tvApi.detail, parsedId);
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
      {state.result && (
        <Helmet>
          <title>
            {state.isMovie ? state.result.title : state.result.name} | Normflex
          </title>
        </Helmet>
      )}
      {state.loading ? (
        <>
          <Helmet>
            <title>Loading... | Normflex</title>
          </Helmet>
          <Loader />
        </>
      ) : (
        state.result && (
          <Container>
            <Backdrop
              bgUrl={`https://image.tmdb.org/t/p/original/${state.result.backdrop_path}`}
            />
            <Content>
              <Cover
                bgUrl={
                  state.result.poster_path
                    ? `https://image.tmdb.org/t/p/original/${state.result.poster_path}`
                    : require("../assets/noposter.jpg")
                }
              />
              <Data>
                <Title>
                  {state.isMovie ? state.result.title : state.result.name}
                </Title>
                {state.isMovie && <TagLine>{state.result.tagline}</TagLine>}
                <UnderTitle>
                  <UnderTitleItem>
                    <span>
                      {state.isMovie
                        ? state.result.release_date.substring(0, 4)
                        : state.result.first_air_date.substring(0, 4)}
                    </span>
                  </UnderTitleItem>
                  <UnderTitleItem>
                    <span>
                      {state.isMovie
                        ? state.result.runtime
                        : state.result.episode_run_time}
                      min
                    </span>
                  </UnderTitleItem>
                  <UnderTitleItem>
                    <span>
                      {state.result.genres.map((genre, idx) =>
                        state.result.genres.length - 1 !== idx
                          ? `${genre.name}/`
                          : genre.name
                      )}
                    </span>
                  </UnderTitleItem>
                  <UnderTitleItem>
                    <span role="img" aria-label="rating">
                      ⭐️
                    </span>{" "}
                    {state.result.vote_average}/10
                  </UnderTitleItem>
                  <UnderTitleItem>
                    <IMDB
                      href={`https://www.imdb.com/title/${state.result.imdb_id}`}
                      target="_blank"
                      rel="noopener"
                    >
                      iMDB
                    </IMDB>
                  </UnderTitleItem>
                </UnderTitle>
                <Overview>{state.result.overview}</Overview>
                <Tabs>
                  <Tab>관련 영상</Tab>
                  <Tab>제작사</Tab>
                  <Tab>국가</Tab>
                  {!state.isMovie && <Tab>시즌</Tab>}

                  <TabContent>
                    <TabItemContainer>
                      {state.result.videos.results &&
                        state.result.videos.results.map((video, index) => (
                          <YouTubeStyle
                            key={`youtube-${index}`}
                            src={`https://www.youtube.com/embed/${video.key}`}
                          />
                        ))}
                    </TabItemContainer>
                  </TabContent>
                  <TabContent>
                    <TabItemContainer>
                      {state.result.production_companies &&
                        state.result.production_companies.map(
                          (company, index) => (
                            <CompanyContainer
                              key={`company-container-${index}`}
                            >
                              <CompanyLogo
                                bgUrl={
                                  company.logo_path
                                    ? `https://image.tmdb.org/t/p/original/${company.logo_path}`
                                    : require("../assets/noposter.jpg")
                                }
                              />
                              <div>
                                <span>{company.name}</span>
                              </div>
                            </CompanyContainer>
                          )
                        )}
                    </TabItemContainer>
                  </TabContent>
                  <TabContent>
                    <TabItemContainer>
                      {state.isMovie
                        ? state.result.production_countries &&
                          state.result.production_countries.map(
                            (country, index) => (
                              <CountryContainer key={`country-${index}`}>
                                <CountryLogo
                                  bgUrl={`https://www.countryflags.io/${country.iso_3166_1}/shiny/64.png`}
                                />
                                <p>{country.name}</p>
                              </CountryContainer>
                            )
                          )
                        : state.result.origin_country &&
                          state.result.origin_country.map((country, index) => (
                            <CountryContainer key={`country-${index}`}>
                              <CountryLogo
                                bgUrl={`https://www.countryflags.io/${country}/shiny/64.png`}
                              />
                              <p>{getCountryName(country)}</p>
                            </CountryContainer>
                          ))}
                    </TabItemContainer>
                  </TabContent>
                  {!state.isMovie && (
                    <TabContent>
                      <TabItemContainer>
                        {state.result.seasons &&
                          state.result.seasons
                            .sort((a, b) => {
                              const aSeason = a.air_date
                                ? parseInt(a.air_date.substring(0, 4))
                                : 0;
                              const bSeason = a.air_date
                                ? parseInt(a.air_date.substring(0, 4))
                                : 0;
                              return aSeason - bSeason;
                            })
                            .map((season, index) => (
                              <SeasonPoster
                                key={`season-${index}`}
                                title={season.name}
                                year={
                                  season.air_date
                                    ? season.air_date.substring(0, 4)
                                    : "no air-date info."
                                }
                                rating={false}
                                imageUrl={season.poster_path}
                              />
                            ))}
                      </TabItemContainer>
                    </TabContent>
                  )}
                </Tabs>
              </Data>
            </Content>
          </Container>
        )
      )}
    </>
  );
};

export default Detail;

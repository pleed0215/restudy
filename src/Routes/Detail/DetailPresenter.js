import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import { Helmet } from "react-helmet";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


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
  width: 80%;
  height: 80%;
  border: 1px solid white;
  border-radius: 50%;
  z-index: 10;
  margin-bottom: 5px;
`;

const DetailPresenter = ({ result, error, loading, isMovie }) => (
  <>
    {result && (
      <Helmet>
        <title>{isMovie ? result.title : result.name} | Fuckflex</title>
      </Helmet>
    )}
    {loading ? (
      <>
        <Helmet>
          <title>Loading... | Fuckflex</title>
        </Helmet>
        <Loader />
      </>
    ) : (
        result && (
          <Container>
            <Backdrop
              bgUrl={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
            />
            <Content>
              <Cover
                bgUrl={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/original/${result.poster_path}`
                    : require("../../assets/noposter.jpg")
                }
              />
              <Data>
                <Title>{isMovie ? result.title : result.name}</Title>
                {isMovie &&
                  <TagLine>{result.tagline}</TagLine>}
                <UnderTitle>
                  <UnderTitleItem>
                    <span>
                      {isMovie
                        ? result.release_date.substring(0, 4)
                        : result.first_air_date.substring(0, 4)}
                    </span>
                  </UnderTitleItem>
                  <UnderTitleItem>
                    <span>
                      {isMovie ? result.runtime : result.episode_run_time}min
                  </span>
                  </UnderTitleItem>
                  <UnderTitleItem>
                    <span>
                      {result.genres.map((genre, idx) =>
                        result.genres.length - 1 !== idx
                          ? `${genre.name}/`
                          : genre.name
                      )}
                    </span>
                  </UnderTitleItem>
                  <UnderTitleItem>
                    <span role="img" aria-label="rating">
                      ⭐️
                  </span>{" "}
                    {result.vote_average}/10
                </UnderTitleItem>
                </UnderTitle>
                <Overview>{result.overview}</Overview>
                <Tabs>
                  <TabList>
                    <Tab>관련 영상</Tab>
                    <Tab>제작사</Tab>
                    <Tab>국가</Tab>
                  </TabList>

                  <TabPanel>
                    <TabItemContainer>
                      {
                        result.videos.results &&
                        result.videos.results.map((video) =>
                          <YouTubeStyle src={`https://www.youtube.com/embed/${video.key}`} />
                        )
                      }
                    </TabItemContainer>
                  </TabPanel>
                  <TabPanel>
                    <TabItemContainer>
                      {
                        result.production_companies &&
                        result.production_companies.map((company) =>
                          <CompanyContainer>
                            <CompanyLogo bgUrl={
                              company.logo_path ?
                                `https://image.tmdb.org/t/p/original/${company.logo_path}` :
                                require("../../assets/noposter.jpg")
                            } />
                            <div>
                              <span>{company.name}</span>
                            </div>
                          </CompanyContainer>
                        )
                      }
                    </TabItemContainer>
                  </TabPanel>
                </Tabs>
              </Data>

            </Content>
          </Container>
        )
      )}
  </>
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  isMovie: PropTypes.bool.isRequired,
};

export default DetailPresenter;

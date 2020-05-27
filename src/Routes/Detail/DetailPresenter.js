import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";

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
const Overview = styled.p``;

const DetailPresenter = ({ result, error, loading, isMovie }) =>
  loading ? (
    <Loader />
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
                <span>{result.vote_average}</span>
              </UnderTitleItem>
            </UnderTitle>
            <Overview>{result.overview}</Overview>
          </Data>
        </Content>
      </Container>
    )
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  isMovie: PropTypes.bool.isRequired,
};

export default DetailPresenter;

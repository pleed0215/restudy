import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  border-radius: 4px;
  width: 100%;
  &:hover {
    border: 1px solid #74b9ff;
    margin: -1px;
  }
`;

const SeasonContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  border-radius: 4px;
  width: 100%;
`;

const Image = styled.div`
  width: 100px;
  height: 150px;
  background-image: url(${(prop) => prop.bgUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  transition: opacity 0.1s linear;
`;

const Rating = styled.div`
  visibility: hidden;
  width: 100%;
  position: relative;
  top: -12px;
  background-color: rgba(0, 0, 0, 0.7);
`;
const Title = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 15px;
`;
const Year = styled.span`
  font-size: 10px;
  color: gray;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      visibility: visible;
    }
  }
`;

const SeasonImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w200/${imageUrl}`
              : require("../assets/noposter.jpg")
          }
        />
        {rating && (
          <Rating>
            <span role="img" aria-label="rating">
              ⭐️
            </span>{" "}
            {rating}/10
          </Rating>
        )}
      </ImageContainer>
      <Title>{title}</Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

export const SeasonPoster = ({ imageUrl, title, year }) => (
  <SeasonContainer>
    <SeasonImageContainer>
      <Image
        bgUrl={
          imageUrl
            ? `https://image.tmdb.org/t/p/w200/${imageUrl}`
            : require("../assets/noposter.jpg")
        }
      />
    </SeasonImageContainer>
    <Title style={{ textAlign: "center" }}>{title}</Title>
    <Year style={{ textAlign: "center", color: "white" }}>{year}</Year>
  </SeasonContainer>
);

Poster.propTyles = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default Poster;

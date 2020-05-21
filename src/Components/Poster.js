import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

const Image = styled.div`
  width: 100px;
  height: 150px;
  background-image: url(${(prop) => prop.bgUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  transition: opacity 0.1s linear;
  z-index: -10;
`;

const Rating = styled.div`
  visibility: hidden;
  width: 100px;
  position: relative;
  top: -13px;
  background-color: rgba(0,0,0,0.7);
`;
const Title = styled.span`
  text-overflow: ellipsis;
`;
const Year = styled.span`
  font-size: 10px;
  color: gray;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      visibility: visible;
    }
  }
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image bgUrl={imageUrl} />
        <Rating>
          <span role="img" aria-label="rating">
            ⭐️
          </span>{" "}
          {rating}/10
        </Rating>
      </ImageContainer>
      <Title>{title}</Title>
      <Year>{year}</Year>
    </Container>
  </Link>
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

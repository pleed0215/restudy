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
  left:0;
  top:-30px;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgUrl});
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
  background-image: url(${props => props.bgUrl});
  background-size: cover;
  background-position: center center;
  width: 30%;
  height: 100%;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? <Loader /> :
    <Container>
      <Backdrop bgUrl={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`} />
      <Content>
        <Cover bgUrl={result.poster_path ? `https://image.tmdb.org/t/p/original/${result.poster_path}` : require("../../assets/noposter.jpg")} />
      </Content>
    </Container>

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;

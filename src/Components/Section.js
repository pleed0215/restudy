import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const Title = styled.span`
  align-self: flex-start;
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
`;

const Grid = styled.div`
  padding: 10px 10px;
  display: grid;
  justify-self: center;
  justify-content: center;
  align-items: center;
  width: 90%;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-auto-columns: auto;
  grid-gap: 25px;
`;

const Section = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Grid>{children}</Grid>
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Section;

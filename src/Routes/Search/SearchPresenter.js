import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SearchPresenter = ({
  movieResult,
  tvResult,
  error,
  loading,
  saerchTerm,
  onSubmit,
}) => {
  return "SearchPresenter";
};

SearchPresenter.propTypes = {
  movieResult: PropTypes.array,
  tvResult: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  saerchTerm: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchPresenter;

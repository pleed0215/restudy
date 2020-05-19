import React from "react";
import SearchPresenter from "./SearchPresenter";
import { tvApi, movieApi } from "api";

export default class extends React.Component {
  state = {
    movieResult: null,
    tvResult: null,
    error: null,
    loading: false,
    searchTerm: "",
  };

  onSubmit = (event) => {
    const { searchTerm } = this.state;

    event.preventDefault();

    console.log(searchTerm);
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  onChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  searchByTerm = async () => {
    const { searchTerm: query } = this.state;

    try {
      this.setState({ loading: true });
      const {
        data: { results: movieResult },
      } = await movieApi.search(query);
      const {
        data: { results: tvResult },
      } = await tvApi.search(query);
      this.setState({
        movieResult,
        tvResult,
      });
    } catch {
      this.setState({ error: "Can't get results", loading: false });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { movieResult, tvResult, error, loading, searchTerm } = this.state;

    console.log(this.state);
    return (
      <SearchPresenter
        movieResult={movieResult}
        tvResult={tvResult}
        error={error}
        loading={loading}
        searchTerm={searchTerm}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
      />
    );
  }
}

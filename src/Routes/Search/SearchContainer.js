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
    }

    onSubmit = () => {
        const { searchTerm } = this.state;

        if (searchTerm !== "") {
            this.searchByTerm();
        }
    }


    searchByTerm = async () => {
        const { searchTerm: query } = this.state;

        try {
            const { data: { results: movieResult } } = await movieApi.search(query);
            const { data: { results: tvResult } } = await tvApi.search(query);
            this.setState({ loading: true });
            this.setState({
                movieResult,
                tvResult
            })
        } catch {
            this.setState({ error: "Can't get results" });
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        const {
            movieResult,
            tvResult,
            error,
            loading,
            searchTerm,
            onSubmit
        } = this.state;

        console.log(this.state);
        return <SearchPresenter
            movieResult={movieResult}
            tvResult={tvResult}
            error={error}
            loading={loading}
            sarchTerm={searchTerm}
            onSubmit={onSubmit} />
    }
}
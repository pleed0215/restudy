import React from "react";
import DetailPresenter from "./DetailPresenter";
import { tvApi, movieApi } from "api";

export default class extends React.Component {
    state = {
        result: null,
        error: null,
        loading: true,
    }

    async componentDidMount() {
        const {
            match:
            {
                params:
                { id },
                path
            },
            history:
            {
                push
            }
        } = this.props;
        const parsedId = parseInt(id);
        let result = {};

        if (isNaN(parsedId)) {
            return push('/');
        }

        if (path.includes("movie")) {
            result = await movieApi.detail(parsedId);
        } else {
            result = await tvApi.detail(parsedId);
        }

        this.setState({ result: result.data });
    }

    render() {
        const {
            result, error, loading
        } = this.state;
        console.log(this.state);
        console.log(this.props);
        return <DetailPresenter
            result={result}
            error={error}
            loading={loading} />
    }
}

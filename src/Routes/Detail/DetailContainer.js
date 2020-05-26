import React from "react";
import DetailPresenter from "./DetailPresenter";
import { tvApi, movieApi } from "api";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const { match: { path } } = this.props;

        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: path.includes("/movie/"),
        }
    }


    async componentDidMount() {
        console.log('props', this.props);
        const {
            match:
            {
                params:
                { id },
            },
            history:
            {
                push
            }
        } = this.props;
        const { isMovie } = this.state;
        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return push('/');
        }

        let result = null;

        try {
            if (isMovie) {
                result = await movieApi.detail(parsedId);
            } else {
                result = await tvApi.detail(parsedId);
            }
        } catch {
            this.setState({ error: "Can't get detail information of movie(or tv show)." });
        } finally {
            this.setState({
                result: result.data,
                loading: false
            })
        }
    }

    render() {
        const {
            result, error, loading
        } = this.state;
        console.log(this.state);
        return <DetailPresenter
            result={result}
            error={error}
            loading={loading} />
    }
}

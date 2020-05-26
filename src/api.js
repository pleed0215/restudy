import axios from "axios";

const movieApiConfig = {
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "fbf6b8cf40575086aa6bf86c6c64f56e",
        language: "ko-KR",
    }
};

export const movieApi = {
    nowPlaying: () => (axios.get("movie/now_playing", movieApiConfig)),
    upcoming: () => (axios.get("movie/upcoming", movieApiConfig)),
    topRated: () => (axios.get("movie/top_rated", movieApiConfig)),
    popular: () => (axios.get("movie/popular", movieApiConfig)),
    detail: (id) => (axios.get(`movie/${id}`, {
        ...movieApiConfig, params: {
            api_key: "fbf6b8cf40575086aa6bf86c6c64f56e",
            language: "ko-KR", append_to_response: "videos"
        }
    })),
    search: (query) => (axios.get("search/movie",
        {
            ...movieApiConfig,
            params: {
                api_key: "fbf6b8cf40575086aa6bf86c6c64f56e",
                language: "ko-KR",
                query: encodeURIComponent(query),
                include_adult: true,
                page: 10
            }
        })),

}

export const tvApi = {
    topRated: () => (axios.get("tv/top_rated", movieApiConfig)),
    popular: () => (axios.get("tv/popular", movieApiConfig)),
    airingToday: () => (axios.get("tv/airing_today", movieApiConfig)),
    detail: (id) => (axios.get(`tv/${id}`, {
        ...movieApiConfig, params: {
            api_key: "fbf6b8cf40575086aa6bf86c6c64f56e",
            language: "ko-KR", append_to_response: "videos"
        }
    })),
    search: (query) => (axios.get("search/tv",
        {
            ...movieApiConfig,
            params: {
                api_key: "fbf6b8cf40575086aa6bf86c6c64f56e",
                language: "ko-KR",
                query: encodeURIComponent(query),
                include_adult: true,
                page: 10
            }
        }))
}


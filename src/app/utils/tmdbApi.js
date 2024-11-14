const API_KEY = "94ee01dae334f6b429909ec69ac36e0a";
const BASE_URL = 'https://api.themoviedb.org/3';

// Función genérica para obtener datos de la API
const fetchFromApi = async (endpoint) => {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error en la petición');
    }
    return response.json();
};

//define categorias en objeto
export const category = {
    movie: "movie",
    tv: "tv"
}

// tipo de series en objeto
export const Type = {
    popular: "popular",
    topRated: "top_rated",
    onTheAir: "on_the_air",
    airingToday: "airing_today",
    nowPlaying: "now_playing",
    upcoming: "upcoming"
}

export const extras = {
    credits: "credits",
    videos: "videos",
    recommendations: "recommendations",
    similar: "similar",
    alternativeTitles: "alternative_titles",
    changes: "changes",
    reviews: "reviews",
    translations: "translations",
    episodeGroups: "episode_groups",

}

// originalImage: (ImgPath) => `https://image.tmdb.org/t/p/original${ImgPath}`, // URL de la imagen original
// w500Image: (ImgPath) => `https://image.tmdb.org/t/p/w500${ImgPath}` // URL de la imagen de 500px


// Tipo por categoria
export const getTypeCategory = async (cate, type) => {
    return fetchFromApi(`{/${category[cate]}/${Type[type]}`);
};    

// Trending
export const getTrending = async (cate) => {
    return fetchFromApi(`/trending/${category[cate]}/day`);
};

// Géneros
export const getGenres = async (cate) => {
    return fetchFromApi(`/genre/${category[cate]}/list`);
};    

// Detalles por categoria y id
export const getDetails = async (cate, movieId) => {
    return fetchFromApi(`/${category[cate]}/${movieId}`);
};    

// Buscar por texto
export const search = async (cate, query) => {
    return fetchFromApi(`/search/${category[cate]}&query=${encodeURIComponent(query)}`);
};    

// Similar, Recomendaciones, Videos, Créditos
export const getExtraInfo = async (cate, id, extra) => {
    return fetchFromApi(`/${category[cate]}/${id}/${extra}`);
};

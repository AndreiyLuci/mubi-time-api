const axios = require('axios');

const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTQ4MDMyZGQyMGI2MDZhNTg0MTExODkyOTkzMWM4YiIsInN1YiI6IjYxNTU3ZTU0ZDFjYTJhMDA2NzNmNGI0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fWbU-UuA424hSWRzXXHgSJhfLigl54JoKO1tPBNuU5o"

const http = axios.create({
  baseURL: "https://api.themoviedb.org/3" 
});

http.interceptors.response.use((response) => response.data);

http.interceptors.request.use((request) => {
 
  request.headers.common.Authorization = `Bearer  ${API_TOKEN}`;
  
  return request;
})


// /issue
module.exports.getMovie = (id) => {
  return http.get(`/movie/${id}`)
}

module.exports.getTVShow = (id) => {
  return http.get(`/tv/${id}`)
}
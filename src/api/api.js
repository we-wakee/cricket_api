const API_KEY = "f7a47109-fc99-4ae3-aab4-31dc3770cb9e";

export const getMatches = () => {
  const url = `https://api.cricapi.com/v1/matches?apikey=${API_KEY}&offset=0`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("ERROR ", error);
    });
};

//get the score of the cuurent match

export const getMatchDetail = (id) => {
  const url = `https://api.cricapi.com/v1/match_info?apikey=${API_KEY}&offset=0&id=${id}`;

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

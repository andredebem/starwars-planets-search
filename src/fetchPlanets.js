const fetchPlanets = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const planets = await fetch(url)
    .then((response) => response.json())
    .then(({ results }) => results);
  return planets;
};

export default fetchPlanets;

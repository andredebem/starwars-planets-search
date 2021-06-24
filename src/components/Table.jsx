import React, { useContext } from 'react';
import AppContext from '../contextAPI/AppContext';

function Table() {
  const { data, filters: { filterByName: { name } },
    setName, filtered, setFiltered } = useContext(AppContext);

  const renderTableHeader = () => (
    <thead>
      <tr>
        <th>Name</th>
        <th>Population</th>
        <th>Diameter</th>
        <th>Gravity</th>
        <th>Climate</th>
        <th>Terrain</th>
        <th>Surface Water</th>
        <th>Rotation Period</th>
        <th>Orbital Period</th>
        <th>Films</th>
        <th>Created</th>
        <th>Edited</th>
        <th>URL</th>
      </tr>
    </thead>
  );

  const renderPlanets = (arrayPlanets) => {
    const mapPlanets = arrayPlanets.map((planet, index) => {
      const { name: namePlanet, population, diameter, gravity, climate,
        terrain, surface_water: surfaceWater, rotation_period: rotationPeriod,
        orbital_period: orbitalPeriod, films, created, edited, url } = planet;
      return (
        <tr key={ index }>
          <td>{namePlanet}</td>
          <td>{population}</td>
          <td>{diameter}</td>
          <td>{gravity}</td>
          <td>{climate}</td>
          <td>{terrain}</td>
          <td>{surfaceWater}</td>
          <td>{rotationPeriod}</td>
          <td>{orbitalPeriod}</td>
          <td>{films}</td>
          <td>{created}</td>
          <td>{edited}</td>
          <td>{url}</td>
        </tr>
      );
    });
    return (
      <tbody>
        {mapPlanets}
      </tbody>
    );
  };

  const filterByName = (value) => {
    const filteredPlanets = data
      .filter((planet) => planet.name.toLowerCase().includes(value.toLowerCase()));
    setFiltered(filteredPlanets);
  };

  const handleName = ({ target: { value } }) => {
    setName(value);
    filterByName(value);
  };

  const whatRender = () => {
    if (filtered.length === 0 && name.length === 0) {
      return (
        <table>
          { renderTableHeader() }
          { renderPlanets(data) }
        </table>
      );
    }
    return (
      <table>
        { renderTableHeader() }
        { renderPlanets(filtered) }
      </table>
    );
  };

  return (
    <div>
      <form>
        Filter by:
        <br />
        <label htmlFor="name">
          Name
          <input
            data-testid="name-filter"
            type="text"
            name="name"
            id="name"
            onChange={ (e) => handleName(e) }
          />
        </label>
      </form>
      { data.length === 0 ? <span>Carregando...</span> : whatRender() }
    </div>
  );
}

export default Table;

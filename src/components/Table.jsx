import React, { useContext } from 'react';
import AppContext from '../contextAPI/AppContext';

function Table() {
  const { data } = useContext(AppContext);

  const renderTable = () => {
    const renderPlanets = data.map((planet, index) => {
      const { name, population, diameter, gravity, climate,
        terrain, surface_water: surfaceWater, rotation_period: rotationPeriod,
        orbital_period: orbitalPeriod, films, created, edited, url } = planet;
      return (
        <tr key={ index }>
          <td>{name}</td>
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
      <table>
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
        <tbody>
          {renderPlanets}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      { data.length === 0 ? <span>Carregando...</span> : renderTable() }
    </div>
  );
}

export default Table;

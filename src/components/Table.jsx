import React, { useContext } from 'react';
import AppContext from '../contextAPI/AppContext';

function Table() {
  const { data, filters: { filterByName: { name }, filterByNumericValues },
    setName, setColumn, setComparison, setValue, filtered,
    setFiltered, columnToRemove, setColumnToRemove } = useContext(AppContext);

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

  const filterByValue = (column, comparison, value) => {
    function operation(param1, param2) {
      switch (comparison) {
      case 'greater_than':
        return param1 > param2;
      case 'less_than':
        return param1 < param2;
      case 'equal_to':
        return param1 === param2;
      default:
        return true;
      }
    }
    const filteredPlanets = data
      .filter((planet) => operation(parseFloat(planet[column]), parseFloat(value)));
    setFiltered(filteredPlanets);
  };

  const buttonToFilter = () => {
    const { column, comparison, value } = filterByNumericValues[0];
    filterByValue(column, comparison, value);
    setColumnToRemove(column);
  };

  const handleChange = ({ target: { id, value } }) => {
    switch (id) {
    case 'name':
      setName(value);
      filterByName(value);
      break;
    case 'column':
      setColumn(value);
      break;
    case 'comparison':
      setComparison(value);
      break;
    case 'value_number':
      setValue(value);
      break;
    default:
      return null;
    }
  };

  const renderColumnsFilter = (columnRemove) => {
    const arrayOfColumns = ['population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water'];
    const columnsFiltered = arrayOfColumns.filter((option) => columnRemove !== option);
    return columnsFiltered.map((column) => (
      <option key={ column } value={ column }>{column}</option>
    ));
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
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <select
          id="column"
          data-testid="column-filter"
          onChange={ (e) => handleChange(e) }
        >
          { renderColumnsFilter(columnToRemove) }
        </select>
        <select
          id="comparison"
          data-testid="comparison-filter"
          onChange={ (e) => handleChange(e) }
        >
          <option value="greater_than">maior que</option>
          <option value="less_than">menor que</option>
          <option value="equal_to">igual a</option>
        </select>
        <label htmlFor="value_number">
          Value
          <input
            type="number"
            name="value_number"
            id="value_number"
            min="0"
            data-testid="value-filter"
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => buttonToFilter() }
        >
          Filter
        </button>
      </form>
      { data.length === 0 ? <span>Carregando...</span> : whatRender() }
    </div>
  );
}

export default Table;

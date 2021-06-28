import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchPlanets from '../fetchPlanets';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [columnToRemove, setColumnToRemove] = useState('');

  const contextValue = {
    data,
    setData,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: [
        {
          column,
          comparison,
          value,
        },
      ],
    },
    setName,
    setColumn,
    setComparison,
    setValue,
    filtered,
    setFiltered,
    columnToRemove,
    setColumnToRemove,
  };

  useEffect(() => {
    const fetchData = async () => {
      const planetsList = await fetchPlanets();
      setData(planetsList);
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Segundo parâmatero do useEffect = [], logo componentDidMount

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

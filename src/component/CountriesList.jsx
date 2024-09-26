import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../store/countriesSlice";
import { Alert, Spinner, Table } from "react-bootstrap";

const CountriesList = () => {
  const dispatch = useDispatch();

  // Get the countries state form Redux
  const { countries, status, error } = useSelector((state) => state.countries);

  // Fetch coountries when the component mounts
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCountries());
    }
  }, [dispatch, status]);

  // Conditional rendering based on status
  if (status === "loading") {
    return (
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading ...</span>
      </Spinner>
    );
  }

  if (status == "failed") {
    return <Alert variant="danger">Error: {error}</Alert>;
  }
  return (
    <div className="mt-4">
      <h2>Countries List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.cca3}>
              <td>{country.name.common}</td>
              <td>{country.capital ? country.capital[0] : "N/A"}</td>
              <td>{country.region}</td>
              <td>{country.population.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CountriesList;

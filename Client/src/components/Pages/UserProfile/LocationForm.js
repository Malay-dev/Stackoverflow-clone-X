import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { useDispatch } from "react-redux";
import { setLocation } from "../../../actions/location";

const LocationForm = () => {
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const countries = Country.getAllCountries();

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  }));
  const updatedStates = (countryId) =>
    State.getStatesOfCountry(countryId).map((state) => ({
      label: state.name,
      value: state.id,
      ...state,
    }));
  const updatedCities = (countryCode, stateId) =>
    City.getCitiesOfState(countryCode, stateId).map((city) => ({
      label: city.name,
      value: city.id,
      ...city,
    }));
  useEffect(() => {
    dispatch(
      setLocation({
        country: country?.name,
        state: state?.name,
        city: city?.name,
      })
    );
  }, [country, state, city]);

  return (
    <div>
      <Select
        className="selector"
        classNamePrefix="selector"
        name="country"
        id="country"
        lable="country"
        placeholder="Select Country..."
        options={updatedCountries}
        onChange={(e) => {
          setCountry(e);
        }}></Select>
      <Select
        className="selector"
        classNamePrefix="selector"
        name="state"
        id="state"
        lable="state"
        placeholder="Select State..."
        options={updatedStates(country.isoCode ? country.isoCode : null)}
        onChange={(e) => {
          setState(e);
        }}></Select>
      <Select
        className="selector"
        classNamePrefix="selector"
        name="city"
        id="city"
        lable="city"
        placeholder="Select City..."
        options={updatedCities(
          state.countryCode,
          state.isoCode ? (state.countryCode, state.isoCode) : null
        )}
        onChange={(e) => {
          setCity(e);
        }}></Select>
    </div>
  );
};

export default LocationForm;

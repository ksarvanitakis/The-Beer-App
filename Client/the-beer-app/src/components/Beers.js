import React from "react";
import { useState, useEffect } from "react";
import './Beers.css'
import image from '../Images/ebbe729c3b8741ea92aa6e14e0549a58.png'

function Beers() {
  const [backendData, setbackEndData] = useState([]);
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const fetchData = () => {
    if (!country) {
      setError("Country is required");
      return;
    }
    setError("");
    fetch(`http://localhost:3001/api/${country}`)
      .then((response) => response.json())
      .then((data) => {
        setbackEndData(data);
      });
  };

  const beerListItems = backendData.map((beer) =>
    <li className="beer-list-item">
      <p className="beer-name">{beer.beer}</p>
      <p>Brewery: {beer.brewery}</p>
      <p>Style: <span className="beer-style">{beer.style}</span></p>
      <p>Score: {beer.score}</p>
    </li>
  );

  return (
    <div>
      <div className="header-container">
        <img src={image} height={200} width={200} alt='' />
      </div>
      <form className="beer-search-form" >
        {error && <div className="error">{error}</div>}
        <label className="beer-search-form-label" for="countryInput">Type Country:</label>
        <input
          id="countryInput"
          type="text"
          className="beer-search-form-input"
          value={country.value}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type="button" className="btn btn-search" onClick={fetchData}>Search</button>
      </form>
      {beerListItems.length > 0 && <p className="text">We found {beerListItems.length} results.</p>}
      <div className="beer-list-container">
        {beerListItems.length > 0 && <ul className="beer-list">{beerListItems}</ul>}
      </div>
    </div>
  );
}

export default Beers;

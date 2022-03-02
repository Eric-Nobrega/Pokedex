import "./index.css";
//Import React & useState
import React, { useState, useEffect } from "react";
import Logo from "./data/placeholder.jpg";
function App() {
  //State Of Search Bar, set default to empty string
  const [newPokemon, setNewPokemon] = useState("");
  //State Of Returned Pokemon, set default to empty object
  const [pokemon, setPokemon] = useState({
    id: undefined,
    name: "",
    type: "",
    hp: "",
    attack: "",
    defense: "",
  });
  //Pokemon Image State, set default to question mark
  const [pokemonImage, setPokemonImage] = useState(Logo);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${newPokemon}`
      );
      const pokemonData = await response.json();
      const pokemonID = pokemonData.id;
      const pokemonName = pokemonData.name;
      const typeObject = pokemonData.types[0];
      const pokemonType = typeObject.type.name;
      const pokemonHP = Math.floor(Math.random() * 100);
      const pokemonAttack = Math.floor(Math.random() * 100);
      const pokemonDefense = Math.floor(Math.random() * 100);
      const pokemonImage = pokemonData.sprites.front_default;
      setPokemon({
        id: pokemonID,
        name: pokemonName[0].charAt(0).toUpperCase() + pokemonName.slice(1),
        type: pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1),
        hp: pokemonHP,
        attack: pokemonAttack,
        defense: pokemonDefense,
      });
      setPokemonImage(pokemonImage);
    } catch (error) {
      console.log("Failed to fetch" + error);
    }
  };

  const handleSearch = () => {
    if (newPokemon == "") {
      alert("Please Enter A Pokemon To Continue!");
    }
    fetchPokemonData();
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  return (
    <div className="App">
      <h1>Pokédex</h1>
      <p>(Created /w ReactJS, APIs & Boostrap).</p>
      <div id="mainContainer">
        <div className="input-group">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search For A Pokémon"
            value={newPokemon.charAt(0).toUpperCase() + newPokemon.slice(1)}
            onChange={(e) => {
              const userInput = e.target.value;
              const convertedUserInput =
                userInput.charAt(0).toLowerCase() + userInput.slice(1);
              setNewPokemon(convertedUserInput);
            }}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div id="topContainer">
          <div id="imgContainer">
            <img className="images" src={pokemonImage} />
          </div>
          <div className="genericCard" id="nameContainer">
            <div className="label">Name</div>
            <div className="value" key={pokemon.id}>
              {pokemon.name}
            </div>
          </div>
          <div className="genericCard" id="typeConatiner">
            <div className="label">Type</div>
            <div className="value" key={pokemon.id}>
              {pokemon.type}
            </div>
          </div>
        </div>

        <div id="bottomContainer">
          <div className="bottomGenericCard">
            <div className="label">HP</div>
            <div className="value" key={pokemon.id}>
              {pokemon.hp}
            </div>
          </div>
          <div className="bottomGenericCard">
            <div className="label">Attack</div>
            <div className="value" key={pokemon.id}>
              {pokemon.attack}
            </div>
          </div>
          <div className="bottomGenericCard">
            <div className="label">Defense</div>
            <div className="value" key={pokemon.id}>
              {pokemon.defense}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import queryString from "query-string";
import { FaStar, FaLongArrowAltLeft } from "react-icons/fa";
import { pokemonService } from "../../../services";
import "./styles.css";

const getPokemon = async (pokemonId) => {
  const pokemon = await pokemonService.getById(pokemonId);

  return pokemon;
};

const buildPokemonTypes = (types) => {
  return types.map((item) => (
    <div className="col col-md-3">
      <span className="col badge-pill badge badge-secondary">
        {item.type.name}
      </span>
    </div>
  ));
};

const buildPokemonAbilities = (abilities) => {
  console.log(abilities);
  return abilities.map((item) => (
    <div className="col col-md-3">
      <span className="col badge-pill badge badge-secondary">
        {item.ability.name}
      </span>
    </div>
  ));
};

const buildPokemonStats = (stats) => {
  return stats.map((items) => (
    <div className="col col-md-12">
      <span className="col badge badge-pill badge-secondary">
        {items.stat.name}: {items.base_stat}
      </span>
    </div>
  ));
};

const buildPokemonInfo = async (pokemon) => {
  console.log(pokemon);
  if (pokemon) {
    const {
      name,
      sprites,
      id,
      weight,
      height,
      species,
      types,
      abilities,
      stats,
    } = pokemon;
    const pokemonImg = sprites.other["official-artwork"].front_default;

    return (
      <div key={`${name}-${id}-poke`} className="row">
        <div className="col col-md-6">
          <div className="col col-md-10">
            <img src={`${pokemonImg}`} className="card-img-top" alt={name} />
          </div>
          <div className="col col-md-4">
            <span className="col btn btn-sm btn-warning">
              <FaStar /> Favorite <b>{name}</b>
            </span>
          </div>
        </div>
        <div className="col col-md-6 card-pokemon">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h4>
                <b>{name}</b>
              </h4>
            </li>
            <li className="list-group-item">
              <div className="row">
                <b>Weight:</b> {weight}
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <b>Height:</b> {height}
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <b>Species:</b> {species.name}
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <b>Types:</b> {buildPokemonTypes(types)}
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <b>Abilities:</b> {buildPokemonAbilities(abilities)}
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <b>stats:</b> {buildPokemonStats(stats)}
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col col-md-12">
                  <a href="/" class="col btn btn-info">
                    <FaLongArrowAltLeft /> Back
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return <div></div>;
};

const Details = (props) => {
  let params = queryString.parse(props.location?.search);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(params.pokemonid);
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    document.title = `Detail page - ${pokemon?.name || ""}`;
  });

  useEffect(() => {
    if (pokemon === null)
      getPokemon(pokemonId).then((res) => {
        setPokemon(res);
      });
  });

  useEffect(() => {
    buildPokemonInfo(pokemon).then((res) => {
      setPokemonData(res);
    });
  }, [pokemon]);

  return <div>{pokemonData}</div>;
};

export default Details;

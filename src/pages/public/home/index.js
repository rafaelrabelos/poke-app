import { useState, useEffect } from "react";
import queryString from "query-string";
import { pokemonService } from "../../../services";
import "./styles.css";

const getPokemons = async (offset = 0, limit = 20) => {
  const pokemons = await pokemonService.getPaginated(offset, limit);
  const pokemonsInfo = await getPokemonsInfo(pokemons);

  return pokemonsInfo;
};

const getPokemonsInfo = async (pokemons) => {
  const pokemonsList = pokemons.results;

  for (let i = 0; i < pokemonsList.length; i++) {
    const pokemonId = pokemonsList[i].url.split("/")[6];
    const pokemonInfo = await pokemonService.getById(pokemonId);
    pokemons.results[i].info = pokemonInfo;
  }

  return pokemons;
};

const buildPokemons = async (pokemons) => {
  if (pokemons && pokemons.results) {
    const pokemonsItems = pokemons.results.map((pokemon, idx) => {
      if (!pokemon.info) return <div></div>;

      const { name, sprites, id } = pokemon.info;
      const pokemonImg = sprites.other["official-artwork"].front_default;

      return (
        <div key={`${idx}-${id}-poke`} className="col col-md-2 card-pokemon">
          <div className="card">
            <img src={`${pokemonImg}`} className="card-img-top" alt={name} />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
      );
    });

    return pokemonsItems;
  }
  return <div></div>;
};

const buildPagination = async (count = 1, limit = 1, _updateFn = () => {}) => {
  const totalPages = Math.round(count / limit);
  let offset = 0;

  return [...Array(totalPages).keys()].map((pageNum, idx) => {
    const page = (
      <div key={`${idx}-page`} className="col col-md-1">
        <a href={`?offset=${offset}&limit=${limit}`}>{pageNum + 1}</a>
      </div>
    );
    offset = offset + limit;
    return page;
  });
};

const App = (props) => {
  let params = queryString.parse(props.location?.search);
  const [pokemons, setPokemons] = useState(null);
  const [pokemonsList, setPokemonsList] = useState(null);
  const [pagesList, setPagesList] = useState(null);

  useEffect(() => {
    document.title = `Pokemons page`;
  });

  useEffect(() => {
    if (pokemons === null) {
      getPokemons(params.offset, params.limit).then((res) => {
        setPokemons(res);
      });
    } else {
      const count = pokemons.count;
      buildPokemons(pokemons).then((res) => {
        setPokemonsList(res);
      });

      buildPagination(count, 20, setPokemons).then((res) => {
        setPagesList(res);
      });
    }
  }, [pokemons]);

  return (
    <div className="row">
      <div className="row">{pokemonsList}</div>
      <div className="row">{pagesList}</div>
    </div>
  );
};

export default App;

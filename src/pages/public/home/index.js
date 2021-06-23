import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
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

// Builds the components for this page
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
              <p className="card-text">
                <a
                  className="col btn btn-sm btn-outline-primary"
                  href={`datails?pokemonid=${id}`}
                >
                  Details
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    });

    return pokemonsItems;
  }
  return <div></div>;
};

export const getCurrentPage = (offset, limit) => {
  let currentPage = 1;
  const parsedOffset = parseFloat(offset);
  const parsedLimit = parseFloat(limit);

  if (!offset || !limit || parsedOffset < parsedLimit) return currentPage;

  currentPage = (parsedOffset + parsedLimit) / parseFloat(limit);

  return currentPage < 1 ? 1 : currentPage;
};

const buildPagination = async (
  count = 1,
  limit = 1,
  currentPage,
  _updateFn = () => {}
) => {
  const totalPages = Math.round(count / limit);
  let offset = 0;

  return [...Array(totalPages).keys()].map((pageNum, idx) => {
    const activePage = currentPage === parseFloat(pageNum) + 1;
    const page = (
      <li
        key={`${idx}-page-item `}
        className={`page-item ${activePage ? " active" : ""}`}
      >
        <a
          className="page-link active"
          href={`?offset=${offset}&limit=${limit}`}
        >
          {parseFloat(pageNum) + 1}
        </a>
      </li>
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
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPreviousPage] = useState(null);

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
      const currentPage = getCurrentPage(params.offset, params.limit);

      setNextPage(pokemons?.next?.split("?")[1]);
      setPreviousPage(pokemons?.previous?.split("?")[1]);

      buildPokemons(pokemons).then((res) => {
        setPokemonsList(res);
      });

      buildPagination(count, 20, currentPage, setPokemons).then((res) => {
        setPagesList(res);
      });
    }
  }, [params.limit, params.offset, pokemons]);

  return (
    <div className="row">
      <div className="row">
        <a href="/app/favorites" className="float">
          <FaStar color="yellow" size="19" className="my-float" />
        </a>
      </div>
      <div className="row">{pokemonsList}</div>
      <hr />
      <div className="row">
        <nav aria-label="col Page navigation example">
          <ul className="pagination flex-wrap">
            <li className="page-item">
              <a className="page-link" href={`?${prevPage}`}>
                Previous
              </a>
            </li>
            {pagesList}
            <li className="page-item">
              <a className="page-link" href={`?${nextPage}`}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default App;

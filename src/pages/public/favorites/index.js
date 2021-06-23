import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { pokemonService } from "../../../services";
import "./styles.css";
export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: null,
      pageTitle: "Favorites page",
    };
  }

  getPokemon = async (pokemonId) => {
    const pokemon = await pokemonService.getById(pokemonId);

    return pokemon;
  };

  getFavorites = () => {
    const separator = ";";
    const storedFavorites = localStorage.getItem("favlist");
    const favoriteList = storedFavorites
      ?.split(separator)
      .filter((fav) => fav !== "");

    return favoriteList;
  };

  // Build the components foor this page
  buildFavorites = async () => {
    const favorites = this.getFavorites();

    let pokemonsData = [];

    for (let i = 0; i < favorites.length; i++) {
      const element = favorites[i];
      const pokemon = await this.getPokemon(element);

      pokemonsData.push(pokemon);
    }

    if (pokemonsData) {
      const pokemons = pokemonsData.map((pokemon, idx) => {
        const { name, sprites, id } = pokemon;
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

      this.setState({ pokemonList: pokemons });

      return pokemons;
    }
    return <div></div>;
  };

  componentDidMount() {
    this.buildFavorites();
  }

  render() {
    const { pageTitle, pokemonList } = this.state;

    document.title = pageTitle;

    return (
      <div className="row">
        <div className="row">
          <a href="/app/" className="float">
            <FaArrowLeft size="19" className="my-float" />
          </a>
        </div>
        <div className="row">{pokemonList}</div>
      </div>
    );
  }
}

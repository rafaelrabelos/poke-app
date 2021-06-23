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

    if(favorites && favorites.length > 0)
    for (let i = 0; i < favorites.length; i++) {
      const element = favorites[i];
      const pokemon = await this.getPokemon(element);

      pokemonsData.push(pokemon);
    }

    if (pokemonsData && pokemonsData.length > 0) {
      const pokemons = pokemonsData.map((pokemon, idx) => {
        const { name, sprites, id } = pokemon;
        const pokemonImg = sprites.other["official-artwork"].front_default;

        return (
          <div key={`${idx}-${id}-poke`} className="col col-lg-4 card-pokemon">
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
    
    const emptyDetail = (
      <div className="card alert alert-warning">
              <div className="card-body">
                <h5 className="card-title">Oops!<br />you don't have any pokemon in your favorite list</h5>
                <p className="card-text"> Please go back to the main page and browse the Pokémon list to select your favorites.
                 Once you've selected a Pokémon, you can see it on this page <br/><br/>
                 <a href="/" >Back to main page</a>
                </p>
              </div>
            </div>
    );

    this.setState({ pokemonList: emptyDetail });
    return emptyDetail;
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

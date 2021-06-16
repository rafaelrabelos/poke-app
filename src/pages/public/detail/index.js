import React from "react";
import queryString from "query-string";
import { FaStar, FaLongArrowAltLeft } from "react-icons/fa";
import { pokemonService } from "../../../services";
import "./styles.css";
export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
      isfavorite: "",
      pageTitle: "Detail page",
      loading: false,
    };
  }

  getPokemon = async (pokemonId) => {
    const pokemon = await pokemonService.getById(pokemonId);

    return pokemon;
  };

  buildPokemonTypes = (types) => {
    return types.map((item) => (
      <div className="col col-md-3">
        <span className="col badge-pill badge badge-secondary">
          {item.type.name}
        </span>
      </div>
    ));
  };

  buildPokemonAbilities = (abilities) => {
    return abilities.map((item) => (
      <div className="col col-md-3">
        <span className="col badge-pill badge badge-secondary">
          {item.ability.name}
        </span>
      </div>
    ));
  };

  buildPokemonStats = (stats) => {
    return stats.map((items) => (
      <div className="col col-md-12">
        <span className="col badge badge-pill badge-secondary">
          {items.stat.name}: {items.base_stat}
        </span>
      </div>
    ));
  };

  handleFavoriteClick = (pokemonId) => {
    const separator = ";";
    let favoriteList = localStorage.getItem("favlist");

    if (favoriteList === null) {
      localStorage.setItem("favlist", `${pokemonId}`);
      return;
    }

    favoriteList = favoriteList.split(separator);

    if (favoriteList.some((some) => some === `${pokemonId}`)) {
      const idx = favoriteList.indexOf(pokemonId);

      favoriteList.splice(idx, 1);
      localStorage.setItem("favlist", favoriteList.join(separator));
      return;
    }

    favoriteList.push(pokemonId);

    localStorage.setItem("favlist", favoriteList.join(separator));
  };

  isFavorite = (pokemonId) => {
    const separator = ";";
    let favoriteList = localStorage.getItem("favlist");
    return favoriteList
      ?.split(separator)
      .some((some) => some === `${pokemonId}`);
  };

  buildPokemonInfo = (pokemon) => {
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
      const { isfavorite } = this.state;

      return (
        <div key={`${name}-${id}-poke`} className="row">
          <div className="col col-md-6">
            <div className="col col-md-10">
              <img src={`${pokemonImg}`} className="card-img-top" alt={name} />
            </div>
            <div className="col col-md-5">
              <span
                className="col btn btn-sm btn-outline-secondary"
                onClick={() => this.handleFavoriteClick(id)}
              >
                <FaStar color={`${isfavorite ? "yellow" : "gray"}`} size="20" />{" "}
                Favorite <b>{name}</b>
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
                  <b>Types:</b> {this.buildPokemonTypes(types)}
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <b>Abilities:</b> {this.buildPokemonAbilities(abilities)}
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <b>stats:</b> {this.buildPokemonStats(stats)}
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

  componentDidMount() {
    let params = queryString.parse(this.props.location?.search);
    const { pokemonid } = params;

    this.getPokemon(pokemonid).then((res) => {
      this.setState({
        pokemon: res,
        pageTitle: `Detail page - ${res?.name || ""}`,
      });
    });
  }

  render() {
    const { pokemon, pageTitle } = this.state;

    document.title = pageTitle;

    return <div>{this.buildPokemonInfo(pokemon)}</div>;
  }
}

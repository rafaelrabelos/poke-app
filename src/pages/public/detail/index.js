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
    };
  }

  getPokemon = async (pokemonId) => {
    const pokemon = await pokemonService.getById(pokemonId);

    return pokemon;
  };

  buildPokemonTypes = (types) => {
    return types.map((item, idx) => (
      <div key={`${idx}-type`} className="col col-md-3">
        <span className="col badge-pill badge badge-secondary">
          {item.type.name}
        </span>
      </div>
    ));
  };

  buildPokemonAbilities = (abilities) => {
    return abilities.map((item, idx) => (
      <div key={`${idx}-ability`} className="col col-md-3">
        <span className="col badge-pill badge badge-secondary">
          {item.ability.name}
        </span>
      </div>
    ));
  };

  buildPokemonStats = (stats) => {
    return stats.map((items, idx) => (
      <div key={`${idx}-stats`} className="col col-md-12">
        <span className="col badge badge-pill badge-secondary">
          {items.stat.name}: {items.base_stat}
        </span>
      </div>
    ));
  };

  buildPokemonDetailsList = (pokemon) => {
    const { name, weight, height, species, types, abilities, stats } = pokemon;

    const details = [
      {
        detail: "",
        value: (
          <h4>
            <b>{name}</b>
          </h4>
        ),
      },
      { detail: "Weight:", value: weight },
      { detail: "Height:", value: height },
      { detail: "Species:", value: species.name },
      { detail: "Types:", value: this.buildPokemonTypes(types) },
      { detail: "Abilities:", value: this.buildPokemonAbilities(abilities) },
      { detail: "stats:", value: this.buildPokemonStats(stats) },
    ];

    const detailsList = details.map((item, idx) => {
      return (
        <li key={`${item.detail}-${idx}-detail-li`} className="list-group-item">
          <div key={`${item.detail}-detail-li`} className="row">
            <b>{item.detail}</b> {item.value}
          </div>
        </li>
      );
    });

    //detailsList.push()

    return detailsList;
  };

  handleFavoriteClick = (pokemonId) => {
    const separator = ";";
    let favoriteList = localStorage.getItem("favlist");

    if (favoriteList === null) {
      localStorage.setItem("favlist", `${pokemonId}${separator}`);
      return;
    }

    favoriteList = favoriteList.split(separator);

    if (favoriteList.some((some) => some === `${pokemonId}`)) {
      const idx = favoriteList.indexOf(`${pokemonId}`);

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

  // Builds the main component for this page
  buildPokemonInfo = (pokemon) => {
    if (pokemon) {
      const { name, sprites, id } = pokemon;
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
                className={`col btn btn-sm btn-outline-${
                  isfavorite ? "success" : "secondary"
                }`}
                onClick={() => {
                  this.handleFavoriteClick(id);
                  this.setState({ isfavorite: this.isFavorite(id) });
                }}
              >
                <FaStar color={`${isfavorite ? "green" : "gray"}`} size="20" />{" "}
                {`${isfavorite ? "Unfavorite" : "Favorite"}`} <b>{name}</b>
              </span>
            </div>
          </div>
          <div className="col col-md-6 card-pokemon">
            <ul className="list-group list-group-flush">
              {this.buildPokemonDetailsList(pokemon)}
              <li key="back-btn-detail-li" className="list-group-item">
                <div className="row">
                  <div className="col col-md-12">
                    <a href="/" className="col btn btn-info">
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
        isfavorite: this.isFavorite(pokemonid),
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

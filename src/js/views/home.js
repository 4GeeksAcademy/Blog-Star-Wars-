import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import RigoStar from "../../img/rigo-baby.jpg";

export const Home = () => {
  const { store } = useContext(Context);
  const { planets, people, starships } = store;

  return (
    <div className="m-5 ">
      <section>
        <h1 className="fw-bold mt-5">Characters:</h1>
        <CharactersList characters={people} type={"people"} />
      </section>
      <section>
        <h1 className="fw-bold mt-5">Planets:</h1>
        <CharactersList characters={planets} type={"planets"} />
      </section>
      <section>
        <h1 className="fw-bold mt-5">Starships:</h1>
        <CharactersList characters={starships} type={"starships"} />
      </section>
    </div>
  );
};

const CharactersList = ({ characters, type }) => {
  return (
    <section style={{ display: "flex", width: "100%", overflow: "auto" }}>
      {characters.map((character) => (
        <Character key={character.url} character={character} type={type} />
      ))}
    </section>
  );
};

const Character = ({ type, character }) => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const isLiked = actions.isLikedElement(type + character.uid);

  const goToDetailView = () => {
    actions.cleanDetailView();
    navigate(`${type}/${character.uid}`);
  };

  const handleClick = () => {
    if (isLiked) return actions.removeLikedElement(type + character.uid);

    return actions.addNewLikedElement({
      ...character,
      id: type + character.uid,
    });
  };
  

  return (
    <span style={{ margin: "0.7rem", width: "18rem" }}>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={`https://starwars-visualguide.com/assets/img/${type}/${character.uid}.jpg`}
          onError={(e) => {
            e.target.src = RigoStar;
          }}
          className="card-img-top"
          
          alt="image"
          style={{ objectFit: "cover", height: "300px", width: "100%" }}
        />
        <div className="card-body">
          <h5 className="card-title">{character.name}</h5>
          <button className="btn btn-primary" onClick={goToDetailView}>
            Learn more
          </button>
          <button className="btn" onClick={handleClick}>
            {isLiked ? (
              <i className="fas fa-heart text-warning"></i>
            ) : (
              <i className="far fa-heart text-warning"></i>
            )}
          </button>
        </div>
      </div>
    </span>
  );
  
};
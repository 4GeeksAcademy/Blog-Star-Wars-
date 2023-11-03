import React, { useContext } from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";

export const DetailView = ({ title, type }) => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const { detailCharacter } = store;

  React.useEffect(() => {
    if (!type) return;
  
    if (id) {
      actions.fetchDetailData(type, id);
    } else {
      actions.fetchGeneralData(type);
    }
  
  }, [id, type, actions]);
  

  return (
    <div style={{ margin: "1rem" }}>
      <h1>{title} {id}</h1>
      <section style={{ margin: "1rem" }}>
        {Object.keys(detailCharacter).map((key) => (
          <p key={key}>{detailCharacter[key]}</p>
        ))}
      </section>
    </div>
  );
};
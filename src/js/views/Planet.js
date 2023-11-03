import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";

export const Planet = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const { detailPlanet } = store;
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) return;

                setLoading(true);
                setError(null);

                await actions.fetchPlanetData(id);
            } catch (error) {
                console.error("Error fetching planet data:", error);
                setError("Error fetching planet data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, actions]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={{ margin: "1rem" }}>
            <h1>Planet {id}</h1>
            <section style={{ margin: "1rem" }}>
                {Object.keys(detailPlanet).map((key) => (
                    <p key={key}>
                        <strong>{key}:</strong> {detailPlanet[key]}
                    </p>
                ))}
            </section>
        </div>
    );
};
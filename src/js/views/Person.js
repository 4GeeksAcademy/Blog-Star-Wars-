import React, { useContext } from "react"
import { useParams } from "react-router"
import { Context } from "../store/appContext"

export const Person = () => {
    const { id } = useParams()
    const { store, actions } = useContext(Context)
    const { detailPerson } = store


    React.useEffect(() => {
        if (!id) return

        actions.fetchPersonData(id)

    }, [])


    return <div style={{ margin: "1rem" }}>
        <h1>Person {id}</h1>
        <section style={{ margin: "1rem" }}>
            {
                Object.keys(detailPerson).map((key) => <p key={key}>{detailPerson[key]}</p>)
            }
        </section>
    </div>
}
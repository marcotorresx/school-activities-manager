import React from 'react'
import "./Home.css"
import Filter from '../components/Filter'

const Home = () => {

    // VARIABLES 
    const [activities, setActivities] = React.useState({})
    const [loaded, setLoaded] = React.useState(false)

    return (
        <div className="home">
            {/* FILTER */}
            <Filter setActivities={setActivities} setLoaded={setLoaded}/>

            {/* SERACH RESULT */
            loaded &&
            <>
                {/* BREADCUM */}
                <div className="search_header">
                    <p>Grupo: <span>{activities?.grupo ? activities?.grupo : "No disponible"}</span></p>
                    <p>Materia: <span>{activities?.materia ? activities?.materia : "No disponible"}</span></p>
                    <p>Periodo: <span>{activities?.periodo ? activities?.periodo : "No disponible"}</span></p>
                    <p>Semana: <span>{activities?.semana ? activities?.semana : "No disponible"}</span></p>
                    <p>Maestro: <span>{activities?.maestro ? activities?.maestro : "No disponible"}</span></p>
                </div>

                {/* ACTIVITIES */}
                <div className="activities_container">

                    {/* ACTIVITY 1 */}
                    <div className="activity">
                        <h2 className="activity_title">Actividad 1</h2>
                        <p className="activity_content">{activities?.act1 ? activities?.act1 : "No hay actividad registrada"}</p>
                    </div>

                    {/* ACTIVITY 2 */}
                    <div className="activity">
                        <h2 className="activity_title">Actividad 2</h2>
                        <p className="activity_content">{activities?.act2 ? activities?.act2 : "No hay actividad registrada"}</p>
                    </div>

                    {/* ACTIVITY 3 */}
                    <div className="activity">
                        <h2 className="activity_title">Actividad 3</h2>
                        <p className="activity_content">{activities?.act3 ? activities?.act3 : "No hay actividad registrada"}</p>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default Home

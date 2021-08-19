import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Typography, Button} from '@material-ui/core'
import {useParams} from "react-router-dom"
import {db} from "../firebase"
import {useHistory} from "react-router"
import "./EditActivities.css"
import { UserContext } from '../contexts/UserContext'

// STYLES
const useStyles = makeStyles({
    title: {
        marginTop: "30px",
        marginLeft: "10px",
        marginBottom: "10px",
        width: "100%"
    }
});

// COMPONENT
const EditActivities = () => {

    // VARIABLES
    const classes = useStyles()
    const {activeUser} = React.useContext(UserContext)
    const {group, sub, per, wk} = useParams()
    const [subject, setSubject] = React.useState("")
    const [period, setPeriod] = React.useState("")
    const [week, setWeek] = React.useState("")
    const [cleaned, setCleaned] = React.useState(false)
    const [act1Value, setAct1Value] = React.useState("")
    const [act2Value, setAct2Value] = React.useState("")
    const [act3Value, setAct3Value] = React.useState("")
    const history = useHistory()

    // CLEAN PARAMS
    function cleanParams(){
        setSubject(sub.replace("%20", " "))
        setPeriod(per.replace("%20", " "))
        setWeek(wk.replace("%20", " "))
        setCleaned(true)
    }

    // UPDATE ACTIVITIES
    async function updateActivities(){
        try{
            // Create new activities
            const new_activities = {
                act1: act1Value,
                act2: act2Value,
                act3: act3Value,
                maestro: activeUser.nombre,
                grupo: group,
                materia: subject,
                periodo: period,
                semana: week
            }

            // Set new activities on DB
            await db.collection(group).doc(subject).collection(period).doc(week).set(new_activities)

            // Push to My ACtivities
            history.push("/teacher/myactivities")
        }
        catch(error){
            alert("Hubo un error cambiando las actividades de la materia.")
            console.log("UPDATE TEACHER ACTIVITIES ERROR:", error)
        }
    }

    // USE EFFECT
    React.useEffect(() => {
        cleanParams()
    }, [])

    return (
        cleaned &&
        <div className="editactivities">
            <Typography variant="h6" component="h2" className={classes.title} align="center">CAMBIAR ACTIVIDADES DE GRUPO</Typography>

            {/* GROUP INFO */}
            <div className="edit_activities_info">
                <p>Grupo: <span>{group}</span></p>
                <p>Materia: <span>{subject}</span></p>
                <p>Periodo: <span>{period}</span></p>
                <p>Semana: <span>{week}</span></p>
            </div>

            {/* ACTIVITIES */}
            <div className="activity_div">
                <p>Actividad 1</p>
                <textarea value={act1Value} onChange={e => setAct1Value(e.target.value)}></textarea>
            </div>
            <div className="activity_div">
                <p>Actividad 2</p>
                <textarea value={act2Value} onChange={e => setAct2Value(e.target.value)}></textarea>
            </div>
            <div className="activity_div">
                <p>Actividad 3</p>
                <textarea value={act3Value} onChange={e => setAct3Value(e.target.value)}></textarea>
            </div>

            {/* BUTTON */}
            <div className="edit_activities_btn_div">
                <Button variant="contained" color="primary" size="large" onClick={updateActivities}>GUARDAR ACTIVIDADES</Button>
            </div>
        </div>
    )
}

export default EditActivities

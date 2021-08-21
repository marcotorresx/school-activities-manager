import React from 'react'
import FilterTeacher from '../components/FilterTeacher'
import { makeStyles } from '@material-ui/core/styles';
import {TableContainer, Table, TableBody, TableRow, TableCell, Paper, Button} from '@material-ui/core'
import {Link} from "react-router-dom"
import "./MyActivities.css"

// STYLES
const useStyles = makeStyles({
    tableContainer: {
        margin: "30px 0px 30px 0px"
    },
    table: {
        width: "100%",
        whiteSpace: "pre-wrap"
    },
    title: {
        marginTop: "45px",
        marginLeft: "13px"
    }
})

// COMPONENT
const MyActivities = () => {

    // VARIABLES
    const classes = useStyles()
    const [activities, setActivities] = React.useState({})
    const [loaded, setLoaded] = React.useState(false)

    return (
        <div className="my_activities">
            {/* FILTER */}
            <FilterTeacher setActivities={setActivities} setLoaded={setLoaded}/>

            {/* TABLE */
            loaded && 
            <>
                <div className="myactivities_header">
                    <div className="search_info">
                        <p>Grupo: <span>{activities?.grupo ? activities?.grupo : "No disponible"}</span></p>
                        <p>Materia: <span>{activities?.materia ? activities?.materia : "No disponible"}</span></p>
                        <p>Periodo: <span>{activities?.periodo ? activities?.periodo : "No disponible"}</span></p>
                        <p>Semana: <span>{activities?.semana ? activities?.semana : "No disponible"}</span></p>
                    </div>
                    <Link 
                    to={`/teacher/editactivities/${activities?.grupo}/${activities?.materia}/${activities?.periodo}/${activities?.semana}`}>
                        <Button variant="contained" color="primary">CAMBIAR ACTIVIDADES</Button>
                    </Link>
                </div>

                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table}>

                        {/* BODY */}
                        <TableBody>

                            {/* HEADERS */}
                            <TableRow key="headers">
                                <TableCell align="left"><b>ACTIVIDAD</b></TableCell>
                                <TableCell align="center"><b>CONTENIDO</b></TableCell>
                            </TableRow>

                            {/* ACTIVITY 1 */}
                            <TableRow>
                                <TableCell align="left" style={{ width: 150 }}>
                                    <p className="home_subject_title">Actividad 1</p>
                                </TableCell>
                                <TableCell align="left">
                                    {activities?.act1 ? activities?.act1 : "No hay actividad registrada."}
                                </TableCell>
                            </TableRow>

                            {/* ACTIVITY 2 */}
                            <TableRow>
                                <TableCell align="left" style={{ width: 150 }}>
                                    <p className="home_subject_title">Actividad 2</p>
                                </TableCell>
                                <TableCell align="left">
                                    {activities?.act2 ? activities?.act2 : "No hay actividad registrada."}
                                </TableCell>
                            </TableRow>

                            {/* ACTIVITY 3 */}
                            <TableRow>
                                <TableCell align="left" style={{ width: 150 }}>
                                    <p className="home_subject_title">Actividad 3</p>
                                </TableCell>
                                <TableCell align="left">
                                    {activities?.act3 ? activities?.act3 : "No hay actividad registrada."}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
            }
        </div>
    )
}

export default MyActivities

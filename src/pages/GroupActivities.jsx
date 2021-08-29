import React from 'react'
import {Button, Typography, FormControl, Select, InputLabel, TableContainer, Table, TableBody, TableRow, TableCell, Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GeneralContext } from '../contexts/GeneralContext'
import { AdminContext } from '../contexts/AdminContext'
import "./GroupActivities.css"

// STYLES
const useStyles = makeStyles(theme => ({
    formControl: {
        width: "160px",
        margin: "0px 20px 0px 0px",
        [theme.breakpoints.down("xs")]: {
            margin: "10px 0px"
        }
    },
    tableContainer: {
        margin: "30px 0px 30px 0px"
    },
    table: {
        width: "100%",
        whiteSpace: "pre-wrap"
    },
}))

const GroupActivities = () => {

    // VARIABLES
    const classes = useStyles()
    const {all_groups, weeks} = React.useContext(GeneralContext)
    const {findGroupActivities} = React.useContext(AdminContext)
    const [selectedGroup, setSelectedGroup] = React.useState("")
    const [selectedPeriod, setSelectedPeriod] = React.useState("")
    const [selectedWeek, setSelectedWeek] = React.useState("")
    const [activities, setActivities] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const [disableBtn, setDisableBtn] = React.useState(false)

    // HANDLE CLICK
    async function handleClick(){
        if (selectedGroup === "" || !selectedGroup.trim() || selectedPeriod === "" || !selectedPeriod.trim() || selectedWeek === "" || !selectedWeek.trim()){
            alert("Para hacer una búsqueda debes de rellenar todos los campos de la filtración.")
            return
        }
        
        // Find activities
        setLoaded(false)
        setDisableBtn(true)

        const activities = await findGroupActivities(selectedGroup, selectedPeriod, selectedWeek)
        setActivities(activities)
        
        setTimeout(() => {
            setLoaded(true)
            setDisableBtn(false)
        }, 1000)
    }

    return (
        <div className="group_activities">
            
            {/* TITLE */}
            <Typography variant="h6" component="h2" style={{marginBottom: "20px"}}>Buscar Actividades de Grupo</Typography>

            {/* FILTER */}
            <div className="group_activities_filter">

                {/* SELECT GROUP */}
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="select-grupo">Grupo</InputLabel>
                    <Select native label="Grupo" 
                        inputProps={{ name: 'Grupo', id: 'select-grupo',}}
                        value={selectedGroup}
                        onChange={e => setSelectedGroup(e.target.value)}
                    >
                        <option aria-label="None" value=""/>
                        {all_groups.map(group => (<option value={group} key={group}>{group}</option>))}
                    </Select>
                </FormControl>

                {/* SELECT PERIOD */}
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="select-periodo">Periodo</InputLabel>
                    <Select native label="Periodo" 
                        inputProps={{ name: 'Periodo', id: 'select-periodo',}}
                        value={selectedPeriod}
                        onChange={e => setSelectedPeriod(e.target.value)}
                    >
                        <option aria-label="None" value=""/>
                        <option value="1er Periodo">1er Periodo</option>
                        <option value="2do Periodo">2do Periodo</option>
                        <option value="3er Periodo">3er Periodo</option>
                    </Select>
                </FormControl>

                {/* SELECT WEEK */}
                <FormControl variant="outlined" className={classes.formControl} style={{width: "300px"}}>
                    <InputLabel htmlFor="select-semana">Semana</InputLabel>
                    <Select native label="Semana"
                        inputProps={{ name: 'Semana', id: 'select-semana',}}
                        value={selectedWeek}
                        onChange={e => setSelectedWeek(e.target.value)}
                    >
                        <option aria-label="None" value=""/>
                        {selectedPeriod !== "" && weeks[selectedPeriod].map(week => (<option value={week} key={week}>{week}</option>))}
                    </Select>
                </FormControl>

                {/* BUTTON */}
                <Button variant="contained" color="primary" onClick={handleClick} className={classes.btn} disabled={disableBtn}>Buscar</Button>

            </div>

            {/* TABLE */
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table}>

                    {/* BODY */}
                    <TableBody>

                        {/* HEADERS */}
                        <TableRow key="headers">
                            <TableCell align="left"><b>MATERIA</b></TableCell>
                            <TableCell align="left"><b>MAESTRO</b></TableCell>
                            <TableCell align="left"><b>ACTIVIDAD 1</b></TableCell>
                            <TableCell align="left"><b>ACTIVIDAD 2</b></TableCell>
                            <TableCell align="left"><b>ACTIVIDAD 3</b></TableCell>
                        </TableRow>

                        {loaded && activities.map((item, index) => (
                            <TableRow key={index}>
                             <TableCell align="left">{item?.materia ? item?.materia : "No disponible"}</TableCell>
                             <TableCell align="left">{item?.maestro ? item?.maestro : "No disponible"}</TableCell>
                             <TableCell align="left">{item?.act1 && "Registrada"}</TableCell>
                             <TableCell align="left">{item?.act2 && "Registrada"}</TableCell>
                             <TableCell align="left">{item?.act3 && "Registrada"}</TableCell>
                         </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>}
        </div>
    )
}

export default GroupActivities

import React from 'react'
import "./Filter.css"
import { makeStyles } from '@material-ui/core/styles'
import {Button, Typography, FormControl, Select, InputLabel} from '@material-ui/core'
import {GeneralContext} from '../contexts/GeneralContext';

// STYLES
const useStyles = makeStyles(theme => ({
    formControl: {
        width: "160px",
        margin: "0px 20px 0px 0px",
        [theme.breakpoints.down("xs")]: {
            margin: "10px 0px"
        }
    },
    btn: {
        [theme.breakpoints.down("xs")]: {
            margin: "30px 0px 0px 0px"
        }
    }
}))

// COMPONENT
const Filter = ({setActivities, setLoaded}) => {

    // VARIABLES
    const classes = useStyles()
    const {all_groups, weeks, groups_to_subjects, findActivities} = React.useContext(GeneralContext)
    const [selectedGroup, setSelectedGroup] = React.useState("")
    const [selectedSubject, setSelectedSubject] = React.useState("")
    const [selectedPeriod, setSelectedPeriod] = React.useState("")
    const [selectedWeek, setSelectedWeek] = React.useState("")

    // HANDLE CLICK
    async function handleClick(){
        if (selectedGroup === "" || !selectedGroup.trim() || selectedSubject === "" || !selectedSubject.trim() || selectedPeriod === "" || !selectedPeriod.trim() || selectedWeek === "" || !selectedWeek.trim()){
            alert("Para hacer una búsqueda debes de rellenar todos los campos de la filtración.")
            return
        }

        // Find activities
        const activities = await findActivities("student", selectedGroup, selectedSubject, selectedPeriod, selectedWeek)
        console.log("FILTER STUDENT ACTIVITIES RECIVED:", activities)
        setActivities(activities)
        setLoaded(true)
    }

    return (
        <div className="filter">

            <Typography variant="h6" component="h2" style={{marginBottom: "20px"}}>Buscar Actividades</Typography>

            {/* BASIC FILTER */}
            <div className="basic_filter">

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

                {/* SELECT SUBJECT */}
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="select-materia">Materia</InputLabel>
                    <Select native label="Materia" 
                        inputProps={{ name: 'Materia', id: 'select-materia',}}
                        value={selectedSubject}
                        onChange={e => setSelectedSubject(e.target.value)}
                    >
                        <option aria-label="None" value=""/>
                        {selectedGroup !== "" && groups_to_subjects[selectedGroup].map(subject => (<option value={subject} key={subject}>{subject}</option>))}
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
                <Button variant="contained" color="primary" onClick={handleClick} className={classes.btn}>Buscar</Button>

            </div>
        </div>
    )
}

export default Filter

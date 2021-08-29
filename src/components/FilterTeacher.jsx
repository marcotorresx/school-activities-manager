import React from 'react'
import "./FilterTeacher.css"
import { makeStyles } from '@material-ui/core/styles'
import {Button, Typography, FormControl, Select, InputLabel} from '@material-ui/core'
import {GeneralContext} from '../contexts/GeneralContext';
import { UserContext } from '../contexts/UserContext';

// STYLES
const useStyles = makeStyles({
    formControl: {
        width: "160px",
        margin: "0px 20px 0px 0px"
    },
});

// COMPONENT
const FilterTeacher = ({setActivities, setLoaded}) => {

    // VARIABLES
    const classes = useStyles()
    const {weeks, findActivities} = React.useContext(GeneralContext)
    const {activeUser} = React.useContext(UserContext)
    const [selectedGroupAndSubject, setSelectedGroupAndSubject] = React.useState("")
    const [selectedPeriod, setSelectedPeriod] = React.useState("")
    const [selectedWeek, setSelectedWeek] = React.useState("")

    // HANDLE CLICK
    async function handleClick(){
        // Divide group and subject
        const divide_group_subject = selectedGroupAndSubject.split(",")
        const group = divide_group_subject[0]
        const subject = divide_group_subject[1]

        // Validations
        if (group === "" || !group.trim() || subject === "" || !subject.trim() || selectedPeriod === "" || !selectedPeriod.trim() || selectedWeek === "" || !selectedWeek.trim()){
            alert("Para hacer una búsqueda debes de rellenar todos los campos de la filtración.")
            return
        }

        // Find activities
        const activities = await findActivities("teacher", group, subject, selectedPeriod, selectedWeek)
        setActivities(activities)
        setLoaded(true)
    }

    return (
        <div className="filter">

            <Typography variant="h6" component="h2" style={{marginBottom: "20px"}}>Buscar Actividades de Grupo</Typography>

            {/* BASIC FILTER */}
            <div className="basic_filter">

                {/* SELECT GROUP */}
                <FormControl variant="outlined" className={classes.formControl} style={{width: "230px"}}>
                    <InputLabel htmlFor="select-grupo">Grupo</InputLabel>
                    <Select native label="Grupo" 
                        inputProps={{ name: 'Grupo', id: 'select-grupo',}}
                        value={selectedGroupAndSubject}
                        onChange={e => setSelectedGroupAndSubject(e.target.value)}
                    >
                        <option aria-label="None" value=""/>
                        {activeUser?.materias?.map((group, index) => 
                            (<option value={`${group?.grupo},${group?.materia}`} key={index}>{`${group?.grupo} - ${group?.materia}`}</option>)
                        )}
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
                <Button variant="contained" color="primary" onClick={handleClick}>Buscar</Button>

            </div>
        </div>
    )
}

export default FilterTeacher

import React from 'react'
import "./Filter.css"
import { makeStyles } from '@material-ui/core/styles'
import {Button, Typography, FormControl, Select, InputLabel} from '@material-ui/core'
import {GeneralContext} from '../contexts/GeneralContext';

// STYLES
const useStyles = makeStyles({
    formControl: {
        width: "160px",
        margin: "0px 20px 0px 0px"
    },
});

// COMPONENT
const Filter = () => {

    // VARIABLES
    const classes = useStyles()
    const {all_groups, weeks} = React.useContext(GeneralContext)
    const [selectedGroup, setSelectedGroup] = React.useState("")
    const [selectedPeriod, setSelectedPeriod] = React.useState("")
    const [selectedWeek, setSelectedWeek] = React.useState("")

    // HANDLE CLICK
    function handleClick(){
        if (selectedGroup === "" || !selectedGroup.trim() || selectedPeriod === "" || !selectedPeriod.trim() || selectedWeek === "" || !selectedWeek.trim()){
            alert("Para hacer una búsqueda debes de rellenar todos los campos de la filtración.")
            return
        }
        console.log(selectedGroup, selectedPeriod, selectedWeek)
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
                        {all_groups.map(group => (<option value={group} key={group}>{group}</option>))} {/* Load all groups */}
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
                        <option value={"1er Periodo"}>1er Periodo</option>
                        <option value={"2do Periodo"}>2do Periodo</option>
                        <option value={"3er Periodo"}>3er Periodo</option>
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

export default Filter

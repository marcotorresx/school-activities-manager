import React from 'react'
import "./Groups.css"
import { makeStyles } from '@material-ui/core/styles'
import {FormControl, Select, InputLabel, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Paper} from '@material-ui/core'
import {GeneralContext} from '../contexts/GeneralContext'
import {Link} from "react-router-dom"
import { UserContext } from '../contexts/UserContext'

// STYLES
const useStyles = makeStyles({
    filter_title: {
        marginTop: "30px",
        marginLeft: "20px",
        marginBottom: "10px",
        width: "100%"
    },
    formControl: {
        width: "160px",
        margin: "0px 20px 0px 0px"
    },
    tableContainer: {
        margin: "30px 0px",
        width: "100%"
    },
    link: {
        color: "blue"
    }
});

// COMPONENT
const Groups = () => {

    // VARIABLES
    const classes = useStyles()
    const {all_groups, groups_to_subjects} = React.useContext(GeneralContext)
    const {groups_to_teachers} = React.useContext(UserContext)
    const [data, setData] = React.useState([])
    const [selectedGroup, setSelectedGroup] = React.useState("")

    // MAKE TABLE DATA
    function makeData(){
        if (selectedGroup !== ""){
            // Get group subjects
            var group_teachers = []
            groups_to_teachers.forEach(group => {
                if(group.grupo === selectedGroup) group_teachers = group
            })

            // Create array with subject and teacher
            var data = []
            groups_to_subjects[selectedGroup].forEach(subject => {
                data.push({materia: subject, maestro: group_teachers[subject]})
            })
            setData(data)
        }
    }

    // REACT USE EFFECT
    React.useEffect(() => {
        makeData()
    }, [selectedGroup])

    return (
        <div className="admin">
            
            <Typography variant="h6" component="h2" className={classes.filter_title}>Buscar Grupo</Typography>

            {/* ------- ADMIN FILTER ------- */}
            <div className="admin_filter">


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

            </div>

            {/* ------- TABLE ------- */}
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table}>

                    {/* BODY */}
                    <TableBody>

                        {/* HEADERS */}
                        <TableRow key="headers">
                            <TableCell align="left"><b>MATERIA</b></TableCell>
                            <TableCell align="left"><b>MAESTRO</b></TableCell>
                            <TableCell align="left"><b>EDITAR</b></TableCell>
                        </TableRow>

                        {/* SUBJECTS */
                        selectedGroup !== "" && data.map(item => (
                            
                        <TableRow key={item?.materia}>
                            <TableCell align="left" style={{ width: 300 }}>
                                {item?.materia ? item?.materia : "No hay materia"}
                            </TableCell>
                            <TableCell align="left">
                                {item?.maestro ? item?.maestro : "No hay maestro"}
                            </TableCell>
                            <TableCell align="left" style={{ width: 200 }}>
                                <Link 
                                className={classes.link} 
                                to={`/admin/editsubjectteacher/${selectedGroup}/${item?.materia}/${item?.maestro ? item?.maestro : "null"}`}>
                                    Editar Maestro
                                </Link>
                            </TableCell>
                        </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Groups

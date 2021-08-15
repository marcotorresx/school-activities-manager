import React from 'react'
import "./Home.css"
import Filter from '../components/Filter'
import { makeStyles } from '@material-ui/core/styles';
import {TableContainer, Table, TableBody, TableRow, TableCell, Paper} from '@material-ui/core'

// STYLES
const useStyles = makeStyles({
    tableContainer: {
        margin: "30px 0px"
    },
    table: {
        width: "100%"
    }
})

// COMPONENT
const Home = () => {

    const classes = useStyles()

    return (
        <div className="home">
            {/* FILTER */}
            <Filter/>

            {/* ACTIVITIES */}
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table}>

                    {/* BODY */}
                    <TableBody>

                        {/* HEADERS */}
                        <TableRow key="headers">
                            <TableCell align="left"><b>MATERIA</b></TableCell>
                            <TableCell align="left"><b>ACTIVIDAD 1</b></TableCell>
                            <TableCell align="left"><b>ACTIVIDAD 2</b></TableCell>
                            <TableCell align="left"><b>ACTIVIDAD 3</b></TableCell>
                        </TableRow>

                        {/* SUBJECTS */}
                        <TableRow>
                            <TableCell align="center">
                                <p className="home_subject_title">ESPAÑOL</p>
                                <p className="home_subject_teacher">Marco Antonio Torres Sepúlveda</p>
                            </TableCell>
                            <TableCell align="left" style={{ width: 337 }}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati at adipisci beatae cumque quam repellat blanditiis, asperiores quaerat ex ducimus veritatis odit, quod delectus expedita, libero molestias! Tempore, reiciendis in?
                            </TableCell>
                            <TableCell align="left" style={{ width: 337 }}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati at adipisci beatae cumque quam repellat blanditiis, asperiores quaerat ex ducimus veritatis odit, quod delectus expedita, libero molestias! Tempore, reiciendis in?
                            </TableCell>
                            <TableCell align="left" style={{ width: 337 }}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati at adipisci beatae cumque quam repellat blanditiis, asperiores quaerat ex ducimus veritatis odit, quod delectus expedita, libero molestias! Tempore, reiciendis in?
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home

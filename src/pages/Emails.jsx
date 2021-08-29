import React from 'react'
import {TableContainer, Table, TableBody, TableRow, TableCell, Paper, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GeneralContext } from '../contexts/GeneralContext';
import "./Emails.css"

// STYLES
const useStyles = makeStyles({
    title: {
        margin: "25px 0px 0px 0px",
    },
    tableContainer: {
        margin: "30px 0px 30px 0px"
    },
    table: {
        width: "100%",
        whiteSpace: "pre-wrap"
    }
});

// COMPONENT
const Emails = () => {

    // VARIABLES
    const classes = useStyles()
    const {all_users} = React.useContext(GeneralContext)

    return (
        <div className="emails">
            {/* ADDS */}
            <Typography variant="h6" component="h2" align="center" className={classes.title}>CORREOS</Typography>

            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table}>

                    {/* BODY */}
                    <TableBody>

                        {/* HEADERS */}
                        <TableRow key="headers">
                            <TableCell align="left" styles={{minWidth: "170px"}}><b>MAESTRO</b></TableCell>
                            <TableCell align="left"><b>CORREO</b></TableCell>
                        </TableRow>

                        {/* DIRECTIVES */}
                        <TableRow>
                            <TableCell align="left">DIRECCIÓN TURNO MATUTINO</TableCell>
                            <TableCell align="left">contacto.est57matutino@gmail.com</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">DIRECCIÓN TURNO VESPERTINO</TableCell>
                            <TableCell align="left">contacto.est57vespertino@gmail.com</TableCell>
                        </TableRow>

                        { // TEACHERS    user[0] = nombre    user[1] = data
                        all_users?.map((user, index) => user[1]?.tipo === "Maestro" && (
                            <TableRow key={index}>
                                <TableCell align="left">{user[0] ? user[0] : "No disponible"}</TableCell>
                                <TableCell align="left">{user[1]?.correo ? user[1]?.correo : "No disponible"}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Emails

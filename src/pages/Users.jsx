import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Typography, TableContainer, Table, TableBody, TableRow, TableCell, Paper, Button} from '@material-ui/core'
import {Link} from "react-router-dom"
import { GeneralContext } from '../contexts/GeneralContext'
import "./Users.css"

// STYLES
const useStyles = makeStyles({
    title: {
        marginTop: "30px",
        marginLeft: "10px",
        marginBottom: "10px",
        width: "100%"
    },
    tableContainer: {
        margin: "30px 0px",
        width: "100%"
    },
    button:{
        width: "200px"
    },
    link: {
        color: "blue"
    }
});

// COMPONENT
const Users = () => {

    // VARIABLES
    const {all_users} = React.useContext(GeneralContext)
    const classes = useStyles()

    return (
        <div className="users">
            <div className="users_header">
                <Typography variant="h6" component="h2" className={classes.title}>USUARIOS</Typography>
                <Link to="/admin/createuser">
                    <Button variant="contained" color="primary" className={classes.button}>CREAR USUARIO</Button>
                </Link>
            </div>

                {/* ------- TABLE ------- */}
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table}>

                        {/* BODY */}
                        <TableBody>

                            {/* HEADERS */}
                            <TableRow>
                                <TableCell align="left"><b>NOMBRE</b></TableCell>
                                <TableCell align="left"><b>CORREO</b></TableCell>
                                <TableCell align="left"><b>TIPO</b></TableCell>
                                <TableCell align="left"><b>VER USUARIO</b></TableCell>
                            </TableRow>
                            { // RENDER USERS      user[0] = nombre     user[1] = data
                            all_users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{user[0] ? user[0] : "No disponible"}</TableCell>
                                <TableCell align="left" style={{width: 350}}>{user[1]?.correo ? user[1]?.correo : "No disponible"}</TableCell>
                                <TableCell align="left" style={{width: 250}}>{user[1]?.tipo ? user[1]?.tipo : "No disponible"}</TableCell>
                                <TableCell align="left" style={{width: 200}}>
                                    <Link className={classes.link} to={`/admin/user/${user[0] ? user[0] : "No disponible"}`}>Ver Usuario</Link>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    )
}

export default Users

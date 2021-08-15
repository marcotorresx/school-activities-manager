import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Typography, TableContainer, Table, TableBody, TableRow, TableCell, Paper, Button} from '@material-ui/core'
import {Link} from "react-router-dom"
import {db} from "../firebase"
import "./Users.css"
import { GeneralContext } from '../contexts/GeneralContext'

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
    }
});

// COMPONENT
const Users = () => {

    // VARIABLES
    const {all_users} = React.useContext(GeneralContext)
    const classes = useStyles()
    const [teachers, setTeachers] = React.useState([])
    const [directives, setDirectives] = React.useState([])
    const [admins, setAdmins] = React.useState([])
    const [usersLoaded, setUsersLoaded] = React.useState(false)

    // SORT USERS
    async function sortUsers(){

        const teachers = []
        const directives = []
        const admins = []

        all_users.forEach(user => {
            if (user.tipo === "Maestro") teachers.push(user)
            if (user.tipo === "Directivo") directives.push(user)
            if (user.tipo === "Admin") admins.push(user)
        })

        setTeachers(teachers)
        setDirectives(directives)
        setAdmins(admins)
        setUsersLoaded(true)
    }

    // USE EFFECT
    React.useEffect(() => {
        sortUsers()
    }, [])

    return (
        usersLoaded &&
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
                            {teachers.map(teacher => (
                                <TableRow key={teacher.nombre}>
                                    <TableCell align="left">{teacher.nombre}</TableCell>
                                    <TableCell align="left" style={{width: 350}}>{teacher.correo}</TableCell>
                                    <TableCell align="left" style={{width: 250}}>{teacher.tipo}</TableCell>
                                    <TableCell align="left" style={{width: 200}}><Link to={`/admin/user/${teacher.nombre}`}>Ver Usuario</Link></TableCell>
                                </TableRow>
                            ))}
                            {directives.map(directive => (
                                <TableRow key={directive.nombre}>
                                    <TableCell align="left">{directive.nombre}</TableCell>
                                    <TableCell align="left" style={{width: 350}}>{directive.correo}</TableCell>
                                    <TableCell align="left" style={{width: 250}}>{directive.tipo}</TableCell>
                                    <TableCell align="left" style={{width: 200}}><Link to={`/admin/user/${directive.nombre}`}>Ver Usuario</Link></TableCell>
                                </TableRow>
                            ))}
                            {admins.map(admin => (
                                <TableRow key={admin.nombre}>
                                    <TableCell align="left">{admin.nombre}</TableCell>
                                    <TableCell align="left" style={{width: 350}}>{admin.correo}</TableCell>
                                    <TableCell align="left" style={{width: 250}}>{admin.tipo}</TableCell>
                                    <TableCell align="left" style={{width: 200}}><Link to={`/admin/user/${admin.nombre}`}>Ver Usuario</Link></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    )
}

export default Users

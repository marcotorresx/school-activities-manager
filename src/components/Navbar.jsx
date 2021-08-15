import React from 'react'
import {AppBar, Toolbar, Typography, makeStyles, Button} from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {Link} from "react-router-dom"
import MenuBookIcon from '@material-ui/icons/MenuBook';
import "./Navbar.css"
import { UserContext } from '../contexts/UserContext';

// STYLES
const useStyle = makeStyles({
    title: {
        margin: "2px 0px 0px 10px"
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },
    button: {
        margin: "0px 5px"
    },
    icon: {
        marginRight: "10px"
    }
})

// COMPONENT
const Navbar = () => {

    const classes = useStyle()
    const {activeUser, signOut} = React.useContext(UserContext)

    return (
        // APPBAR
        <AppBar position="static">
            {/* TOOLBAR */}
            <Toolbar className={classes.toolbar}>

                {/* RIGHT */}
                <div className="navbar_right">
                    <MenuBookIcon className={classes.icon}/>
                    <Typography variant="h6" className={classes.title}>
                        EST 57 GUILLERMO PRIETO
                    </Typography>
                </div>

                {/* BUTTONS */}
                <div className="navbar_buttons">

                    {/* NO AUTH */}
                    <Link to="/" className="navbar_link">
                        <Button color="inherit" className={classes.button}>ALUMNOS</Button>
                    </Link>
                    <Link to="/adds" className="navbar_link">
                        <Button color="inherit" className={classes.button}>AVISOS</Button>
                    </Link>
                    {!activeUser && 
                    <Link to="/login" className="navbar_link">
                        <Button color="inherit" className={classes.button}>INGRESAR</Button>
                    </Link>}

                    {/* ADMIN */
                    (activeUser && activeUser.tipo === "Admin") &&
                    <>
                        <Link to="/admin/groups" className="navbar_link">
                            <Button color="inherit" className={classes.button}>GRUPOS</Button>
                        </Link><Link to="/admin/users" className="navbar_link">
                            <Button color="inherit" className={classes.button}>USUARIOS</Button>
                        </Link>
                    </>
                    }

                    {/* TEACHERS */
                    (activeUser && activeUser.tipo === "Maestro") &&
                    <Link to="/teacher/myactivities" className="navbar_link">
                        <Button color="inherit" className={classes.button}>MIS ACTIVIDADES</Button>
                    </Link>
                    }

                    {/* DIRECTIVES */
                    (activeUser && activeUser.tipo === "Directivo") &&
                    <Link to="/directives" className="navbar_link">
                        <Button color="inherit" className={classes.button}>DIRECTIVOS</Button>
                    </Link>
                    }

                    {/* ACTIVE USER */
                    activeUser &&
                    <>
                        <Button color="inherit" className={classes.button} onClick={signOut}>CERRAR SESIÓN</Button>
                        <Link to="/myaccount" className="navbar_link">
                            <AccountCircleIcon/>
                        </Link>
                    </>
                    }

                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar

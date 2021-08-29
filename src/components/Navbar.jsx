import React from 'react'
import {AppBar, Toolbar, Typography, makeStyles, Button} from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {Link} from "react-router-dom"
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { UserContext } from '../contexts/UserContext';
import ReorderIcon from '@material-ui/icons/Reorder';
import "./Navbar.css"

// STYLES
const useStyle = makeStyles(theme => ({
    title: {
        margin: "2px 0px 0px 10px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "15px",
        }
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },
    button: {
        margin: "0px 5px",
        [theme.breakpoints.down("xs")]: {
            margin: "4px 0px",
        }
    },
    icon: {
        marginRight: "10px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px",
            marginRight: "5px"
        }
    },
    phonemenubuton: {
        display: "none",
        [theme.breakpoints.down("xs")]: {
            display: "block",
        }
    }
}))

// COMPONENT
const Navbar = () => {

    const classes = useStyle()
    const {activeUser, signOut} = React.useContext(UserContext)
    const [showPhoneMenu, setShowPhoneMenu] = React.useState(false)

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

                {/* CELPHONE MENU BUTTON */}
                <ReorderIcon className={classes.phonemenubuton} onClick={() => setShowPhoneMenu(!showPhoneMenu)}/>

                {/* BUTTONS */}
                <div className={`navbar_buttons ${showPhoneMenu && "show_phone_menu"}`}>

                    {/* NO AUTH */}
                    <Link to="/" className="navbar_link">
                        <Button color="inherit" className={classes.button} onClick={() => setShowPhoneMenu(false)}>ALUMNOS</Button>
                    </Link>
                    <Link to="/adds" className="navbar_link">
                        <Button color="inherit" className={classes.button} onClick={() => setShowPhoneMenu(false)}>AVISOS</Button>
                    </Link>
                    <Link to="/emails" className="navbar_link">
                        <Button color="inherit" className={classes.button} onClick={() => setShowPhoneMenu(false)}>CORREOS</Button>
                    </Link>
                    {!activeUser && 
                    <Link to="/login" className="navbar_link">
                        <Button color="inherit" className={classes.button} onClick={() => setShowPhoneMenu(false)}>INGRESAR</Button>
                    </Link>}

                    {/* ADMIN */
                    (activeUser && activeUser.tipo === "Admin") &&
                    <>
                        <Link to="/admin/groups" className="navbar_link">
                            <Button color="inherit" className={classes.button}>GRUPOS</Button>
                        </Link>
                        <Link to="/admin/groupactivities" className="navbar_link">
                            <Button color="inherit" className={classes.button}>ACTIVIDADES</Button>
                        </Link>
                        <Link to="/admin/users" className="navbar_link">
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

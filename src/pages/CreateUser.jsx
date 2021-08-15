import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Card, CardContent, Typography, Button} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import EmailIcon from '@material-ui/icons/Email'
import StorageIcon from '@material-ui/icons/Storage'
import LockIcon from '@material-ui/icons/Lock'
import "./CreateUser.css"
import { AdminContext } from '../contexts/AdminContext'

// STYLES
const useStyles = makeStyles({
    card: {
        margin: "40px 0px",
        width: "550px",
        padding: "10px",
        position: "relative"
    },
    title: {
        margin: "0px 0px 25px 0px",
    },
    button: {
        margin: "20px 0px 0px 0px",
    },
    cardcontent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});

// COMPONENT
const CreateUser = () => {

    // VARIBALES
    const classes = useStyles()
    const {createUser} = React.useContext(AdminContext)
    const [nombre, setNombre] = React.useState("")
    const [correo, setCorreo] = React.useState("")
    const [contra, setContra] = React.useState("")
    const [tipo, setTipo] = React.useState("")

    // CLICK HANDLER
    function clickHandler(){
        // Validations
        if (nombre === "" || !nombre.trim() || correo === "" || !correo.trim() || tipo === "" || !tipo.trim()|| contra === "" || !contra.trim()){
            alert("Para crear un usuario todos los campos deben de estar llenos.")
            return
        }

        // Create User
        createUser(nombre, correo, contra, tipo)

        // Clean Fields
        setNombre("")
        setCorreo("")
        setContra("")
        setTipo("")
    }
    
    return (
        <div>
            <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                    {/* TITULO */}
                    <Typography variant="h6" component="h2" className={classes.title} align="center">CREAR USUARIO</Typography>

                    {/* FIELDS */}
                    <div className="account_fields">
                        <div className="create_details_field">
                            <PersonIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Nombre: </b>
                            </Typography>
                            <input type="text" className="create_account_input" value={nombre} onChange={e => setNombre(e.target.value)}/>
                        </div>
                        <div className="create_details_field">
                            <EmailIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Correo: </b>
                            </Typography>
                            <input type="text" className="create_account_input" value={correo} onChange={e => setCorreo(e.target.value)}/>
                        </div>
                        <div className="create_details_field">
                            <LockIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Contraseña: </b>
                            </Typography>
                            <input type="text" className="create_account_input" value={contra} onChange={e => setContra(e.target.value)}/>
                        </div>
                        <div className="create_details_field">
                            <StorageIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Tipo: </b>
                            </Typography>
                            <select type="text" className="create_account_input" value={tipo} onChange={e => setTipo(e.target.value)}>
                                <option value=""></option>
                                <option value="Maestro">Maestro</option>
                                <option value="Directivo">Directivo</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <Button className={classes.button} variant="contained" color="primary" onClick={clickHandler}>CREAR USUARIO</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateUser

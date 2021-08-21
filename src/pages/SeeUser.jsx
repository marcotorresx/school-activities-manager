import React from 'react'
import {useParams} from "react-router-dom"
import {db} from "../firebase"
import {Card, CardContent, Typography, Button} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import EmailIcon from '@material-ui/icons/Email'
import StorageIcon from '@material-ui/icons/Storage'
import BookIcon from '@material-ui/icons/Book'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { makeStyles } from '@material-ui/core/styles'
import "./SeeUser.css"
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
        margin: "30px 0px 0px 0px",
    },
    cardcontent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});

// COMPONENT
const SeeUser = () => {

    const classes = useStyles()
    const {deleteUser} = React.useContext(AdminContext)
    const {username} = useParams()
    const [user, setUser] = React.useState({})
    const [userLoaded, setUserLoaded] = React.useState(false)

    // GET USER
    async function getUser(){
        try{
            const res = await db.collection("Usuarios").doc(username).get()
            if (!res.exists) {
                alert("Hubo un error en la carga del usuario en la base de datos.")
                return
            }
            setUser(res.data())
            setUserLoaded(true)
        }
        catch(error){
            alert("Hubo un error en la carga del usuario en la base de datos.")
            console.log("SEE USER ERROR:", error)
        }
    }

    // CLICK HANDLER
    function clickHandler(){
        const confirm = window.confirm("¿Estás seguro de querer eliminar este usuario?")
        if (confirm) deleteUser(user)
    }

    // USE EFFECT
    React.useEffect(() => {
        getUser()
    }, [])

    return (
        userLoaded &&
        <div>
            <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                    {/* TITULO */}
                    <Typography variant="h6" component="h2" className={classes.title} align="center">CUENTA DE USUARIO</Typography>

                    {/* FIELDS */}
                    <div className="account_fields">
                        <div className="details_field">
                            <PersonIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Nombre: </b> {user?.nombre ? user?.nombre : "No disponible"}
                            </Typography>
                        </div>
                        <div className="details_field">
                            <EmailIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Correo: </b> {user?.correo ? user?.correo : "No disponible"}
                            </Typography>
                        </div>
                        <div className="details_field">
                            <StorageIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Tipo: </b> {user?.tipo ? user?.tipo : "No disponible"}
                            </Typography>
                        </div>
                        { user?.turno &&
                        <div className="details_field">
                            <AccessTimeIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Turno: </b> {user?.turno ? user?.turno : "No disponible"}
                            </Typography>
                        </div>}
                        
                        { user?.materias &&
                        <div className="details_field">
                            <BookIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Materias: </b>
                                <ul className="materias_list">
                                    {user?.materias.map((item, index) => (
                                        <li className="materias_item" key={index}>{`${item?.grupo} - ${item?.materia}`}</li>
                                    ))}
                                </ul>
                            </Typography>
                        </div>}
                    </div>
                    
                    {/* DELETE BUTTON */}
                    <Button variant="outlined" color="secondary" size="small" className={classes.button} onClick={clickHandler}>Borrar Usuario</Button>

                </CardContent>
            </Card>
        </div>
    )
}

export default SeeUser

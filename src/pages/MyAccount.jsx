import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { UserContext } from '../contexts/UserContext'
import {useHistory} from "react-router"
import {Card, CardContent, Typography} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import EmailIcon from '@material-ui/icons/Email'
import StorageIcon from '@material-ui/icons/Storage'
import BookIcon from '@material-ui/icons/Book'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import "./MyAccount.css"

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
        margin: "30px 10px 0px 0px",
    },
    cardcontent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});

// COMPONENT
const MyAccount = () => {

    const classes = useStyles()
    const [userChecked, setUserChecked] = React.useState(false)
    const {activeUser} = React.useContext(UserContext)
    const history = useHistory()

    // USE EFFECT
    React.useEffect(() => {
        // Check User
        if (activeUser) setUserChecked(true)
        else history.push("/")
    }, [activeUser, history])

    return (
        userChecked && 
        <div>
            <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                    {/* TITULO */}
                    <Typography variant="h6" component="h2" className={classes.title} align="center">MI PERFIL</Typography>

                    {/* FIELDS */}
                    <div className="account_fields">
                        <div className="details_field">
                            <PersonIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Nombre: </b> {activeUser?.nombre ? activeUser?.nombre : "No disponible"}
                            </Typography>
                        </div>
                        <div className="details_field">
                            <EmailIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Correo: </b> {activeUser?.correo ? activeUser?.correo : "No disponible"}
                            </Typography>
                        </div>
                        <div className="details_field">
                            <StorageIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Tipo: </b> {activeUser?.tipo ? activeUser?.tipo : "No disponible"}
                            </Typography>
                        </div>
                        { activeUser?.turno &&
                        <div className="details_field">
                            <AccessTimeIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Turno: </b> {activeUser?.turno ? activeUser?.turno : "No disponible"}
                            </Typography>
                        </div>}
                        { activeUser?.materias &&
                        <div className="details_field">
                            <BookIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Materias: </b>
                                <ul className="materias_list">
                                    {activeUser?.materias.map((item, index) => (
                                        <li className="materias_item" key={index}>{`${item?.grupo} - ${item?.materia}`}</li>
                                    ))}
                                </ul>
                            </Typography>
                        </div>
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default MyAccount

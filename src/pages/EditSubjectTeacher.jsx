import React from 'react'
import "./EditSubjectTeacher.css"
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from "react-router-dom"
import {Card, CardContent, Typography, Button} from '@material-ui/core';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import BookIcon from '@material-ui/icons/Book';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { AdminContext } from '../contexts/AdminContext';
import { UserContext } from '../contexts/UserContext';
import {useHistory} from "react-router"

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
        margin: "20px 10px 0px 0px",
    },
    cardcontent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});

// CONSTANTS
const groups_matutino = ["1A", "1B", "1C", "1D", "1E", "2A", "2B", "2C", "2D", "2E", "3A", "3B", "3C", "3D", "3E"]
const groups_vespertino = ["1F", "1G", "1H", "2F", "2G", "2H", "3F", "3G", "3H"]

// COMPONENT
const EditSubjectTeacher = () => {

    // VARIABLES
    const classes = useStyles()
    const {activeUser, all_users} = React.useContext(UserContext)
    const {changeTeacherOfSubject} = React.useContext(AdminContext)
    const {group, sub, teach} = useParams()
    const [subject, setSubject] = React.useState("")
    const [teacher, setTeacher] = React.useState("")
    const [selectedTeacher, setSelectedTeacher] = React.useState("null")
    const [cleaned, setCleaned] = React.useState(false)
    const [btnDisabled, setBtnDisabled] = React.useState(false)
    const history = useHistory()

    // CHECK ADMIN TURN
    function checkAdminTurn(){
        // Check group type
        var group_type = null
        if (groups_matutino.includes(group)) group_type = "Matutino"
        if (groups_vespertino.includes(group)) group_type = "Vespertino"

        // Check if turns are equal
        if (activeUser?.turno !== group_type){
            alert("Usted no es administrador de este turno, no puede hacer cambios en este turno.")
            history.push("/admin/groups")
        }
    }

    // CLEAN PARAMS
    function cleanParams(){
        setSubject(sub.replace("%20", " "))
        setTeacher((!teach || teach === "null") ? null : teach.replace("%20", " "))
        setSelectedTeacher(teach.replace("%20", " "))
        setCleaned(true)
    }

    // HANDLE CLICK
    function handleClick(){
        setBtnDisabled(true)
        if (selectedTeacher === "null") changeTeacherOfSubject(group, subject, teacher, null)
        else changeTeacherOfSubject(group, subject, teacher, selectedTeacher)
    }

    // USE EFFECT
    React.useEffect(() => {
        checkAdminTurn()
        cleanParams()
    }, [])

    return (
        cleaned && 
        <div className="edit_subject_teacher">
            <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                    {/* TITULO */}
                    <Typography variant="h6" component="h2" className={classes.title} align="center">CAMBIAR MAESTRO</Typography>

                    {/* FIELDS */}
                    <div className="account_fields">
                        <div className="details_field">
                            <SupervisedUserCircleIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Grupo: </b> {group}
                            </Typography>
                        </div>
                        <div className="details_field">
                            <BookIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Materia: </b> {subject}
                            </Typography>
                        </div>
                        <div className="details_field">
                            <AssignmentIndIcon />
                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                <b>Maestro: </b>
                            </Typography>
                            <select className="edit_subject_teacher_select" 
                                value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)}
                            >
                                <option value="null"></option>
                                {all_users.map(user => user?.tipo === "Maestro" && (
                                    <option value={user?.nombre} key={user?.nombre}>{user?.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Button variant="contained" color="primary" className={classes.button} disabled={btnDisabled} onClick={handleClick}>Guardar Cambios</Button>

                </CardContent>
            </Card>
        </div>
    )
}

export default EditSubjectTeacher

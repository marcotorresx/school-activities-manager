import React from 'react'
import "./EditSubjectTeacher.css"
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from "react-router-dom"
import {Card, CardContent, Typography, Button} from '@material-ui/core';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import BookIcon from '@material-ui/icons/Book';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { GeneralContext } from '../contexts/GeneralContext';
import { AdminContext } from '../contexts/AdminContext';

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

// COMPONENT
const EditSubjectTeacher = () => {

    // VARIABLES
    const classes = useStyles()
    const {all_users} = React.useContext(GeneralContext)
    const {changeTeacherOfSubject} = React.useContext(AdminContext)
    const {group, sub, teach} = useParams()
    const [subject, setSubject] = React.useState(sub)
    const [teacher, setTeacher] = React.useState(teach)
    const [selectedTeacher, setSelectedTeacher] = React.useState("null")
    const [cleaned, setCleaned] = React.useState(false)

    // CLEAN PARAMS
    function cleanParams(){
        setSubject(subject.replace("%20", " "))
        setTeacher((teacher && teacher !== "null") ? teacher.replace("%20", " ") : null)
        setSelectedTeacher(teacher.replace("%20", " "))
        setCleaned(true)
    }

    // HANDLE CLICK
    function handleClick(){
        if (selectedTeacher === "null") changeTeacherOfSubject(group, subject, teacher, null)
        else changeTeacherOfSubject(group, subject, teacher, selectedTeacher)
    }

    // USE EFFECT
    React.useEffect(() => {
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
                                {all_users.map(user => user.tipo === "Maestro" && (
                                    <option value={user.nombre} key={user.nombre}>{user.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Button variant="contained" color="primary" className={classes.button} onClick={handleClick}>Guardar Cambios</Button>

                </CardContent>
            </Card>
        </div>
    )
}

export default EditSubjectTeacher

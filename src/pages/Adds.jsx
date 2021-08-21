import React from 'react'
import {Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { UserContext } from '../contexts/UserContext'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import CreateAdd from '../components/CreateAdd'
import { GeneralContext } from '../contexts/GeneralContext'
import {db} from "../firebase"
import "./Adds.css"
const dateFormat = require("dateformat")

// STYLES
const useStyles = makeStyles({
    title: {
        margin: "25px 0px 0px 0px",
    },
    button: {
        margin: "10px 0px 0px 10px"
    },
    noadds: {
        color: "gray"
    }
});

// COMPONENT
const Adds = () => {

    // VARIABLES
    const calsses = useStyles()
    const {activeUser} = React.useContext(UserContext)
    const {adds, setAdds} = React.useContext(GeneralContext)
    const [isDirective, setIsDirective] = React.useState(false)
    const [checkedUser, setCheckedUser] = React.useState(false)
    const [newAddSection, setNewAddSection] = React.useState(false)

    // CHECK USER
    function checkUser(){
        if (activeUser && activeUser?.tipo === "Directivo") setIsDirective(true)
        else setIsDirective(false)
        setCheckedUser(true)
    }

    // DELETE ADD
    async function deleteAdd(id){
        try{
            const confirm = window.confirm("¿Estas seguro que quieres eliminar este aviso?")
            if (confirm){
                await db.collection("Avisos").doc(id).delete()
                const filter_adds = adds.filter(add => add?.id !== id)
                setAdds(filter_adds)
            }
        }
        catch(error){
            console.log("DELETE ADD ERROR:", error)
        }
    }

    // USE EFFECT
    React.useEffect(() => {
        checkUser()
    }, [activeUser])

    return (
        checkedUser &&
        <div className="adds">

            {/* ADDS */}
            <Typography variant="h6" component="h2" align="center" className={calsses.title}>AVISOS</Typography>
            
            {/* CREATE NEW ADD SECTION */
            newAddSection && isDirective && <CreateAdd setNewAddSection={setNewAddSection}/>}

            {/* OPEN NEW ADD SECTION BTN */
            !newAddSection && isDirective && <Button variant="contained" color="primary" className={calsses.button} onClick={() => setNewAddSection(true)}>Nuevo Aviso</Button>
            }
            
            <div className="adds_container">
                {
                // If there are adds
                adds?.length > 0 ? adds.map(add => (
                <div className="add_container" key={add?.id}>
                    <p className="add_date">{add?.data().date ? dateFormat(new Date(add?.data().date.toDate()), "fullDate") : "No disponible"}</p>
                    <p className="add_content">{add?.data().add ? add?.data().add : "No disponible"}</p>
                    {isDirective && <HighlightOffIcon onClick={() => deleteAdd(add?.id)}/>}
                </div>
                ))  
                : // If there are not adds
                <Typography variant="subtitle2" component="h2" align="center" className={calsses.noadds}>No hay avisos</Typography>
                }
            </div>
        </div>
    )
}

export default Adds

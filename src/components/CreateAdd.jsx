import React from 'react'
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {db} from "../firebase"
import { GeneralContext } from '../contexts/GeneralContext'
import shortid from "shortid"

// STYLES
const useStyles = makeStyles({
    button: {
        marginLeft: "40px",
    }
});

// COMPONENT
const CreateAdd = ({setNewAddSection}) => {

    // VARIABLES
    const calsses = useStyles()
    const {getInitialData} = React.useContext(GeneralContext)
    const [newAddValue, setNewAddValue] = React.useState("")

    // CREATE NEW ADD
    async function createNewAdd(){
        // Validations
        if (newAddValue === "" || !newAddValue.trim()){
            alert("Los avisos deben contener un mensaje.")
            return
        }
        try{
            // Create object
            const newID = shortid.generate()
            const newObject = {}
            newObject[newID] = { 
                add: newAddValue,
                date: new Date()
            }

            // Set data on DB
            await db.collection("Datos Iniciales").doc("Avisos").update(newObject)
            getInitialData()
            
            // Close section
            setNewAddSection(false)
        }
        catch(error){
            console.log("CREATE NEW ADD:", error)
        }
    }

    return (
        <div className="create_add_container">
            <textarea value={newAddValue} onChange={e => setNewAddValue(e.target.value)} className="new_add_textarea"></textarea>
            <Button variant="contained" color="primary" className={calsses.button} onClick={createNewAdd}>Crear Aviso</Button>
        </div>
    )
}

export default CreateAdd

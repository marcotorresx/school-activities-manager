import React from 'react'
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {db} from "../firebase"
import Adds from '../pages/Adds';
import { GeneralContext } from '../contexts/GeneralContext';

// STYLES
const useStyles = makeStyles({
    button: {
        marginLeft: "30px",
    }
});

// COMPONENT
const CreateAdd = ({setNewAddSection}) => {

    // VARIABLES
    const calsses = useStyles()
    const {getAdds} = React.useContext(GeneralContext)
    const [newAddValue, setNewAddValue] = React.useState("")

    // CREATE NEW ADD
    async function createNewAdd(){
        try{
            // Create object
            const new_add_object = {
                add: newAddValue,
                date: new Date()
            }

            // Set data on DB
            await db.collection("Avisos").add(new_add_object)
            getAdds()
            
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

import React from 'react'
import {db} from "../firebase"
import {useHistory} from "react-router"

export const UserContext = React.createContext()

const UserProvider = ({children}) => {

    // VARIABLES
    const [activeUser, setActiveUser] = React.useState({
        nombre: "Marco Torres",
        tipo: "Admin",
        correo: "marcotorres@gmail.com",
        materias: [{grupo: "1F", materia: "Matemáticas"}, {grupo: "2G", materia: "Inglés"}]
    })
    const history = useHistory()

    // LOGIN
    async function login(email, password){
        try{
            const res = await db.collection("Usuarios").where("correo", "==", email).get()
            
            // Check if the document exists 
            if (res.docs.length === 0) return ("El correo ingresado no está registrado.")

            // Check if passwords are equal
            const userDB = res.docs[0].data()
            
            // If passwords are equal set user and go to my activities
            if (userDB.contra === password){
                const {contra, ...others} = userDB
                setActiveUser(others)
                history.push("/")
            }

            // If there are not equarl return error
            else return ("La contraseña que ingresaste no es correcta.")
        }
        catch(error){
            console.log("LOGIN ERROR:", error)
            return error.message
        }
    }

    // SIGN OUT
    function signOut(){
        setActiveUser(null)
    }
    

    return (
        <UserContext.Provider value={{ activeUser, login, signOut }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

import React from 'react'
import {db} from "../firebase"
import {useHistory} from "react-router"

export const UserContext = React.createContext()

const UserProvider = ({children}) => {

    // VARIABLES
    const [activeUser, setActiveUser] = React.useState(null)
    const [groups_to_teachers, set_groups_to_teachers] = React.useState([])
    const [checkedUser, setCheckedUser] = React.useState(false) 
    const history = useHistory()

    // LOGIN
    async function login(email, password){
        try{
            const res = await db.collection("Usuarios").where("correo", "==", email).get()
            
            // Check if the document exists 
            if (res.docs.length === 0) return ("El correo ingresado no está registrado.")
            if (res.docs.length > 1) return ("Hay varios cuentas registradas con ese correo, contacta a un administrador.")

            const userDB = res.docs[0].data()
            
            // Check if passwords are equal
            if (userDB.contra !== password) return ("La contraseña que ingresaste no es correcta.")

            // Special user functions
            if (userDB?.tipo === "Admin") getAdminData()
            if (userDB?.tipo === "Maestro") userDB.materias = userDB?.materias.sort((a,b) => {
                if (a?.grupo < b?.grupo) return -1
                if (a?.grupo > b?.grupo) return 1
                return 0
            })

            // Set user and go to my activities
            const {contra, ...others} = userDB
            setActiveUser(others)
            localStorage.setItem("user_est_57", JSON.stringify(others))
            history.push("/")
            
        }
        catch(error){
            console.log("LOGIN ERROR:", error)
            return error.message
        }
    }

    // SIGN OUT
    function signOut(){
        localStorage.removeItem("user_est_57");
        setActiveUser(null)
    }

    // GET ADMIN DATA
    async function getAdminData(){
        try{
            // Get groups to teachers
            const res_groups = await db.collection("Grupos - Maestros").get()
            set_groups_to_teachers(res_groups.docs.map(doc => doc.data()))
        }
        catch(error){
            alert("Hubo un error con la carga de datos de administrador.")
            console.log("GET ADMIN DATA ERROR:", error)
        }
    }

    // CHECK USER
    function checkUser(){
        const user = JSON.parse(localStorage.getItem("user_est_57"))
        if (user) setActiveUser(user)
        if (user?.tipo === "Admin") getAdminData()
        setCheckedUser(true)
    }

    // USE EFFECT
    React.useEffect(checkUser, [])     
    

    return (
        checkedUser &&
        <UserContext.Provider value={{ activeUser, login, signOut, groups_to_teachers}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

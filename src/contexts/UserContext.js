import React from 'react'
import {db} from "../firebase"
import {useHistory} from "react-router"

export const UserContext = React.createContext()

const UserProvider = ({children}) => {

    // VARIABLES
    const [activeUser, setActiveUser] = React.useState(null)
    const [groups_to_teachers, set_groups_to_teachers] = React.useState([])
    const [all_users, set_all_users] = React.useState([])
    const [checkedUser, setCheckedUser] = React.useState(false) 
    const history = useHistory()

    // LOGIN
    async function login(email, password){
        try{
            const res = await db.collection("Usuarios").where("correo", "==", email).get()
            
            // Check if the document exists 
            if (res.docs.length === 0) return ("El correo ingresado no está registrado.")
            if (res.docs.length > 1) return ("Hay varios cuentas registradas con ese correo, contacta a un administrador.")

            // Check if passwords are equal
            const userDB = res.docs[0].data()
            
            // If passwords are equal set user and go to my activities
            if (userDB.contra === password){
                const {contra, ...others} = userDB
                setActiveUser(others)
                localStorage.setItem("user", JSON.stringify(others))
                if (userDB?.tipo === "Admin") getAdminData()
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
        localStorage.removeItem("user");
        setActiveUser(null)
    }

    // GET DATA
    async function getAdminData(){
        console.log("GET ADMIN")
        try{
                // Get groups to teachers
                const res_groups = await db.collection("Grupos - Maestros").get()
                set_groups_to_teachers(res_groups.docs.map(doc => doc.data()))

                // Get all users
                const res_users = await db.collection("Usuarios").get()
                set_all_users(res_users.docs.map(doc => doc.data()))
        }
        catch(error){
            console.log("GET ADMIN DATA ERROR:", error)
        }
    }

    // CHECK USER
    function checkUser(){
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) setActiveUser(user)
        if (user?.tipo === "Admin") getAdminData()
        setCheckedUser(true)
    }

    // USE EFFECT
    React.useEffect(() => {
        checkUser()
    }, [])     
    

    return (
        checkedUser &&
        <UserContext.Provider value={{ activeUser, login, signOut, groups_to_teachers, all_users, set_all_users }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

import React from 'react'
import {db, firebase} from "../firebase"
import {useHistory} from "react-router"
import { UserContext } from './UserContext'
import { GeneralContext } from './GeneralContext'

export const AdminContext = React.createContext()

const AdminProvider = ({children}) => {

    const {groups_to_teachers} = React.useContext(UserContext)
    const {all_users, set_all_users, groups_to_subjects} = React.useContext(GeneralContext)
    const history = useHistory()

    // CREATE USER
    async function createUser(nombre, correo, contra, tipo, turno){
        try{
            // Create user in DB collection
            var newCollObject = {}
            if (tipo === "Maestro") newCollObject = {nombre, correo, contra, tipo, materias: []}
            else if (tipo === "Admin") newCollObject = {nombre, correo, contra, tipo, turno}
            else newCollObject = {nombre, correo, contra, tipo}

            await db.collection("Usuarios").doc(nombre).set(newCollObject)

            // Create User in DB doc
            const newDocObject = {}
            newDocObject[nombre] = {correo, tipo}
            await db.collection("Datos Iniciales").doc("Usuarios").update(newDocObject)

            // Add user to context
            const newUserArray = [nombre, {correo, tipo}]
            set_all_users([...all_users, newUserArray])

            alert("Usuario creado existosamente.")
        }
        catch(error){
            alert("Ocurrió un error en la creación del usuario.")
            console.log("CREATE USER ERROR:", error)
        }
    }

    // CHANGE TEACHER OF SUBJECT
    async function changeTeacherOfSubject(group, subject, lastTeacher, selectedTeacher){
        try{
            // Change last user
            if (lastTeacher){
                // Get user
                const res = await db.collection("Usuarios").doc(lastTeacher).get()
                const user = res.data()

                // Change it on DB
                const newSubjects = user?.materias.filter(item => !(item?.grupo === group && item?.materia === subject))
                await db.collection("Usuarios").doc(lastTeacher).update({materias: newSubjects})
            }

            // Change selected user
            if (selectedTeacher){
                // Get user
                const res = await db.collection("Usuarios").doc(selectedTeacher).get()
                const user = res.data()

                // Change it on DB
                const newSubjects = [...user?.materias, {grupo: group, materia: subject}]
                await db.collection("Usuarios").doc(selectedTeacher).update({materias: newSubjects})
            }

            // Make change on the group - subject matrix
            groups_to_teachers.forEach(async group_to_teacher => {
                // Find group
                if (group_to_teacher.grupo === group){
                    // Change DB
                    const newObject = {}
                    newObject[subject] = selectedTeacher
                    await db.collection("Grupos - Maestros").doc(group).update(newObject)
                    
                    // Change Context
                    group_to_teacher[subject] = selectedTeacher
                }
            })
            history.push("/admin/groups")
        }
        catch(error){
            alert("Ha ocurrido un error en el cambio de maestro.")
            console.log("CHANGE TEACHER OF SUBJECT ERROR:", error)
        }
    }

    // DELETE USER
    async function deleteUser(user){
        try{
            // Change subjects teacher in Context and DB
            if(user?.materias){
                user?.materias?.forEach(grupo_materia => {
                    // For each group of group and subject
                    groups_to_teachers.forEach(async group_teacher => {
                        // Find in Context the group
                        if (group_teacher.grupo === grupo_materia.grupo){
                            // Change in Context
                            group_teacher[grupo_materia.materia] = null

                            // Change in DB
                            const newObject = {}
                            newObject[grupo_materia.materia] = null
                            await db.collection("Grupos - Maestros").doc(grupo_materia.grupo).update(newObject)
                        }
                    })
                })
            }
            
            // Delete user from DB Collection
            await db.collection("Usuarios").doc(user?.nombre).delete()

            // Delte user from Doc
            const newObject = {}
            newObject[user?.nombre] = firebase.firestore.FieldValue.delete()
            await db.collection("Datos Iniciales").doc("Usuarios").update(newObject)

            // Delete user in Context
            set_all_users(all_users.filter(userItem => userItem[0] !== user?.nombre))

            history.push("/admin/users")
        }
        catch(error){
            console.log("DELTE USER ERROR:", error)
        }
    }

    // FIND GROUP ACTIVITIES
    function findGroupActivities(group, period, week){
        const data = []
        try{
            // For each subject of the selected group
            groups_to_subjects[group].forEach(async subject => {
                // Search the avtivities in of the subject
                const res = await db.collection(group).doc(subject).collection(period).doc(week).get()
                // If res not exists
                if (!res.exists) {
                    const empty_object = {
                        act1: null,
                        act2: null,
                        act3: null,
                        maestro: "No registrado",
                        materia: subject,
                        grupo: group,
                        periodo: period,
                        semana: week
                    }
                    data.push(empty_object)
                }
                // Else return the DB data
                else data.push(res.data())
            })
            
            // Return the array with all the objects of each subject
            return data
        }
        catch(error){
            console.log("FIND GROUP ACTIVITIES ERROR:", error)
            return []
        }
    }

    return (
        <AdminContext.Provider value={{ createUser, changeTeacherOfSubject, deleteUser, findGroupActivities }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminProvider
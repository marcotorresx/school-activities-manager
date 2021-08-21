import React from 'react'
import {db} from "../firebase"
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
            var new_user = {}
            if (tipo === "Maestro") new_user = {nombre, correo, contra, tipo, materias: []}
            else if (tipo === "Admin") new_user = {nombre, correo, contra, tipo, turno}
            else new_user = {nombre, correo, contra, tipo}

            // Create user in DB
            await db.collection("Usuarios").doc(nombre).set(new_user)

            // Add user to context
            set_all_users([...all_users, new_user])

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
                all_users.forEach(async user => {
                    // Find teacher
                    if (user.nombre === lastTeacher){
                        // Filter subjects
                        const filtered_subjects = user?.materias.filter(lt_subject => 
                            !(lt_subject?.grupo === group && lt_subject?.materia === subject))
                        // Set subjects in DB
                        await db.collection("Usuarios").doc(lastTeacher).update({materias: filtered_subjects})
                        // Set subjects in context
                        user.materias = filtered_subjects
                    }
                })
            }
            // Change selected user
            if (selectedTeacher){
                all_users.forEach(async user => {
                    // Find teacher
                    if (user?.nombre === selectedTeacher){
                        // Create new subjects
                        const new_subject = {grupo: group, materia: subject}
                        const new_teacher_subjects = [...user?.materias, new_subject]
                        // Set subject in DB
                        await db.collection("Usuarios").doc(selectedTeacher).update({materias: new_teacher_subjects})
                        // Set subjects in context
                        user.materias = new_teacher_subjects
                    }
                })
            }
            // Make change on the group - subject matrix
            var selected_group = {}
            groups_to_teachers.forEach(group_to_teacher => {
                // Find group
                if (group_to_teacher.grupo === group) {
                    selected_group = group_to_teacher
                }
            })
            // Change teacher
            selected_group[subject] = selectedTeacher
            // Set new group data in DB
            await db.collection("Grupos - Maestros").doc(group).set(selected_group)

            // Send to Groups
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
            if(user.materias){
                user.materias.forEach(grupo_materia => {
                    groups_to_teachers.forEach(async group_teacher => {
                        if (group_teacher.grupo === grupo_materia.grupo){
                            group_teacher[grupo_materia.materia] = null
                            await db.collection("Grupos - Maestros").doc(grupo_materia.grupo).set(group_teacher)
                        }
                    })
                })
            }
            
            // Delete user from DB
            await db.collection("Usuarios").doc(user.nombre).delete()
            set_all_users(all_users.filter(user_item => user_item.nombre !== user.nombre))

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
            groups_to_subjects[group].forEach(async subject => {
                const res = await db.collection(group).doc(subject).collection(period).doc(week).get()
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
                else data.push(res.data())
            })
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
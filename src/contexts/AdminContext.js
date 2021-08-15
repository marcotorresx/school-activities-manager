import React from 'react'
import {db} from "../firebase"
import { GeneralContext } from './GeneralContext'
import {useHistory} from "react-router"

export const AdminContext = React.createContext()

const AdminProvider = ({children}) => {

    const {all_users, set_all_users, groups_to_teachers} = React.useContext(GeneralContext)
    const history = useHistory()

    // CREATE USER
    async function createUser(nombre, correo, contra, tipo){
        try{
            var new_user = {}
            if (tipo === "Maestro") new_user = {nombre, correo, contra, tipo, materias: []}
            else new_user = {nombre, correo, contra, tipo}

            // Create user in DB
            await db.collection("Usuarios").doc(nombre).set(new_user)

            // Add user to context
            set_all_users([...all_users, new_user])

            alert("Usuario creado existosamente.")
        }
        catch(error){
            alert("Ocurrió un error en la creación del usuario.")
            console.log("CREATE USER ERROR", error)
        }
    }

    // CHANGE TEACHER OF SUBJECT
    async function changeTeacherOfSubject(group, subject, lastTeacher, selectedTeacher){
        try{
            // Change last user
            if (lastTeacher){
                all_users.forEach(async user => {
                    if (user.nombre === lastTeacher){
                        const filtered_subjects = user.materias.filter(last_teacher_subject => !(last_teacher_subject.grupo === group && last_teacher_subject.materia === subject))
                        user.materias = filtered_subjects
                        await db.collection("Usuarios").doc(lastTeacher).update({materias: filtered_subjects})
                    }
                })
            }
            // Change selected user
            if (selectedTeacher){
                all_users.forEach(async user => {
                    if (user.nombre === selectedTeacher){
                        const new_subject = {grupo: group, materia: subject}
                        const new_teacher_subjects = [...user.materias, new_subject]
                        user.materias = new_teacher_subjects
                        await db.collection("Usuarios").doc(selectedTeacher).update({materias: new_teacher_subjects})
                    }
                })
            }
            // Make change on the group - subject matrix
            var selected_group = {}
            groups_to_teachers.forEach(group_to_teacher => {
                if (group_to_teacher.grupo === group) {
                    selected_group = group_to_teacher
                }
            })
            selected_group[subject] = selectedTeacher
            await db.collection("Grupos - Maestros").doc(group).set(selected_group)

            // Send to Groups
            history.push("/admin/groups")
        }
        catch(error){
            alert("Ha ocurrido un error en el cambio de maestro.")
            console.log("CHANGE TEACHER OF SUBJECT ERROR:", error)
        }
    }

    return (
        <AdminContext.Provider value={{ createUser, changeTeacherOfSubject }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminProvider
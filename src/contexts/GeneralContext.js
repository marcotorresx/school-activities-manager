import React from 'react'
import {db} from "../firebase"

export const GeneralContext = React.createContext()

const GeneralProvider = ({children}) => {

    // VARIABLES
    const [groups_to_teachers, set_groups_to_teachers] = React.useState([])
    const [all_users, set_all_users] = React.useState([])

    // STATIC VARIABLES
    const all_groups = ["1F", "1G", "1H", "2F", "2G", "2H", "3F", "3G", "3H"]
    const groups_to_subjects = {
        "1F": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "F.C. y E.", "Vida Saludable", 
                "Edu. Física", "Inglés", "Biología", "Geografía", "Mecánica", "Ind. del Vestido", "Robótica", "Carpintería"],
        
        "1G": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "F.C. y E.", "Vida Saludable", 
                "Edu. Física", "Inglés", "Biología", "Geografía", "Mecánica", "Ind. del Vestido", "Robótica", "Carpintería"],
        
        "1H": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "F.C. y E.", "Vida Saludable", 
                "Edu. Física", "Inglés", "Biología", "Geografía", "Mecánica", "Ind. del Vestido", "Robótica", "Carpintería"],

        "2F": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "F.C. y E.", "Vida Saludable", 
                "Edu. Física", "Inglés", "Física", "Mecánica", "Ind. del Vestido", "Robótica", "Carpintería"],

        "2G": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "F.C. y E.", "Vida Saludable", 
                "Edu. Física", "Inglés", "Física", "Mecánica", "Ind. del Vestido", "Robótica", "Carpintería"],

        "2H": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "F.C. y E.", "Vida Saludable", 
                "Edu. Física", "Inglés", "Física", "Mecánica", "Ind. del Vestido", "Robótica", "Carpintería"],

        "3F": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "F.C. y E.", "Vida Saludable", 
                "Edu. Física", "Inglés", "Química", "Mecánica", "Ind. del Vestido", "Robótica", "Carpintería"],

        "3G": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "F.C. y E.", "Vida Saludable", 
                "Edu. Física", "Inglés", "Química", "Mecánica", "Ind. del Vestido", "Robótica", "Carpintería"],

        "3H": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "F.C. y E.", "Vida Saludable", 
                "Edu. Física", "Inglés", "Química", "Mecánica", "Ind. del Vestido", "Robótica", "Carpintería"]
    }
    const weeks = {
        "1er Periodo": ["S1- 30 de Ago al 03 de Sept de 2021",
                        "S2- 06 al 10 de Sept de 2021",
                        "S3- 13 al 17 de Sept de 2021",
                        "S4- 20 al 24 de Sept de 2021",
                        "S5- 27 de Sept al 01 de Oct de 2021",
                        "S6- 04 al 08 de Oct de 2021",
                        "S7- 11 al 15 de Oct de 2021",
                        "S8- 18 al 22 de Oct de 2021",
                        "S9- 25 al 28 de Oct de 2021",
                        "S10- 03 al 05 de Nov de 2021",
                        "S11- 08 al 12 de Nov de 2021",
                        "S12- 16 al 19 de Nov de 2021",
                        "S13- 22 al 25 de Nov de 2021"],

        "2do Periodo": ["S14- 29 de Nov al 03 de Dic de 2021",
                        "S15- 06 al 10 de Dic de 2021",
                        "S16- 13 al 17 de Dic de 2021",
                        "S17- 03 al 07 de Ene de 2022",
                        "S18- 10 al 14 de Ene de 2022",
                        "S19- 17 al 21 de Ene de 2022",
                        "S20- 24 al 27 de Ene de 2022",
                        "S21- 31 de Ene al 04 de Feb de 2022",
                        "S22- 08 al 11 de Feb de 2022",
                        "S23- 14 al 18 de Feb de 2022",
                        "S24- 21 al 24 de Feb de 2022",
                        "S25- 28 de Feb al 04 de Mar de 2022",
                        "S26- 07 al 11 de Mar de 2022",
                        "S27- 14 al 18 de Mar de 2022",
                        "S28- 22 al 24 de Mar de 2022"],

        "3er Periodo": ["S29- 28 de Mar al 01 de Abr de 2022",
                        "S30- 04 al 08 de Abr de 2022",
                        "S31- 25 al 28 de Abr de 2022",
                        "S32- 02 al 06 de May de 2022",
                        "S33- 09 al 13 de May de 2022",
                        "S34- 16 al 20 de May de 2022",
                        "S35- 23 al 26 de May de 2022",
                        "S36- 30 de May al 03 de Jun de 2022",
                        "S37- 06 al 10 de Jun de 2022",
                        "S38- 13 al 17 de Jun de 2022",
                        "S39- 20 al 23 de Jun de 2022",
                        "S40- 27 de Jun al 01 de Jul de 2022",
                        "S41- 04 al 08 de de Jul de 2022",
                        "S42- 11 al 15 de Jul de 2022",
                        "S43- 18 al 22 de Jul de 2022",
                        "S44- 25 al 27 de Jul de 2022",
                        "S45- 25 al 27 de Jul de 2022"]
    }

    // GET DATA
    async function getAdminData(){
        try{
             // Get groups to teachers
             const res_groups = await db.collection("Grupos - Maestros").get()
             set_groups_to_teachers(res_groups.docs.map(doc => doc.data()))

             // Get all users
             const res_users = await db.collection("Usuarios").get()
             set_all_users(res_users.docs.map(doc => doc.data()))
        }
        catch(error){
             console.log("GET GENERAL DATA ERROR:", error)
        }
    }

    // USE EFFECT
    React.useEffect(() => {
        getAdminData()
    }, [])     


    return (
        <GeneralContext.Provider value={{ all_groups, groups_to_subjects, weeks, groups_to_teachers, all_users, set_all_users}}>
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralProvider

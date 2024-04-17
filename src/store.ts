import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"
import { TDraftPatient, TPatient } from "./types"

type TPatientState = {
    patients : TPatient[]
    activeId : TPatient["id"]
    addPatient : (data : TDraftPatient) => void
    deletePatient : (id : TPatient["id"]) => void
    getPatientById : (id : TPatient["id"]) => void
    updatePatient : (data : TDraftPatient) => void
}

const createPatient = (patient : TDraftPatient) : TPatient => {
    return {
        ...patient,
        id: uuidv4()
    }
}

export const usePatientStore = create<TPatientState>()(
    devtools(
    persist((set) => ({
        patients: [],
        activeId: "",
        addPatient: (data) => {
            const newPatient = createPatient(data)
            set((state) => ({
                patients: [...state.patients, newPatient]
            }))
        },
        deletePatient: (id) => {
            set((state) => ({
                patients: state.patients.filter(patient => patient.id !== id)
            }))
        },
        getPatientById: (id) => {
            set(() => ({
                activeId: id
            }))
        },
        updatePatient: (data) => {
            set((state) => ({
                patients: state.patients.map(patient => patient.id === state.activeId ? { id: state.activeId, ...data } : patient),
                activeId: ""
            }))
        }
    }), {
        name: "patient-storage"
    })
))
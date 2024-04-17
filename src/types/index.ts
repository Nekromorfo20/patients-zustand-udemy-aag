export type TPatient = {
    id : string
    name : string
    caretaker : string
    email : string
    date : Date
    symptoms : string
}

export type TDraftPatient = Omit<TPatient, "id">
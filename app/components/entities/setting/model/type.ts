type Entities = 'project' |  'cashbox';

type Group = {
    id: number
    code: string
    title: string
    description: string
}

type SettingType = "string" | "number" | "boolean" | "float" | "enum"

type Setting = {
    id: number
    code: string
    title: string
    desctiprion: string
    type: SettingType
    values: any
    value: any
    isRequired: boolean
    isDisabled: boolean
}

export type {
    Entities,
    Group,
    Setting
}
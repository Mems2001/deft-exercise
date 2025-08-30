export type Props = Record<string, any>

export type MainTag = keyof HTMLElementTagNameMap 
export type ContainerTag = Extract<MainTag, | "div" | "section" | "article" | "p" | "nav" >
export type ButtonTag = Extract<MainTag, "button">
export type TitleTag = Extract<MainTag, | "h1" | "h2" | "h3" | "h4">

export type ButtonFunction = ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null
export type ButtonType = "button" | "submit" | "reset"
export type AnchorTarget = "_self" | "_blank" | "_parent" | "_top" | (string & {})
export type InputType = "text" | "checkbox" | "date" | "date-time" | "email" | "password" 

export type FormValues = Record<string, any>

export interface RegistrationFormValues {
    username: string,
    password: string,
    confirmPassword: string,
    role: string
}
interface Route {
    path: string,
    component: (props?: Props) => Component
}

interface ComponentFunction {
    (props?: Props): Component
}

type Props = Record<string, any>

type MainTag = keyof HTMLElementTagNameMap 
type ContainerTag = Extract<MainTag, | "div" | "section" | "article" | "p" | "nav" >
type ButtonTag = Extract<MainTag, "button">
type TitleTag = Extract<MainTag, | "h1" | "h2" | "h3" | "h4">

type ButtonFunction = ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null
type ButtonType = "button" | "submit" | "reset"
type AnchorTarget = "_self" | "_blank" | "_parent" | "_top" | (string & {})
type InputType = "text" | "checkbox" | "date" | "date-time" | "email" | "password" | "file"

type FormValues = Record<string, any>

interface RegistrationFormValues {
    username: string,
    password: string,
    confirmPassword: string,
    role: string
}

type CustomerType = "Rewards Member" | "Regular Customer"
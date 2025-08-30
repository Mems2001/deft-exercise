interface Window {
  App: ComponentFunction,
  routes: Route[],
  Component: Component,
  Header: ComponentFunction,
  Home: ComponentFunction,
  LoginPage: ComponentFunction,
  RegisterPage: ComponentFunction,
  Console: ComponentFunction
}

interface Route {
    path: string,
    component: () => Component
}

interface ComponentFunction {
    (props?: any): Component
}

type Props = Record<string, any>

type MainTag = keyof HTMLElementTagNameMap 
type ContainerTag = Extract<MainTag, | "div" | "section" | "article" | "p" | "nav" >
type ButtonTag = Extract<MainTag, "button">
type TitleTag = Extract<MainTag, | "h1" | "h2" | "h3" | "h4">

type ButtonFunction = ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null
type ButtonType = "button" | "submit" | "reset"
type AnchorTarget = "_self" | "_blank" | "_parent" | "_top" | (string & {})
type InputType = "text" | "checkbox" | "date" | "date-time" | "email" | "password" 

type FormValues = Record<string, any>

interface RegistrationFormValues {
    username: string,
    password: string,
    confirmPassword: string,
    role: string
}
import { FormBuilder } from "./pseudoHtml.models"

    export type Props = Record<string, any>
    export type MainTag = keyof HTMLElementTagNameMap 
    export type ContainerTag = Extract<MainTag, | "div" | "section" | "article" | "p">
    export type ButtonTag = Extract<MainTag, "button">
    export type TitleTag = Extract<MainTag, | "h1" | "h2" | "h3" | "h4">
    export type ButtonFunction = ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null
    export type ButtonType = "button" | "submit" | "reset"
    export type AnchorTarget = "_self" | "_blank" | "_parent" | "_top" | (string & {})

    export class Component<TProps extends Props = {}> {
    protected props?: TProps
    public component: HTMLElement

    constructor(name: string, mainTag: MainTag, props?: TProps ) {
        this.props = props
        this.onInit()
        this.component = this.render(name, mainTag)
    }

    /** Initial method which provides the component its basic characteristics, such a the html tag, class and id
     * @returns {HTMLElement} The basic new component, check the following methods to set it's content.
     */
    render(name: string, mainTag: keyof HTMLElementTagNameMap): HTMLElement {
        let component:HTMLElement = document.createElement(mainTag)
        component.className = name.toLowerCase() + '-component'
        component.id = name.toLowerCase() + '-component'

        return component
    }

    /**
     * Creates a simple html title element as h1 and its brothers. This element can not contain other html elements.
     * @param {HTMLElement} father The html element where you need to append the title.
     * @param {TitleTag} mainTag The html element tag, one of the "h" tags. 
     * @param {string} text_content The title's text.
     * @param {string} class_name A string chain that contains your pretended classes for the element.
     * @param {string} id The id for the element.
     * @param {string} key A string to track the element within programatically generated collections of the same element. (Ex: When dynamically generating divs to display an array of strings)
     * @returns A Title html element.
     */
    addTitleHtml(father: HTMLElement, mainTag: TitleTag, text_content:string = '', class_name?: string, id?: string, key?: string) {
        const newTitle = document.createElement(mainTag)
        newTitle.textContent = text_content
        if (class_name) newTitle.className = class_name
        if (id) newTitle.id = id
        if (key) newTitle.dataset.key = key

        father.appendChild(newTitle)

        return newTitle
    }

    /**
     * Use this method to create container-like html element such as div, section, span, even p or similar. 
     * @param {HTMLElement} father Specify the html element in wich you'll append the requested element.
     * @param {containerTag} mainTag The html tag you pretend to give to the new element.
     * @param {string} text_content Any text you want inside your new element.
     * @param {string} class_name A string chain that contains your pretended classes for the element.
     * @param {string} id The id for the element.
     * @param {string} key A string to track the element within programatically generated collections of the same element. (Ex: When dynamically generating divs to display an array of strings)
     * @returns The created html element, wich you can use to nest more elements inside.
     */
    addContainerHtml(father: HTMLElement, mainTag: ContainerTag, text_content?: string, class_name?: string, id?: string, key?:string):HTMLElement {
        const newHtmlElement: HTMLElement = document.createElement(mainTag)
        if (class_name) newHtmlElement.className = class_name
        if (id) newHtmlElement.id = id
        if (text_content) newHtmlElement.textContent = text_content
        if (key) newHtmlElement.dataset.key = key

        father.appendChild(newHtmlElement)

        return newHtmlElement
    }

    /**
     * Creates an Anchor html element for navigation. 
     * @param {HTMLElement} father 
     * @param {string} text_content 
     * @param {string} ref 
     * @param {AnchorTarget} target 
     * @param {string} class_name 
     * @param {string} id 
     * @param {string} key 
     * @returns {HTMLAnchorElement} The Anchor html element itself.
     */
    addNavLink(father: HTMLElement, text_content?:string, ref?:string, target: AnchorTarget = "_self", class_name?:string, id?:string, key?:string): HTMLAnchorElement {
        const newNavLink: HTMLAnchorElement = document.createElement('a')
        newNavLink.target = target
        if (text_content) newNavLink.textContent = text_content
        if (ref) newNavLink.href = ref
        if (class_name) newNavLink.className = class_name
        if (id) newNavLink.id = id
        if (key) newNavLink.dataset.key = key

        father.appendChild(newNavLink)

        return newNavLink
    }

    addButtonHtml(father: HTMLElement, type: ButtonType = "button", text_content:string = '', clickAction:ButtonFunction, disabled:boolean = false, class_name?: string, id?: string, key?:string): HTMLButtonElement {
        const newHtmlButton: HTMLButtonElement = document.createElement("button")
        if (class_name) newHtmlButton.className = class_name
        if (id) newHtmlButton.id = id
        if (text_content) newHtmlButton.textContent = text_content
        if (key) newHtmlButton.dataset.key = key
        newHtmlButton.disabled = disabled
        newHtmlButton.type = type
        if (clickAction) newHtmlButton.onclick = clickAction

        father.appendChild(newHtmlButton)

        return newHtmlButton
    }

    addForm() {
        const newForm = new FormBuilder('form').build()

        this.component.appendChild(newForm.element!)

        return newForm.element
    }

    /** Lifecycle hook: called when component is first created */
    protected onInit(): void {
        // Default empty implementation; subclasses can override
    }

    /** Lifecycle hook: called when component is removed */
    protected onDestroy(): void {
        // Default empty implementation; subclasses can override
    }

    /** Mounts component into the given outlet */
    mount(outlet: HTMLElement) {
        outlet.appendChild(this.component);
    }

    /** Updates the component, e.g., after props change and re-renders in the same parent */
    update(newProps: TProps) {
        this.props = { ...this.props, ...newProps };
        this.mount(this.component.parentElement!);
    }

    /** Removes the component from the DOM */
    unmount() {
        this.onDestroy();
        if (this.component.parentElement) {
        this.component.parentElement.removeChild(this.component);
        }
    }
    }

export interface ComponentFunction {
    (props?: any): Component
}
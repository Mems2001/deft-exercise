import { AnchorBuilder, ButtonBuilder, ContainerBuiler, FormBuilder, TitleBuilder } from "./index"

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
     * Use this to create a title-like html element such as h1 and its brothers. This method returns a Builder you can use to add new attributes to the html element. Finish the declaration with .build() to append the element to its father. You can also use .element after that to get the html element if needed.
     * @param {HTMLElement} father Specify the html element in wich you'll append the requested element.
     * @param {containerTag} mainTag The html tag you pretend to give to the new element.
     * @returns {TitleBuilder} A ContainerBuilder object, use .build() to create the element.
     */
    addTitleHtml(father: HTMLElement, mainTag: TitleTag):TitleBuilder {
        const newTitleBuilder = new TitleBuilder(mainTag, father)

        return newTitleBuilder
    }

    /**
     * Use this to create a container-like html element such as div, section, article or p. This method returns a Builder you can use to add new attributes to the html element. Finish the declaration with .build() to append the element to its father. You can also use .element after that to get the html element if needed.
     * @param {HTMLElement} father Specify the html element in wich you'll append the requested element.
     * @param {containerTag} mainTag The html tag you pretend to give to the new element.
     * @returns {ContainerBuiler} A ContainerBuilder object, use .build() to create the element.
     */
    addContainerHtml(father: HTMLElement, mainTag: ContainerTag):ContainerBuiler {
        const newHtmlBuilder = new ContainerBuiler(mainTag, father)

        return newHtmlBuilder
    }

    /**
     * Use this to create an anchor html element. This method returns a Builder you can use to add new attributes to the html element. Finish the declaration with .build() to append the element to its father. You can also use .element after that to get the html element if needed.
     * @param {HTMLElement} father Specify the html element in wich you'll append the requested element.
     * @returns {AnchorBuilder} A ContainerBuilder object, use .build() to create the element.
     */
    addNavLink(father: HTMLElement): AnchorBuilder {
        const newNavLink = new AnchorBuilder(father)

        return newNavLink
    }

    /**
     * Use this to create a button html element. This method returns a Builder you can use to add new attributes to the html element. Finish the declaration with .build() to append the element to its father. You can also use .element after that to get the html element if needed.
     * @param {HTMLElement} father Specify the html element in wich you'll append the requested element.
     * @returns {AnchorBuilder} A ContainerBuilder object, use .build() to create the element.
     */
    addButtonHtml(father: HTMLElement): ButtonBuilder {
        const newButtonBuilder = new ButtonBuilder(father)
        
        return newButtonBuilder
    }

    addForm(father: HTMLElement) {
        const newFormBuilder = new FormBuilder(father).setClassName('xd').build()

        return newFormBuilder
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
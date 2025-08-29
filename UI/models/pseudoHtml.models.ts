import { AnchorBuilder, ButtonBuilder, ContainerBuiler, FormBuilder, TitleBuilder } from "./index"

export abstract class PseudoHtml<T extends HTMLElement> {
    abstract element:T

    abstract addChild(father:HTMLElement):void
}

export class Title extends PseudoHtml<HTMLElement> {
    element: HTMLElement

    constructor (builder: TitleBuilder) {
        super()
        this.element = document.createElement(builder.tag)
        if (builder.text_content) this.element.textContent = builder.text_content
        if (builder.class_name) this.element.className = builder.class_name
        if (builder.id) this.element.id = builder.id
        if (builder.key) this.element.dataset.key = builder.key
        this.addChild(builder.father)
    }

    addChild(father:HTMLElement):void {
        father.appendChild(this.element)
    }
}

export class Form extends PseudoHtml<HTMLFormElement> {
    element: HTMLFormElement

    constructor (builder: FormBuilder) {
        super()
        this.element = document.createElement(builder.tag)
        if (builder.text_content) this.element.textContent = builder.text_content
        if (builder.class_name) this.element.className = builder.class_name
        if (builder.id) this.element.id = builder.id
        if (builder.key) this.element.dataset.key = builder.key
        this.addChild(builder.father)
    }

    addChild(father: HTMLElement): void {
        father.appendChild(this.element)
    }
}

export class Container extends PseudoHtml<HTMLElement> {
    element: HTMLElement

    constructor (builder: ContainerBuiler) {
        super()
        this.element = document.createElement(builder.tag)
        if (builder.text_content) this.element.textContent = builder.text_content
        if (builder.class_name) this.element.className = builder.class_name
        if (builder.id) this.element.id = builder.id
        if (builder.key) this.element.dataset.key = builder.key
        this.addChild(builder.father)
    }

    addChild(father: HTMLElement): void {
        father.appendChild(this.element)
    }
}

export class Anchor extends PseudoHtml<HTMLAnchorElement> {
    element: HTMLAnchorElement

    constructor(builder: AnchorBuilder) {
        super()
        this.element = document.createElement(builder.tag!)
        if (builder.text_content) this.element.textContent = builder.text_content
        if (builder.class_name) this.element.className = builder.class_name
        if (builder.id) this.element.id = builder.id
        if (builder.key) this.element.dataset.key = builder.key
        if (builder.ref) this.element.href = builder.ref
        if (builder.target) this.element.target = builder.target
        this.addChild(builder.father)
    }

    addChild(father: HTMLElement): void {
        father.appendChild(this.element)
    }
}

export class Button extends PseudoHtml<HTMLButtonElement> {
    element: HTMLButtonElement

    constructor(builder: ButtonBuilder) {
        super()
        this.element = document.createElement(builder.tag)
        if (builder.text_content) this.element.textContent = builder.text_content
        if (builder.class_name) this.element.className = builder.class_name
        if (builder.id) this.element.id = builder.id
        if (builder.key) this.element.dataset.key = builder.key
        this.element.onclick = builder.clickAction
        this.element.disabled = builder.disabled
        this.element.type = builder.type
        this.addChild(builder.father)
    }

    addChild(father: HTMLElement): void {
        father.appendChild(this.element)
    }
}
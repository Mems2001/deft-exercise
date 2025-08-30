import { AnchorBuilder, ButtonBuilder, ContainerBuiler, FormBuilder, FormValues, InputBuilder, TitleBuilder } from "./index"

export abstract class PseudoHtml<T extends HTMLElement> {
    abstract element:T

    protected abstract addChild(father_element:T):void
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
        this.addChild(builder.father.element)
    }

    addChild(father_element:HTMLElement):void {
        father_element.appendChild(this.element)
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
        this.addChild(builder.father.element)
    }

    addChild(father_element: HTMLElement): void {
        father_element.appendChild(this.element)
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
        this.addChild(builder.father.element)
    }

    addChild(father_element: HTMLElement): void {
        father_element.appendChild(this.element)
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
        this.addChild(builder.father.element)
    }

    addChild(father_element: HTMLElement): void {
        father_element.appendChild(this.element)
    }
}

// ---> FORM CLASSES <---

export class Form extends PseudoHtml<HTMLFormElement> {
    element: HTMLFormElement
    private values: FormValues = {}

    constructor (builder: FormBuilder) {
        super()
        this.element = document.createElement(builder.tag)
        if (builder.text_content) this.element.textContent = builder.text_content
        if (builder.class_name) this.element.className = builder.class_name
        if (builder.id) this.element.id = builder.id
        if (builder.key) this.element.dataset.key = builder.key
        this.addChild(builder.father.element)
    }

    addChild(father_element: HTMLElement): void {
        father_element.appendChild(this.element)
    }

    getValues() {
        return this.values
    }

    setValue(name: string, value: any) {
        this.values[name] = value
    }

    onSubmit(callback: (values: FormValues) => void): void {
    this.element.addEventListener("submit", (ev) => {
      ev.preventDefault();
      callback(this.getValues());
    });
  }
}

export class Input extends PseudoHtml<HTMLInputElement> {
    element: HTMLInputElement

    constructor (builder: InputBuilder) {
        super()
        this.element = document.createElement(builder.tag)
        if (builder.text_content) this.element.textContent = builder.text_content
        if (builder.class_name) this.element.className = builder.class_name
        if (builder.id) this.element.id = builder.id
        if (builder.key) this.element.dataset.key = builder.key
        if (builder.place_holder) this.element.placeholder = builder.place_holder
        if (builder.name) this.element.name = builder.name
        this.element.type = builder.type
        this.element.required = builder.required
        this.addChild(builder.father.element)
    }

    addChild(father_element: HTMLElement): void {
        if (!(father_element instanceof HTMLFormElement)) {
            throw new Error("An input might always be inserted into a html form element")
        }
        father_element.appendChild(this.element)
    }
}
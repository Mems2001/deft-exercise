import { Anchor, AnchorTarget, Button, ButtonFunction, ButtonType, Component, Container, ContainerTag, Form, FormValues, Input, InputType, MainTag, PseudoHtml, Title, TitleTag } from "./index"

export abstract class Builder<T extends keyof HTMLElementTagNameMap> {
    abstract tag: T
    father: PseudoHtml<HTMLElement> | Component
    text_content?: string
    class_name?:string
    id?:string
    key?:string
    
    constructor (father: PseudoHtml<HTMLElement> | Component) {
        this.father = father
    }

    setText(text_content:string) {
        this.text_content = text_content
        return this
    }

    setClassName(class_name:string) {
        this.class_name = class_name
        return this
    }

    setId(id: string) {
        this.id = id
        return this
    }

    setKey(key:string) {
        this.key = key
        return this
    }

    abstract build(param?: any):PseudoHtml<HTMLElement>
}

export class TitleBuilder extends Builder<TitleTag> {
    tag: TitleTag

    constructor (tag:TitleTag, father: PseudoHtml<HTMLElement> | Component) {
        super(father)
        this.tag = tag
    }

    build() {
        return new Title(this)
    }
}

export class FormBuilder extends Builder<"form"> {
    tag: "form" = "form"

    constructor (father: PseudoHtml<HTMLElement> | Component) {
        super(father)
    }

    build() {
        return new Form(this)
    }
}

export class ContainerBuiler extends Builder<ContainerTag> {
    tag: ContainerTag

    constructor(tag: ContainerTag, father: PseudoHtml<HTMLElement> | Component) {
        super(father)
        this.tag = tag
    }

    build() {
        return new Container(this)
    }
}

export class AnchorBuilder extends Builder<"a"> {
    tag:"a" = "a"
    ref?: string
    target?: AnchorTarget

    constructor(father: PseudoHtml<HTMLElement> | Component) {
        super(father)
    }

    setRef(ref: string) {
        this.ref = ref
        return this
    }

    setTarget(target: AnchorTarget) {
        this.target = target
        return this
    }

    build() {
        return new Anchor(this)
    }
}

export class ButtonBuilder extends Builder<"button"> {
    tag: "button" = "button"
    disabled: boolean = false
    type: ButtonType = "button"
    clickAction: ButtonFunction = null

    constructor(father: PseudoHtml<HTMLElement> | Component) {
        super(father)
    }

    setDisabled(value: boolean) {
        this.disabled = value
        return this
    }

    setType(type: ButtonType) {
        this.type = type
        return this
    }

    setClickAction (action: ButtonFunction) {
        this.clickAction = action
        return this
    }

    build() {
        return new Button(this)
    }
}

export class InputBuilder extends Builder<"input"> {
    tag: "input" = "input"
    name?: string
    type: InputType = 'text'
    required: boolean = false
    place_holder?: string

    constructor (father: Form) {
        super(father)
    }

    /**
     * Bind the input element to its father, a form.
     * @param {Input} input
     * @param {Form} father 
     */
    private register(input: Input, father: Form): void {
        const name = this.name
        if (!name) throw new Error("Input must have a name to be registered in a form");

        // Set value in the form state
        father.setValue(name, input.element.value);

        // Listen to changes
        input.element.addEventListener("input", () => {
          father.setValue(name, input.element.value);
        });
    } 

    setType(type: InputType) {
        this.type = type
        return this
    }

    setName(name: string) {
        this.name = name
        return this
    }

    setRequired(value:boolean) {
        this.required = value
        return this
    }

    setPlaceHolder(place_holder:string) {
        this.place_holder = place_holder
        return this
    }

    build(father:Form): PseudoHtml<HTMLElement> {
        const newInput = new Input(this)
        this.register(newInput, father)

        return newInput
    }
}
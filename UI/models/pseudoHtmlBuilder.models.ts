import { Anchor, AnchorTarget, Button, ButtonFunction, ButtonType, Container, ContainerTag, Form, MainTag, PseudoHtml, Title, TitleTag } from "./index"

export abstract class Builder<T extends keyof HTMLElementTagNameMap> {
    abstract tag: T
    father: HTMLElement
    text_content?: string
    class_name?:string
    id?:string
    key?:string
    
    constructor (father: HTMLElement) {
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

    abstract build():PseudoHtml<HTMLElement>
}

export class TitleBuilder extends Builder<TitleTag> {
    tag: TitleTag

    constructor (tag:TitleTag, father: HTMLElement) {
        super(father)
        this.tag = tag
    }

    build() {
        return new Title(this)
    }
}

export class FormBuilder extends Builder<"form"> {
    tag: "form" = "form"

    constructor (father: HTMLElement) {
        super(father)
    }

    build() {
        return new Form(this)
    }
}

export class ContainerBuiler extends Builder<ContainerTag> {
    tag: ContainerTag

    constructor(tag: ContainerTag, father: HTMLElement) {
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

    constructor(father: HTMLElement) {
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

    constructor(father: HTMLElement) {
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
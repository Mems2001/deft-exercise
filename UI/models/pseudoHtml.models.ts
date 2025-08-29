export class PseudoHtml {
    element: HTMLElement|null = null
}

export class Form extends PseudoHtml {

    constructor (builder: FormBuilder) {
        super()
        this.element = document.createElement(builder.tag)
        if (builder.class_name) this.element.className = builder.class_name
        if (builder.id) this.element.id = builder.id
        if (builder.key) this.element.dataset.key = builder.key
    }
}

export class Container extends PseudoHtml {
    
    constructor (builder: FormBuilder) {
        super()
        this.element = document.createElement(builder.tag)
        if (builder.class_name) this.element.className = builder.class_name
        if (builder.id) this.element.id = builder.id
        if (builder.key) this.element.dataset.key = builder.key
    }
}

export class Builder {
    tag: keyof HTMLElementTagNameMap
    class_name?:string
    id?:string
    key?:string
    
    constructor (tag: keyof HTMLElementTagNameMap) {
        this.tag = tag
    }

    setClassName(class_name:string) {
        this.class_name = class_name
    }

    setId(id: string) {
        this.id = id
    }

    setKey(key:string) {
        this.key = key
    }

    build() {
        return new Form(this)
    }
}

export class FormBuilder extends Builder {
    
}

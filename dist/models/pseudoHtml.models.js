export class PseudoHtml {
    constructor() {
        this.element = null;
    }
}
export class Form extends PseudoHtml {
    constructor(builder) {
        super();
        this.element = document.createElement(builder.tag);
        if (builder.class_name)
            this.element.className = builder.class_name;
        if (builder.id)
            this.element.id = builder.id;
    }
}
export class Builder {
    constructor(tag) {
        this.tag = tag;
    }
    setClassName(class_name) {
        this.class_name = class_name;
    }
    setId(id) {
        this.id = id;
    }
    build() {
        return new Form(this);
    }
}
export class FormBuilder extends Builder {
}

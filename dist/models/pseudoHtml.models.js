export class PseudoHtml {
}
export class Title extends PseudoHtml {
    constructor(builder) {
        super();
        this.element = document.createElement(builder.tag);
        if (builder.text_content)
            this.element.textContent = builder.text_content;
        if (builder.class_name)
            this.element.className = builder.class_name;
        if (builder.id)
            this.element.id = builder.id;
        if (builder.key)
            this.element.dataset.key = builder.key;
        this.addChild(builder.father);
    }
    addChild(father) {
        father.appendChild(this.element);
    }
}
export class Form extends PseudoHtml {
    constructor(builder) {
        super();
        this.element = document.createElement(builder.tag);
        if (builder.text_content)
            this.element.textContent = builder.text_content;
        if (builder.class_name)
            this.element.className = builder.class_name;
        if (builder.id)
            this.element.id = builder.id;
        if (builder.key)
            this.element.dataset.key = builder.key;
        this.addChild(builder.father);
    }
    addChild(father) {
        father.appendChild(this.element);
    }
}
export class Container extends PseudoHtml {
    constructor(builder) {
        super();
        this.element = document.createElement(builder.tag);
        if (builder.text_content)
            this.element.textContent = builder.text_content;
        if (builder.class_name)
            this.element.className = builder.class_name;
        if (builder.id)
            this.element.id = builder.id;
        if (builder.key)
            this.element.dataset.key = builder.key;
        this.addChild(builder.father);
    }
    addChild(father) {
        father.appendChild(this.element);
    }
}
export class Anchor extends PseudoHtml {
    constructor(builder) {
        super();
        this.element = document.createElement(builder.tag);
        if (builder.text_content)
            this.element.textContent = builder.text_content;
        if (builder.class_name)
            this.element.className = builder.class_name;
        if (builder.id)
            this.element.id = builder.id;
        if (builder.key)
            this.element.dataset.key = builder.key;
        if (builder.ref)
            this.element.href = builder.ref;
        if (builder.target)
            this.element.target = builder.target;
        this.addChild(builder.father);
    }
    addChild(father) {
        father.appendChild(this.element);
    }
}
export class Button extends PseudoHtml {
    constructor(builder) {
        super();
        this.element = document.createElement(builder.tag);
        if (builder.text_content)
            this.element.textContent = builder.text_content;
        if (builder.class_name)
            this.element.className = builder.class_name;
        if (builder.id)
            this.element.id = builder.id;
        if (builder.key)
            this.element.dataset.key = builder.key;
        this.element.onclick = builder.clickAction;
        this.element.disabled = builder.disabled;
        this.element.type = builder.type;
        this.addChild(builder.father);
    }
    addChild(father) {
        father.appendChild(this.element);
    }
}

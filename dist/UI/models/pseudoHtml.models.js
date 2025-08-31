"use strict";
class PseudoHtml {
}
class Title extends PseudoHtml {
    element;
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
        this.addChild(builder.father.element);
    }
    addChild(father_element) {
        father_element.appendChild(this.element);
    }
}
class Container extends PseudoHtml {
    element;
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
        this.addChild(builder.father.element);
    }
    addChild(father_element) {
        father_element.appendChild(this.element);
    }
}
class Anchor extends PseudoHtml {
    element;
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
        this.addChild(builder.father.element);
    }
    addChild(father_element) {
        father_element.appendChild(this.element);
    }
}
class Button extends PseudoHtml {
    element;
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
        this.addChild(builder.father.element);
    }
    addChild(father_element) {
        father_element.appendChild(this.element);
    }
}
// ---> FORM CLASSES <---
class Form extends PseudoHtml {
    element;
    values = {};
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
        this.addChild(builder.father.element);
    }
    addChild(father_element) {
        father_element.appendChild(this.element);
    }
    getValues() {
        return this.values;
    }
    setValue(name, value) {
        this.values[name] = value;
    }
    onSubmit(callback) {
        this.element.addEventListener("submit", (ev) => {
            ev.preventDefault();
            callback(this.getValues());
        });
    }
}
class Input extends PseudoHtml {
    element;
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
        if (builder.place_holder)
            this.element.placeholder = builder.place_holder;
        if (builder.name)
            this.element.name = builder.name;
        this.element.type = builder.type;
        this.element.required = builder.required;
        this.addChild(builder.father.element);
    }
    addChild(father_element) {
        if (!(father_element instanceof HTMLFormElement)) {
            throw new Error("An input might always be inserted into a html form element");
        }
        father_element.appendChild(this.element);
    }
}
class Select extends PseudoHtml {
    element;
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
        if (builder.options)
            this.setOptions(builder.options);
        if (builder.value)
            this.element.value = builder.value;
        this.addChild(builder.father.element);
    }
    addChild(father_element) {
        if (!(father_element instanceof HTMLFormElement)) {
            throw new Error("A select might always be inserted into a html form element");
        }
        father_element.appendChild(this.element);
    }
    setOptions(options) {
        options.forEach(opt => {
            const optionEl = document.createElement("option");
            optionEl.value = opt;
            optionEl.textContent = opt;
            this.element.appendChild(optionEl);
        });
    }
}

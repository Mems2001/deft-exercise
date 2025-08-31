"use strict";
class Builder {
    constructor(father) {
        this.father = father;
    }
    setText(text_content) {
        this.text_content = text_content;
        return this;
    }
    setClassName(class_name) {
        this.class_name = class_name;
        return this;
    }
    setId(id) {
        this.id = id;
        return this;
    }
    setKey(key) {
        this.key = key;
        return this;
    }
}
class TitleBuilder extends Builder {
    constructor(tag, father) {
        super(father);
        this.tag = tag;
    }
    build() {
        return new Title(this);
    }
}
class FormBuilder extends Builder {
    constructor(father) {
        super(father);
        this.tag = "form";
    }
    build() {
        return new Form(this);
    }
}
class ContainerBuiler extends Builder {
    constructor(tag, father) {
        super(father);
        this.tag = tag;
    }
    build() {
        return new Container(this);
    }
}
class AnchorBuilder extends Builder {
    constructor(father) {
        super(father);
        this.tag = "a";
    }
    setRef(ref) {
        this.ref = ref;
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    build() {
        return new Anchor(this);
    }
}
class ButtonBuilder extends Builder {
    constructor(father) {
        super(father);
        this.tag = "button";
        this.disabled = false;
        this.type = "button";
        this.clickAction = null;
    }
    setDisabled(value) {
        this.disabled = value;
        return this;
    }
    setType(type) {
        this.type = type;
        return this;
    }
    setClickAction(action) {
        this.clickAction = action;
        return this;
    }
    build() {
        return new Button(this);
    }
}
class InputBuilder extends Builder {
    constructor(father) {
        super(father);
        this.tag = "input";
        this.type = 'text';
        this.required = false;
    }
    /**
     * Bind the input element to its father, a form.
     * @param {Input} input
     * @param {Form} father
     */
    register(input, father) {
        const name = this.name;
        if (!name)
            throw new Error("Input must have a name to be registered in a form");
        // Set value in the form state
        father.setValue(name, input.element.value);
        // Listen to changes
        input.element.addEventListener("input", () => {
            father.setValue(name, input.element.value);
        });
    }
    setType(type) {
        this.type = type;
        return this;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setRequired(value) {
        this.required = value;
        return this;
    }
    setPlaceHolder(place_holder) {
        this.place_holder = place_holder;
        return this;
    }
    build(father) {
        const newInput = new Input(this);
        this.register(newInput, father);
        return newInput;
    }
}

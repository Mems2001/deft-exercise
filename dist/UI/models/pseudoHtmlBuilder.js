"use strict";
class Builder {
    father;
    text_content;
    class_name;
    id;
    key;
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
    tag;
    constructor(tag, father) {
        super(father);
        this.tag = tag;
    }
    build() {
        return new Title(this);
    }
}
class FormBuilder extends Builder {
    tag = "form";
    constructor(father) {
        super(father);
    }
    build() {
        return new Form(this);
    }
}
class ContainerBuiler extends Builder {
    tag;
    constructor(tag, father) {
        super(father);
        this.tag = tag;
    }
    build() {
        return new Container(this);
    }
}
class AnchorBuilder extends Builder {
    tag = "a";
    ref;
    target;
    constructor(father) {
        super(father);
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
    tag = "button";
    disabled = false;
    type = "button";
    clickAction = null;
    constructor(father) {
        super(father);
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
    tag = "input";
    name;
    type = 'text';
    required = false;
    place_holder;
    constructor(father) {
        super(father);
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
        if (input.element.files && input.element.files?.length > 0) {
            father.setValue(name, input.element.files);
        }
        else
            father.setValue(name, input.element.value);
        // Listen to changes
        input.element.addEventListener("input", () => {
            if (input.element.files && input.element.files?.length > 0) {
                father.setValue(name, input.element.files);
            }
            else
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
class SelectBuilder extends Builder {
    tag = "select";
    options;
    name;
    value;
    constructor(father) {
        super(father);
    }
    setOptions(options) {
        this.options = options;
        return this;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setValue(value) {
        if (value)
            this.value = value;
        return this;
    }
    register(select, father) {
        const name = this.name;
        if (!name)
            throw new Error("Select must have a name to be registered in a form");
        // Set value in the form state
        father.setValue(name, select.element.value);
        // Listen to changes
        select.element.addEventListener("input", () => {
            father.setValue(name, select.element.value);
        });
    }
    build(father) {
        const newSelect = new Select(this);
        this.register(newSelect, father);
        return newSelect;
    }
}

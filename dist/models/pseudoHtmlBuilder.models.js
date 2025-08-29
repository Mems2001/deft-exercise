import { Anchor, Button, Container, Form, Title } from "./index.js";
export class Builder {
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
export class TitleBuilder extends Builder {
    constructor(tag, father) {
        super(father);
        this.tag = tag;
    }
    build() {
        return new Title(this);
    }
}
export class FormBuilder extends Builder {
    constructor(father) {
        super(father);
        this.tag = "form";
    }
    build() {
        return new Form(this);
    }
}
export class ContainerBuiler extends Builder {
    constructor(tag, father) {
        super(father);
        this.tag = tag;
    }
    build() {
        return new Container(this);
    }
}
export class AnchorBuilder extends Builder {
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
export class ButtonBuilder extends Builder {
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

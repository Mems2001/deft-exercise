"use strict";
class Component {
    constructor(name, mainTag, props) {
        this.props = props;
        this.onInit();
        this.element = this.render(name, mainTag);
    }
    /** Initial method which provides the component its basic characteristics, such a the html tag, class and id
     * @returns {HTMLElement} The basic new component, check the following methods to set it's content.
     */
    render(name, mainTag) {
        let component = document.createElement(mainTag);
        component.className = name.toLowerCase() + '-component';
        component.id = name.toLowerCase() + '-component';
        return component;
    }
    /**
     * Use this to create a title-like PseudoHtml instance such as h1 and its brothers. This method returns a Builder you can use to add new attributes to the html element. Finish the declaration with .build() to append the element to its father. You can also use .element after that to get the html element if needed.
     * @param {PseudoHtml<HTMLElement> | Component} father Specify the father object in wich you'll append the requested element.
     * @param {containerTag} mainTag The html tag you pretend to give to the new element.
     * @returns {TitleBuilder} A ContainerBuilder instance, use .build() to create the element.
     */
    addTitleHtml(father, mainTag) {
        const newTitleBuilder = new TitleBuilder(mainTag, father);
        return newTitleBuilder;
    }
    /**
     * Use this to create a container-like PseudoHtml instance such as div, section, article or p. This method returns a Builder you can use to add new attributes to the html element. Finish the declaration with .build() to append the element to its father. You can also use .element after that to get the html element if needed.
     * @param {PseudoHtml<HTMLElement> | Component} father Specify the father object in wich you'll append the requested element.
     * @param {containerTag} mainTag The html tag you pretend to give to the new element.
     * @returns {ContainerBuiler} A ContainerBuilder instance, use .build() to create the element.
     */
    addContainerHtml(father, mainTag) {
        const newHtmlBuilder = new ContainerBuiler(mainTag, father);
        return newHtmlBuilder;
    }
    /**
     * Use this to create an anchor PseudoHtml instance. This method returns a Builder you can use to add new attributes to the html element. Finish the declaration with .build() to append the element to its father. You can also use .element after that to get the html element if needed.
     * @param {PseudoHtml<HTMLElement> | Component} father Specify the father object in wich you'll append the requested element.
     * @returns {AnchorBuilder} A ContainerBuilder instance, use .build() to create the element.
     */
    addNavLink(father) {
        const newNavLink = new AnchorBuilder(father);
        return newNavLink;
    }
    /**
     * Use this to create a button PseudoHtml instance. This method returns a Builder you can use to add new attributes to the html element. Finish the declaration with .build() to append the element to its father. You can also use .element after that to get the html element if needed.
     * @param {PseudoHtml<HTMLElement> | Component} father Specify the father object in wich you'll append the requested element.
     * @returns {ButtonBuilder} A ContainerBuilder instance, use .build() to create the element.
     */
    addButtonHtml(father) {
        const newButtonBuilder = new ButtonBuilder(father);
        return newButtonBuilder;
    }
    /**
     * Use this to create a form PseudoHtml instance. This method returns a Builder you can use to add new attributes to the html element. Finish the declaration with .build() to append the element to its father. You can also use .element after that to get the html element if needed.
     * @param {PseudoHtml<HTMLElement> | Component } father Specify the father object in wich you'll append the requested element.
     * @returns {FormBuilder} A ContainerBuilder instance, use .build() to create the element.
     */
    addForm(father) {
        const newFormBuilder = new FormBuilder(father);
        return newFormBuilder;
    }
    /**
     * Use this to create an input PseudoHtml instance. This method returns a Builder you can use to add new attributes to the html element. Finish the declaration with .build() to append the element to its father. You can also use .element after that to get the html element if needed.
     * @param {Form} father Specify the PseudoHtml instance in wich you'll append the requested element.
     * @returns {InputBuilder} A ContainerBuilder instance, use .build() to create the element.
     */
    addInput(father) {
        const newInputBuilder = new InputBuilder(father);
        return newInputBuilder;
    }
    /** Lifecycle hook: called when component is first created */
    onInit() {
        // Default empty implementation; subclasses can override
    }
    /** Lifecycle hook: called when component is removed */
    onDestroy() {
        // Default empty implementation; subclasses can override
    }
    /** Mounts component into the given outlet */
    mount(outlet) {
        outlet.appendChild(this.element);
    }
    /** Updates the component, e.g., after props change and re-renders in the same parent */
    update(newProps) {
        this.props = Object.assign(Object.assign({}, this.props), newProps);
        this.mount(this.element.parentElement);
    }
    /** Removes the component from the DOM */
    unmount() {
        this.onDestroy();
        if (this.element.parentElement) {
            this.element.parentElement.removeChild(this.element);
        }
    }
}

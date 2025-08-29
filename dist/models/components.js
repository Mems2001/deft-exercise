export class Component {
    constructor(name, mainTag, props) {
        this.props = props;
        this.onInit();
        this._component = this.render(name, mainTag);
    }
    get component() {
        return this._component;
    }
    /** Abstract method: every component must implement render to declare the component content */
    render(name, mainTag) {
        let component = document.createElement(mainTag);
        component.className = name + '-component';
        component.id = name + '-component';
        return component;
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
        outlet.appendChild(this._component);
    }
    /** Updates the component, e.g., after props change and re-renders in the same parent */
    update(newProps) {
        this.props = Object.assign(Object.assign({}, this.props), newProps);
        this.mount(this._component.parentElement);
    }
    /** Removes the component from the DOM */
    unmount() {
        this.onDestroy();
        if (this._component.parentElement) {
            this._component.parentElement.removeChild(this._component);
        }
    }
}

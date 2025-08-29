import { Component } from "./components.js";
export class ComponentFactory {
    static createComponent(name, mainTag) {
        return new (class extends Component {
            implementContent() {
            }
        })(name, mainTag);
    }
    ;
}

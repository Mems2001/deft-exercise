import { Component } from "./index.js";
export class ComponentFactory {
    static createComponent(name, mainTag) {
        return new (class extends Component {
        })(name, mainTag);
    }
    ;
}

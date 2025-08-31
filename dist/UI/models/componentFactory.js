"use strict";
class ComponentFactory {
    static createComponent(name, mainTag) {
        return new (class extends Component {
        })(name, mainTag);
    }
    ;
}

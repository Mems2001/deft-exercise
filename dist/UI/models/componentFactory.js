"use strict";
class ComponentFactory {
    static createComponent(name, mainTag, props) {
        return new (class extends Component {
        })(name, mainTag, props);
    }
    ;
}

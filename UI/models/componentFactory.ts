class ComponentFactory {
    static createComponent (name: string, mainTag: MainTag) {
        return new (class extends Component {
        }) (name, mainTag)
    };
}
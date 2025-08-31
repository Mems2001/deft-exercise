class ComponentFactory {
    static createComponent (name: string, mainTag: MainTag, props?:Props) {
        return new (class extends Component {
        }) (name, mainTag, props)
    };
}
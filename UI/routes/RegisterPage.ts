const RegisterPage: ComponentFunction = () => {
    const component = ComponentFactory.createComponent("Register-page", "div")

    const RegisterContainer = component.addContainerHtml(component, 'div')
        .setClassName("register-container")
        .build()
    component.addTitleHtml(RegisterContainer, "h1")
        .setText("User Registration")
        .setClassName("register-title")

    const RegisterForm = component.addForm(RegisterContainer)
        .setClassName("register-form")
        .build()
    const usernameInput = component.addInput(RegisterForm)
        .setClassName("register-input")
        .setPlaceHolder("Type your username")
        .setName("username").build(RegisterForm)
    const passwordInput = component.addInput(RegisterForm)
        .setClassName("register-input")
        .setPlaceHolder("Type your password")
        .setType("password")
        .setName("password")
        .build(RegisterForm)
    const submitButton = component.addButtonHtml(RegisterForm)
        .setType("submit")
        .setClassName("register-submit-btn")
        .setText("Registration")
        .build()
    RegisterForm.onSubmit(async (values) => {
        
    })

    return component
}

window.RegisterPage = RegisterPage
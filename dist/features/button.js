export function Button(text = '') {
    const button = document.createElement('button');
    button.textContent = text;
    return button;
}

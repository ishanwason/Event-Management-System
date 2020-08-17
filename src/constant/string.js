export const Regex = {
    EMAIL: /^([a-zA-Z0-9_\-\.]+){2,4}@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    // NAME: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    NAME: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/
    // NAME:/^(?![\s.]+$)[a-zA-Z\s.]*$/
}
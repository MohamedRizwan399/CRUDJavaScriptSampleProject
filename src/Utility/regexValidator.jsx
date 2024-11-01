export const emailValidator = username => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(username)
}

export const passwordValidator = password => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordRegex.test(password)
}
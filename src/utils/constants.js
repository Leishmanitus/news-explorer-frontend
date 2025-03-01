export const formTextOptions = {
    signupText: 'Sign Up',
    signinText: 'Sign In',
    emailText: 'Email',
    passwordText: 'Password',
    usernameText: 'Username',
    completionText: 'Registration successfully completed!'
};

export const url = "http://localhost:3001";

export const apiInfo = {
    API_KEY:'66678982549440b19fdc6627a619c096',
    API_URL: process.env.NODE_ENV === "production" 
        ? "https://nomoreparties.co/news/v2/everything"
        : "https://newsapi.org/v2/everything"
};

export const modalOptions = {
    formOptions: {
      formName: "garment",
      formTitle: "New Garment",
      formButtonText: "Add garment",
      formLoadingText: "...Saving",
    },
    previewOptions: {
      previewFormName: "preview",
      previewDeleteButton: "Delete item",
    },
    confirmationOptions: {
      confirmFormName: "confirm",
      confirmMessage:
        "Are you sure you want to delete this item? This action is irreversible.",
      confirmText: "Yes, delete item",
      confirmCancelText: "Cancel",
      confirmLoadingText: "...Deleting",
    },
    loginOptions: {
      loginFormName: "signin",
      signupFormName: "signup",
      loginTitle: "Log In",
      loginButton: "Log In",
      signupTitle: "Sign Up",
      signupButton: "Sign Up",
      loginLoadingText: "...Logging in",
      signupLoadingText: "...Registering",
    },
    editProfileOptions: {
      editProfileFormName: "signin",
      editProfileTitle: "Change profile data",
      editProfileButton: "Save Changes",
      editProfileLoading: "...Saving",
    },
    registrationValues: {
      name: "",
      email: "",
      password: "",
    },
    loginValues: {
      email: "",
      password: "",
    },
  };

export const apiInfo = {
    API_KEY:'66678982549440b19fdc6627a619c096',
    API_URL: process.env.NODE_ENV === "production" 
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything"
};

export const url = "http://localhost:3001";

export interface User {
    id : string;
    name : string;
    email : string;
    password : string;
    isLoggedIn : boolean;
    role : "customer" | "admin";
    }
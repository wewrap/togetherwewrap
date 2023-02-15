export interface User {
    id: string; 
    email: string; 
    firstName: string; 
    lastName: string; 
    hashedPassword: string; 
    salt: string; 
    birthDate: Date; 
}


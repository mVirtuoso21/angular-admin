import { ApiService } from "../services/api.service";

export class User {
    id: number;
    email: string;
    password: string;
    englishName: string;
    arabicName: string;
    gender: string;
    country: string;
    service: ApiService = new ApiService();

    constructor(email: string, password: string, englishName: string, arabicName: string, gender: string, country: string) {
        this.id = this.getNewUserId();
        this.email = email;
        this.password = password;
        this.englishName = englishName;
        this.arabicName = arabicName;
        this.gender = gender;
        this.country = country;
    }

    getNewUserId(): number {
        let users = this.service.getUsers();
        let id = 1;
        users.forEach(user => {
            if (user.id >= id) {
                id = user.id + 1;
            }
        });
        return id;
    }
}

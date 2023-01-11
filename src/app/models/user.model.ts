import { ApiService } from "../services/api.service";

export class User {
    id: number;
    email: string;
    password: string;
    englishName: string;
    arabicName: string;
    gender: string;
    country: string[] = [];
    service: ApiService = new ApiService();

    constructor(email: string, password: string, englishName: string, arabicName: string, gender: string, country: string | string[]) {
        this.id = this.getNewUserId();
        this.email = email;
        this.password = password;
        this.englishName = englishName;
        this.arabicName = arabicName;
        this.gender = gender;
        if (typeof country === "string") {
            this.country.push(country);
        }
        if (country instanceof Array) {
            this.country = country;
        }
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

export class User {
    id: number;
    email: string;
    password: string;
    englishName: string;
    arabicName: string;
    gender: string;
    country: string;

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
        let users: User[] = JSON.parse(localStorage.getItem("users") ?? JSON.stringify([]));
        let id = 1;
        users.forEach(user => {
            if (user.id >= id) {
                id = user.id + 1;
            }
        });
        return id;
    }
}

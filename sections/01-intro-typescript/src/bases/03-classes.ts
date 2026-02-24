import axios from "axios";
import type { CatAPIResponse } from "../interfaces/catapi-response.interface";

export class Animal {

    get imageURL(): string {
        return 'https://placeimg.dev/400?text=' + this.name;
    }

    // Usamos el constructor para la inicialización de las propiedades de la clase
    constructor(
        public readonly id: string | number,
        public name: string, 
        public species: string,
    ) {}

    eat(food : string): string {
        return `${this.name} is eating ${food}`;
    }

    sleep(hours : number): string {
        return `${this.name} is sleeping for ${hours} hours`;
    }

    scream(screamSound: string): string {
        return this.sound(screamSound).toUpperCase();
    }

    speak(speakSound: string): string {
        return this.sound(speakSound);
    }

    async getOrigin(): Promise<string> {
        const { data } = await axios.get<CatAPIResponse>(`https://api.thecatapi.com/v1/images/${this.id}`);
        console.log(data.breeds[0].origin);
        return data.breeds[0].origin;
    }

    private sound(sound:string): string {
        return `${this.name} makes a ${sound} sound`;
    }
}

export const cat = new Animal('0XYvRd7oD', 'Cat', 'Feline');
cat.getOrigin();
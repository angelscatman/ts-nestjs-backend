
export class newAnimal {
    constructor(
        public readonly id: string | number,
        public name: string,
    ) {}

    scream(screamSound: string): string {
        return this.sound(screamSound).toUpperCase();
    }

    speak(speakSound: string): string {
        return this.sound(`${speakSound}, ${speakSound}`);
    }

    sound(sound:string): string {
        return `${this.name} makes a noise that sounds like ${sound}`;
    }
}

const MyDecorator = () => {
    return (_target : Function) => {
        return newAnimal;
    }
}

@MyDecorator()
export class Animal {
    constructor(
        public readonly id: string | number,
        public name: string,
    ) {}

    scream(screamSound: string): string {
        return this.sound(screamSound).toUpperCase();
    }

    speak(speakSound: string): string {
        return this.sound(`${speakSound}, ${speakSound}`);
    }

    sound(sound:string): string {
        return `${this.name} makes a ${sound} sound`;
    }
}

export const cat = new Animal('0XYvRd7oD', 'Cat');

console.log(cat.speak('meow'));
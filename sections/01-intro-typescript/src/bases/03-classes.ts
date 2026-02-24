
export class Animal {

    public id: number;
    public name: string;
    public species: string;

    // Usamos el constructor para la inicialización de las propiedades de la clase
    // Forma tradicional y explicita de definirlo
    constructor(id: number, name: string, species: string) {
        console.log('Creating an animal...');
        this.id = id;
        this.name = name;
        this.species = species;
    }
}

export const cat = new Animal(1, 'Cat', 'Feline');
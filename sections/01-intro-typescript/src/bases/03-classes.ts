
export class Animal {

    // Usamos el constructor para la inicialización de las propiedades de la clase
    constructor(
        public readonly id: number, 
        public name: string, 
        public species: string
    ) {}
}

export const cat = new Animal(1, 'Cat', 'Feline');
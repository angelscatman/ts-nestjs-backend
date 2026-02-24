
export const dataIds = [1, 20, 30, 32, 76, 88];

dataIds.push(100);

// Convertir de string a number con el operador +
dataIds.push(+'101');

// Objecto simple en TypeScript
interface Animals {
    id: number;
    name: string;
    age?: number;
}
// El uso del operador ? es una propiedad opcional, no confundir con el uso de | undefined que requiere si o si el envio de la propiedad
// Una interfaz se refiere de una clase al no poder ser instanciada 

export const cat: Animals = {
    id: 1,
    name: 'Cat',
    age: 2
};

export const animals: Animals[] = [];

animals.push(cat);

console.log(animals);
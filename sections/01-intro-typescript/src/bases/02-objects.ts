
export const dataIds = [1, 20, 30, 32, 76, 88];

dataIds.push(100);

// Convertir de string a number con el operador +
dataIds.push(+'101');

// Objecto simple en TypeScript
export const animal = {
    id: 1,
    name: 'Cat'
};

interface Zoo {
    id: number;
    name: string;
    animals?: typeof animal[];
}
// El uso del operador ? es una propiedad opcional, no confundir con el uso de | undefined que requiere si o si el envio de la propiedad
// Una interfaz se refiere de una clase al no poder ser instanciada 

export const zoo: Zoo = {
    id: 1,
    name: 'Zootopia',
    animals: [animal]
};

console.log(zoo);
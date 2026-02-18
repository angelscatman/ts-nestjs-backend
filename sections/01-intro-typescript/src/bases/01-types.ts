
export let name : string | undefined = "Angel Scatman";
export const age = 24;
export const IsValid = true;

name = "Angel";

// Para comentar usar crtl o cmd + /
// Los backticks permiten crear template strings que son multilineas y permiten interpolar variables usando ${variable}.

export const templateString = `Esto es un string con backticks
multilinea
puede incluir '' y "" sin errores
inyectar valores como ${name}
o expresiones como ${age + 1}`;

console.log(templateString);
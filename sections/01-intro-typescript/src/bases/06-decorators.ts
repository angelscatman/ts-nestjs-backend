
const Deprecated = (deprecationReason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
      // console.log({target})
      return {
        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${ memberName } is deprecated with reason: ${ deprecationReason }`);
            //! Llamar la función propiamente con sus argumentos
            return propertyDescriptor.value.apply(this, args); 
          }
          return wrapperFn;
        }
      }
    }   
}

export class Animal {
    constructor(
        public readonly id: string | number,
        public name: string,
    ) {}

    scream(screamSound: string): string {
        return this.sound(screamSound).toUpperCase();
    }

    @Deprecated('Most use the sound method instead')
    speak(speakSound: string): string {
        return this.sound(`${speakSound}, ${speakSound}`);
    }

    sound(sound:string): string {
        return `${this.name} makes a noise that sounds like ${sound}`;
    }
}

export const cat = new Animal('0XYvRd7oD', 'Cat');

cat.speak('meow');
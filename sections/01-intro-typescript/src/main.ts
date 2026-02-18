import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import {dataIds, animal, zoo} from './bases/02-objects.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Hi, ${ dataIds.join(', ') }!</h1>
    <h2>Animal: ${ animal.name }</h2>
    <h3>En zoo: ${zoo.name} </h3>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more!
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

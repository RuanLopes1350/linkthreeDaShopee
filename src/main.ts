import './global.css'

const params = new URLSearchParams(window.location.search)
const id = parseInt(params.get('id')!);

const nome = document.querySelector<HTMLHeadingElement>('#nome')!
const link1 = document.querySelector<HTMLLinkElement>('#link_1')!
const link2 = document.querySelector<HTMLLinkElement>('#link_2')!
const link3 = document.querySelector<HTMLLinkElement>('#link_3')!
const link4 = document.querySelector<HTMLLinkElement>('#link_4')!
const link5 = document.querySelector<HTMLLinkElement>('#link_5')!
const link6 = document.querySelector<HTMLLinkElement>('#link_6')!

let buscarNoJson = await fetch('http://localhost:3000/usuarios')
let resultado = await buscarNoJson.json()

let usuario = resultado.find((usuario: { id: number; }) => usuario.id === id)

nome.textContent = usuario.nome
link1.href = usuario.link_1
link1.textContent = usuario.link_1_nome

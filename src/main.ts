import './style.css'

const params = new URLSearchParams(window.location.search)
const id = params.get('id') ? parseInt(params.get('id')!) : 1;
console.log('ID do perfil:', id); // Log para debug

const avatar = document.querySelector<HTMLImageElement>('#avatar')!
const nome = document.querySelector<HTMLHeadingElement>('#nome')!
const link1 = document.querySelector<HTMLLinkElement>('#link_1')!
const link2 = document.querySelector<HTMLLinkElement>('#link_2')!
const link3 = document.querySelector<HTMLLinkElement>('#link_3')!
const link4 = document.querySelector<HTMLLinkElement>('#link_4')!
const link5 = document.querySelector<HTMLLinkElement>('#link_5')!
const link6 = document.querySelector<HTMLLinkElement>('#link_6')!
const container = document.querySelector<HTMLDivElement>('.container')!

async function carregarPerfil() {
  try {
    let buscarNoJson = await fetch('http://localhost:3000/usuarios')
    let usuarios = await buscarNoJson.json()
    console.log('Usuários carregados:', usuarios); // Log para debug

    let usuario = usuarios.find((u: any) => u.id === id)
    console.log('Usuário encontrado:', usuario); // Log para debug

    if (!usuario) {
      alert('Usuário não encontrado!')
      return
    }

    // Remover qualquer estilo anterior
    document.body.removeAttribute('style');
    
    // Aplicar background
    if (usuario.imagem_fundo) {
      document.body.style.backgroundImage = `url(${usuario.imagem_fundo})`
      document.body.style.backgroundSize = 'cover'
      document.body.style.backgroundPosition = 'center'
      console.log('Aplicando imagem de fundo:', usuario.imagem_fundo);
    } else if (usuario.cor_fundo_gradiente) {
      document.body.style.background = usuario.cor_fundo_gradiente
      console.log('Aplicando gradiente de fundo:', usuario.cor_fundo_gradiente);
    } else {
      document.body.style.backgroundColor = usuario.cor_fundo || '#f5f5f5'
      console.log('Aplicando cor de fundo:', usuario.cor_fundo);
    }

    // Avatar e nome
    if (usuario.avatar) {
      avatar.src = usuario.avatar
      console.log('Aplicando avatar:', usuario.avatar);
    } else {
      avatar.style.display = 'none'
    }

    nome.textContent = usuario.nome || 'Meus Links'
    nome.style.color = usuario.cor_texto_nome || 'black'
    console.log('Aplicando nome:', usuario.nome, 'com cor:', usuario.cor_texto_nome);

    // Configurar os links
    configurarLink(link1, usuario.link_1, usuario.link_1_nome, usuario)
    configurarLink(link2, usuario.link_2, usuario.link_2_nome, usuario)
    configurarLink(link3, usuario.link_3, usuario.link_3_nome, usuario)
    configurarLink(link4, usuario.link_4, usuario.link_4_nome, usuario)
    configurarLink(link5, usuario.link_5, usuario.link_5_nome, usuario)
    configurarLink(link6, usuario.link_6, usuario.link_6_nome, usuario)

  } catch (error) {
    console.error('Erro ao buscar dados:', error)
    alert('Erro ao carregar os dados do perfil!')
  }
}

function configurarLink(elemento: HTMLLinkElement, url: string, texto: string, usuario: any) {
  if (!url) {
    elemento.style.display = 'none'
    return
  }

  // Limpar estilos anteriores
  elemento.removeAttribute('style');
  
  elemento.href = url
  elemento.textContent = texto || 'Link'
  elemento.style.display = 'block'
  
  // Aplicar estilos do usuário
  elemento.style.backgroundColor = usuario.cor_botao || '#333'
  elemento.style.color = usuario.cor_texto_botao || 'white'
  elemento.style.borderRadius = usuario.border_radius_botao || '0'
  elemento.style.padding = '12px'
  elemento.style.marginBottom = '15px'
  elemento.style.textAlign = 'center'
  elemento.style.textDecoration = 'none'
  elemento.style.width = '100%'
  
  if (usuario.border_botao) {
    elemento.style.border = usuario.border_botao
  }
  
  if (usuario.sombra_botao) {
    elemento.style.boxShadow = usuario.sombra_botao
  }
  
  console.log('Configurando link:', texto, 'com cor:', usuario.cor_botao);
}

carregarPerfil()
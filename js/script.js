// CONTROLE DO CARROSSEL
function mudarSlide(botao, direcao) {
    const container = botao.closest('.carrossel-container');
    const slides = container.querySelector('.slides');
    const total = slides.querySelectorAll('img').length;
    const pontos = container.querySelectorAll('.ponto');
    
    let index = parseInt(container.getAttribute('data-index') || 0);
    index = (index + direcao + total) % total;
    
    slides.style.transform = `translateX(${-index * 100}%)`;
    container.setAttribute('data-index', index);
    
    pontos.forEach((p, i) => p.classList.toggle('ativo', i === index));
}

// LIGHTBOX (ABRIR E FECHAR CORRIGIDO)
function abrirImagem(img) {
    const lightbox = document.getElementById('lightbox');
    const imgFull = document.getElementById('img-full');
    
    // Se for placeholder, avisa
    if(img.src.includes('placeholder')) {
        console.log("Placeholder clicado.");
    }

    imgFull.src = img.src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Trava a rolagem
}

function fecharImagem() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Destrava a rolagem
}

// Fechar ao clicar no fundo
document.getElementById('lightbox').addEventListener('click', function(e) {
    if(e.target === this) fecharImagem();
});

// BUSCA E FILTROS
document.getElementById('buscaModelo').addEventListener('input', function(e) {
    const termo = e.target.value.toLowerCase();
    document.querySelectorAll('.card-vidro').forEach(card => {
        const nome = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = nome.includes(termo) ? 'block' : 'none';
    });
});

const filtros = document.querySelectorAll('.filtro-btn');
filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        filtros.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        const tipo = btn.dataset.tipo;
        
        document.querySelectorAll('.card-vidro').forEach(card => {
            if(tipo === 'todos' || card.dataset.categoria === tipo) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// WHATSAPP
function fazerPedido(modelo) {
    const url = `https://wa.me/5514996402866?text=Tenho interesse no produto: ${modelo}`;
    window.open(url, '_blank');
}
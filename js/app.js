// ==================== DADOS DOS VÍDEOS ====================
const videosData = {
    animais: [
        {
            titulo: "Gatinhos Brincando",
            descricao: "Veja gatinhos fofinhos se divertindo!",
            url: "https://www.tiktok.com/@46robingrau_/video/7596526266455444744",
            tipo: "youtube"
        },
        {
            titulo: "Cachorros Felizes",
            descricao: "Cachorrinhos fazendo coisas engraçadas",
            url: "videos/animais/gatorede2.mp4",
            tipo: "mp4"
        },
        {
            titulo: "Pássaros Cantando",
            descricao: "Ouça os pássaros cantarem lindamente",
            url: "videos/animais/gatorede3.mp4",
            tipo: "mp4"
        }
    ],
    desenhos: [
        {
            titulo: "Como Desenhar um Gato",
            descricao: "Aprenda a desenhar um gatinho fofo",
            url: "https://www.youtube.com/shorts/3B7loUxG-fM?feature=share",
            tipo: "youtube"
        },
        {
            titulo: "Desenhando Flores",
            descricao: "Crie lindas flores coloridas",
            url: "https://www.youtube.com/shorts/1p6HJLnAleo?feature=share",
            tipo: "youtube"
        }
    ],
    musica: [
        {
            titulo: "ABC Musical",
            descricao: "Aprenda o alfabeto cantando",
            url: "https://www.youtube.com/shorts/xmpIm_E8ahQ?feature=share",
            tipo: "youtube"
        },
        {
            titulo: "Músicas de Roda",
            descricao: "Cante e dance as músicas clássicas",
            url: "https://www.youtube.com/shorts/NTb0NHLrXvU?feature=share",
            tipo: "youtube"
        }
    ],
    ciencia: [
        {
            titulo: "Experiência com Cores",
            descricao: "Misture cores e veja a mágica",
            url: "https://www.youtube.com/shorts/UsHk4ZLH_3o?feature=share",
            tipo: "youtube"
        },
        {
            titulo: "Vulcão Caseiro",
            descricao: "Faça um vulcão que explode!",
            url: "https://www.youtube.com/shorts/dfItV6Ql0pc?feature=share",
            tipo: "youtube"
        }
    ],
    historias: [
        {
            titulo: "O Patinho Feio",
            descricao: "Uma história sobre ser diferente",
            url: "https://www.youtube.com/shorts/jluEvdRbNxU?feature=share",
            tipo: "youtube"
        },
        {
            titulo: "Os Três Porquinhos",
            descricao: "A clássica história dos porquinhos",
            url: "https://www.youtube.com/shorts/2nLVedKJatc?feature=share",
            tipo: "youtube"
        }
    ],
    brincadeiras: [
        {
            titulo: "Brincadeiras de Rua",
            descricao: "Vamos brincar ao ar livre!",
            url: "https://www.youtube.com/shorts/5ZbQkhavq6s?feature=share",
            tipo: "youtube"
        },
        {
            titulo: "Jogos Divertidos",
            descricao: "Jogos para brincar com os amigos",
            url: "https://www.youtube.com/shorts/rkvpg9V5sn8?feature=share",
            tipo: "youtube"
        }
    ]
};

// ==================== VARIÁVEIS GLOBAIS ====================
let categoriaAtual = null;
let videosAtuais = [];
let videoAtualIndex = 0;
let touchStartY = 0;
let touchStartX = 0;
let isTransitioning = false;

// ==================== ELEMENTOS DO DOM ====================
const categoriasScreen = document.getElementById('categorias-screen');
const videosScreen = document.getElementById('videos-screen');
const videosContainer = document.querySelector('.videos-container');
const btnVoltar = document.querySelector('.btn-voltar');
const videoAtualSpan = document.querySelector('.video-atual');
const videoTotalSpan = document.querySelector('.video-total');

// ==================== EVENTOS DE CATEGORIA ====================
document.querySelectorAll('.categoria-card').forEach(card => {
    card.addEventListener('click', () => {
        const categoria = card.dataset.categoria;
        abrirCategoria(categoria);
    });
});

// ==================== BOTÃO VOLTAR ====================
btnVoltar.addEventListener('click', voltarParaCategorias);

// ==================== FUNÇÕES PRINCIPAIS ====================

function abrirCategoria(categoria) {
    categoriaAtual = categoria;
    videosAtuais = videosData[categoria] || [];
    videoAtualIndex = 0;
    
    if (videosAtuais.length === 0) {
        alert('Ops! Esta categoria ainda não tem vídeos. Escolha outra!');
        return;
    }
    
    // Atualizar contador
    videoTotalSpan.textContent = videosAtuais.length;
    
    // Criar elementos de vídeo
    criarElementosVideo();
    
    // Mudar para tela de vídeos
    categoriasScreen.classList.remove('active');
    videosScreen.classList.add('active');
    
    // Reproduzir primeiro vídeo
    setTimeout(() => {
        reproduzirVideoAtual();
    }, 300);
}

// function criarElementosVideo() {
//     videosContainer.innerHTML = '';
    
//     videosAtuais.forEach((video, index) => {
//         const videoElement = document.createElement('div');
//         videoElement.className = 'video-item';
//         if (index === 0) videoElement.classList.add('active');
        
//         videoElement.innerHTML = `
//             <video loop playsinline>
//                 <source src="${video.url}" type="video/mp4">
//                 Seu navegador não suporta vídeos.
//             </video>
//             <div class="video-info">
//                 <h2>${video.titulo}</h2>
//                 <p>${video.descricao}</p>
//             </div>
//         `;
        
//         videosContainer.appendChild(videoElement);
//     });
    
//     // Adicionar eventos de toque
//     adicionarEventosToque();
// }

function criarElementosVideo() {
  videosContainer.innerHTML = '';

  videosAtuais.forEach((video, index) => {
    const videoElement = document.createElement('div');
    videoElement.className = 'video-item';
    if (index === 0) videoElement.classList.add('active');

    let mediaHTML = '';

    if (video.tipo === 'mp4') {
      mediaHTML = `
        <video loop autoplay muted playsinline>
          <source src="${video.url}" type="video/mp4">
        </video>
      `;
    }

    if (video.tipo === 'youtube') {
      const videoId = video.url.split('/shorts/')[1];
      mediaHTML = `
        <iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0&playsinline=1"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      `;
    }

    videoElement.innerHTML = `
      ${mediaHTML}
      <div class="video-info">
        <h2>${video.titulo}</h2>
        <p>${video.descricao}</p>
      </div>
    `;

    videosContainer.appendChild(videoElement);
  });

  adicionarEventosToque();
}

// function reproduzirVideoAtual() {
//     const videoItems = document.querySelectorAll('.video-item');
    
//     videoItems.forEach((item, index) => {
//         const video = item.querySelector('video');
        
//         if (index === videoAtualIndex) {
//             item.classList.add('active');
//             video.play().catch(err => console.log('Erro ao reproduzir:', err));
//         } else {
//             item.classList.remove('active');
//             video.pause();
//             video.currentTime = 0;
//         }
//     });
    
//     // Atualizar contador
//     videoAtualSpan.textContent = videoAtualIndex + 1;
// }

function reproduzirVideoAtual() {
  const videoItems = document.querySelectorAll('.video-item');

  videoItems.forEach((item, index) => {
    const video = item.querySelector('video');

    if (index === videoAtualIndex) {
      item.classList.add('active');
      if (video) video.play().catch(() => {});
    } else {
      item.classList.remove('active');
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  });

  videoAtualSpan.textContent = videoAtualIndex + 1;
}

function proximoVideo() {
    if (isTransitioning) return;
    
    if (videoAtualIndex < videosAtuais.length - 1) {
        isTransitioning = true;
        
        const videoAtual = document.querySelectorAll('.video-item')[videoAtualIndex];
        videoAtual.classList.add('slide-up-exit');
        
        setTimeout(() => {
            videoAtualIndex++;
            videoAtual.classList.remove('slide-up-exit', 'active');
            
            const proximoVideo = document.querySelectorAll('.video-item')[videoAtualIndex];
            proximoVideo.classList.add('slide-up-enter');
            
            setTimeout(() => {
                proximoVideo.classList.remove('slide-up-enter');
                reproduzirVideoAtual();
                isTransitioning = false;
            }, 500);
        }, 100);
    }
}

function videoAnterior() {
    if (isTransitioning) return;
    
    if (videoAtualIndex > 0) {
        isTransitioning = true;
        
        const videoAtual = document.querySelectorAll('.video-item')[videoAtualIndex];
        videoAtual.classList.add('slide-down-exit');
        
        setTimeout(() => {
            videoAtualIndex--;
            videoAtual.classList.remove('slide-down-exit', 'active');
            
            const videoAnt = document.querySelectorAll('.video-item')[videoAtualIndex];
            videoAnt.classList.add('slide-down-enter');
            
            setTimeout(() => {
                videoAnt.classList.remove('slide-down-enter');
                reproduzirVideoAtual();
                isTransitioning = false;
            }, 500);
        }, 100);
    }
}

function voltarParaCategorias() {
    // Pausar todos os vídeos
    document.querySelectorAll('video').forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    
    // Voltar para categorias
    videosScreen.classList.remove('active');
    categoriasScreen.classList.add('active');
    
    // Limpar container de vídeos
    setTimeout(() => {
        videosContainer.innerHTML = '';
        categoriaAtual = null;
        videosAtuais = [];
        videoAtualIndex = 0;
    }, 400);
}

// ==================== EVENTOS DE TOQUE ====================
function adicionarEventosToque() {
    videosContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    videosContainer.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;
        
        // Determinar se o movimento foi mais vertical ou horizontal
        if (Math.abs(diffY) > Math.abs(diffX)) {
            // Movimento vertical
            if (Math.abs(diffY) > 50) {
                if (diffY > 0) {
                    // Deslizar para cima - próximo vídeo
                    proximoVideo();
                } else {
                    // Deslizar para baixo - vídeo anterior
                    videoAnterior();
                }
            }
        } else {
            // Movimento horizontal
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Deslizar para esquerda - próximo vídeo (alternativo)
                    proximoVideo();
                } else {
                    // Deslizar para direita - vídeo anterior (alternativo)
                    videoAnterior();
                }
            }
        }
    }, { passive: true });
    
    // Suporte para mouse (desktop)
    let mouseStartY = 0;
    
    videosContainer.addEventListener('mousedown', (e) => {
        mouseStartY = e.clientY;
    });
    
    videosContainer.addEventListener('mouseup', (e) => {
        const mouseEndY = e.clientY;
        const diff = mouseStartY - mouseEndY;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                proximoVideo();
            } else {
                videoAnterior();
            }
        }
    });
}

// ==================== EVENTOS DE TECLADO (PARA DESKTOP) ====================
document.addEventListener('keydown', (e) => {
    if (videosScreen.classList.contains('active')) {
        switch(e.key) {
            case 'ArrowUp':
            case 'ArrowLeft':
                e.preventDefault();
                videoAnterior();
                break;
            case 'ArrowDown':
            case 'ArrowRight':
                e.preventDefault();
                proximoVideo();
                break;
            case 'Escape':
                voltarParaCategorias();
                break;
        }
    }
});

// ==================== INICIALIZAÇÃO ====================
console.log('🎈 KidsTube iniciado com sucesso!');
console.log('📱 Deslize para cima/baixo ou esquerda/direita para navegar');
console.log('⌨️  Use as setas do teclado no desktop');
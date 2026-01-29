# 🎈 KidsTube - App de Vídeos para Crianças

Um aplicativo web simples e divertido estilo TikTok, especialmente desenvolvido para crianças, com navegação por gestos e categorias temáticas.

## 📁 Estrutura de Pastas

```
kids-video-app/
│
├── index.html                 # Página principal do app
│
├── css/
│   └── styles.css            # Estilos com design colorido e animado
│
├── js/
│   └── app.js                # Lógica do aplicativo
│
├── videos/                   # Pasta para armazenar os vídeos
│   ├── animais/             # Vídeos de animais
│   ├── desenhos/            # Tutoriais de desenho
│   ├── musica/              # Músicas e canções
│   ├── ciencia/             # Experimentos científicos
│   ├── historias/           # Contos e histórias
│   └── brincadeiras/        # Jogos e brincadeiras
│
├── tools/
│   └── video-splitter.html  # Ferramenta para dividir vídeos
│
└── README.md                 # Este arquivo
```

## ✨ Funcionalidades

### 📱 App Principal (index.html)
- **Tela de Categorias**: 6 categorias coloridas com ícones atrativos
- **Tela de Vídeos**: Player estilo TikTok com navegação por gestos
- **Navegação Intuitiva**: 
  - 👆 Deslize para cima = próximo vídeo
  - 👇 Deslize para baixo = vídeo anterior
  - 👈👉 Deslize lateralmente também funciona
  - ⌨️ Setas do teclado no desktop
- **Reprodução Automática**: Vídeos começam automaticamente
- **Design Responsivo**: Funciona em celular, tablet e desktop
- **Animações Suaves**: Transições fluidas e divertidas

### 🎬 Ferramenta de Divisão (tools/video-splitter.html)
- Interface amigável para dividir vídeos longos
- Define a duração de cada clipe
- Organiza por categorias
- Preview do vídeo antes de processar
- Barra de progresso animada

## 🚀 Como Usar

### 1. Preparar os Vídeos

#### Opção A: Adicionar vídeos manualmente
1. Coloque seus vídeos nas pastas correspondentes em `/videos/`
2. Atualize o arquivo `js/app.js` com os dados dos novos vídeos

#### Opção B: Usar a ferramenta de divisão
1. Abra `tools/video-splitter.html` no navegador
2. Selecione um vídeo longo (filme, desenho, etc.)
3. Defina a duração de cada clipe (ex: 30 segundos)
4. Escolha a categoria
5. Clique em "Dividir Vídeo"
6. Baixe os clipes gerados
7. Coloque-os na pasta da categoria correspondente

**Nota**: A ferramenta atual é uma simulação. Para divisão real de vídeos, você precisará usar FFmpeg (veja instruções abaixo).

### 2. Executar o App

#### Método 1: Servidor local simples
```bash
# Com Python 3
python -m http.server 8000

# Com Python 2
python -m SimpleHTTPServer 8000

# Com Node.js (se tiver npx)
npx http-server
```

Depois acesse: `http://localhost:8000`

#### Método 2: Extensão do VS Code
- Instale a extensão "Live Server"
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

#### Método 3: Abrir diretamente
- Simplesmente abra `index.html` no navegador
- (Alguns recursos podem não funcionar sem servidor)

## 🎨 Personalização

### Adicionar Novos Vídeos

Edite o arquivo `js/app.js` e adicione os vídeos no objeto `videosData`:

```javascript
const videosData = {
    animais: [
        {
            titulo: "Seu Novo Vídeo",
            descricao: "Descrição do vídeo",
            url: "videos/animais/seu-video.mp4"
        }
        // ... mais vídeos
    ]
    // ... outras categorias
};
```

### Adicionar Nova Categoria

1. **No HTML** (`index.html`), adicione um novo card:
```html
<div class="categoria-card" data-categoria="nova-categoria" style="--delay: 0.6s">
    <div class="categoria-icon">🌟</div>
    <h3>Nova Categoria</h3>
    <p>Descrição</p>
</div>
```

2. **No JavaScript** (`js/app.js`), adicione os dados:
```javascript
const videosData = {
    // ... categorias existentes
    'nova-categoria': [
        {
            titulo: "Vídeo 1",
            descricao: "Descrição",
            url: "videos/nova-categoria/video1.mp4"
        }
    ]
};
```

3. Crie a pasta: `videos/nova-categoria/`

### Mudar Cores

Edite as variáveis CSS em `css/styles.css`:

```css
:root {
    --cor-primaria: #FF6B9D;      /* Rosa principal */
    --cor-secundaria: #FFA07A;    /* Laranja */
    --cor-terciaria: #98D8C8;     /* Verde água */
    --cor-acento: #FFD93D;        /* Amarelo */
    --cor-fundo: #FFF5F7;         /* Fundo */
    --cor-texto: #2C1810;         /* Texto */
}
```

## 🛠️ Divisão Real de Vídeos com FFmpeg

Para realmente dividir vídeos, use FFmpeg:

### Instalar FFmpeg

**Windows**:
```bash
# Baixe de: https://ffmpeg.org/download.html
# Ou use Chocolatey:
choco install ffmpeg
```

**Mac**:
```bash
brew install ffmpeg
```

**Linux**:
```bash
sudo apt install ffmpeg  # Ubuntu/Debian
sudo yum install ffmpeg  # CentOS/RHEL
```

### Dividir um Vídeo

```bash
# Dividir vídeo em clipes de 30 segundos
ffmpeg -i video-original.mp4 -c copy -map 0 -segment_time 30 -f segment -reset_timestamps 1 output_clip_%03d.mp4

# Dividir vídeo mantendo qualidade
ffmpeg -i video-original.mp4 -c:v libx264 -c:a aac -segment_time 30 -f segment output_clip_%03d.mp4
```

### Script Python para Automatizar

Crie um arquivo `split_video.py`:

```python
import subprocess
import sys

def split_video(input_file, clip_duration, output_prefix):
    """Divide um vídeo em clipes menores"""
    
    command = [
        'ffmpeg',
        '-i', input_file,
        '-c', 'copy',
        '-map', '0',
        '-segment_time', str(clip_duration),
        '-f', 'segment',
        '-reset_timestamps', '1',
        f'{output_prefix}_%03d.mp4'
    ]
    
    try:
        subprocess.run(command, check=True)
        print(f"✅ Vídeo dividido com sucesso!")
    except subprocess.CalledProcessError:
        print(f"❌ Erro ao dividir vídeo")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python split_video.py <video> <duração_segundos> <prefixo_saida>")
        print("Exemplo: python split_video.py filme.mp4 30 animais_clip")
        sys.exit(1)
    
    input_file = sys.argv[1]
    duration = int(sys.argv[2])
    prefix = sys.argv[3]
    
    split_video(input_file, duration, prefix)
```

**Uso**:
```bash
python split_video.py meu-video.mp4 30 videos/animais/clip
```

## 📱 Compatibilidade

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Navegadores mobile (iOS/Android)

## 🎯 Recursos Técnicos

- **HTML5 Video API**: Reprodução de vídeos
- **Touch Events**: Navegação por gestos
- **CSS Animations**: Animações suaves
- **Responsive Design**: Adaptável a qualquer tela
- **JavaScript Vanilla**: Sem dependências externas

## 🔒 Segurança para Crianças

- ✅ Sem anúncios
- ✅ Sem links externos
- ✅ Conteúdo controlado pelos pais
- ✅ Interface simples e segura
- ✅ Offline após carregar

## 📝 Dicas de Uso

1. **Tamanho dos Vídeos**: Mantenha entre 15-60 segundos
2. **Formato**: Use MP4 para melhor compatibilidade
3. **Qualidade**: 720p é suficiente para mobile
4. **Nomes**: Use nomes descritivos sem espaços
5. **Conteúdo**: Sempre verifique o conteúdo antes de adicionar

## 🐛 Solução de Problemas

### Vídeos não carregam
- Verifique se os arquivos estão nas pastas corretas
- Confirme que os caminhos em `app.js` estão corretos
- Use um servidor local (não abra o HTML diretamente)

### Gestos não funcionam
- Certifique-se de estar usando um dispositivo touch
- No desktop, use as setas do teclado
- Verifique se o JavaScript está habilitado

### Performance lenta
- Reduza a resolução dos vídeos
- Otimize o tamanho dos arquivos
- Use menos vídeos por categoria

## 📄 Licença

Este projeto é livre para uso pessoal e educacional. Divirta-se! 🎉

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas!

---

**Desenvolvido com ❤️ para crianças felizes!**
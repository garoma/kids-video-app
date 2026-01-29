# 📹 Pasta de Vídeos

Esta pasta contém todos os vídeos organizados por categoria.

## 📂 Estrutura

Cada categoria tem sua própria pasta:

- **animais/** - Vídeos de bichinhos, natureza, documentários infantis
- **desenhos/** - Tutoriais de desenho, arte para crianças
- **musica/** - Músicas infantis, karaokê, instrumentos
- **ciencia/** - Experimentos, curiosidades científicas
- **historias/** - Contos, fábulas, histórias animadas
- **brincadeiras/** - Jogos, brincadeiras, atividades

## ➕ Como Adicionar Vídeos

1. **Coloque o arquivo de vídeo** na pasta da categoria correspondente
   - Exemplo: `animais/gatinhos-fofos.mp4`

2. **Atualize o arquivo** `js/app.js` com as informações do vídeo:

```javascript
const videosData = {
    animais: [
        {
            titulo: "Gatinhos Fofos",
            descricao: "Veja gatinhos brincando!",
            url: "videos/animais/gatinhos-fofos.mp4"
        }
    ]
};
```

## 📏 Especificações Recomendadas

### Formato
- **Tipo**: MP4 (H.264 + AAC)
- **Resolução**: 720p (1280x720) ou 480p (854x480)
- **Proporção**: 16:9 (paisagem) ou 9:16 (retrato)
- **Taxa de Bits**: 2-5 Mbps

### Duração
- **Mínimo**: 5 segundos
- **Ideal**: 15-60 segundos
- **Máximo**: 5 minutos

### Tamanho
- **Ideal**: 5-20 MB por vídeo
- **Máximo**: 50 MB

## 🎬 Converter Vídeos com FFmpeg

### Converter para MP4 otimizado
```bash
ffmpeg -i video-original.mov -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k output.mp4
```

### Redimensionar para 720p
```bash
ffmpeg -i video-original.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 -c:a aac output-720p.mp4
```

### Cortar vídeo (30 segundos a partir de 1:00)
```bash
ffmpeg -i video-original.mp4 -ss 00:01:00 -t 00:00:30 -c copy output-cortado.mp4
```

### Reduzir tamanho do arquivo
```bash
ffmpeg -i video-grande.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 96k output-pequeno.mp4
```

## ✅ Checklist Antes de Adicionar

- [ ] Vídeo está no formato MP4
- [ ] Duração adequada (15-60s)
- [ ] Conteúdo apropriado para crianças
- [ ] Áudio claro e em bom volume
- [ ] Sem marcas d'água indesejadas
- [ ] Arquivo não é muito grande (< 50 MB)
- [ ] Nome do arquivo descritivo e sem espaços
- [ ] Adicionado ao `js/app.js`

## 🎨 Fontes de Vídeos Gratuitos

### Sites Seguros
- **Pexels Videos** - pexels.com/videos
- **Pixabay** - pixabay.com/videos
- **Videvo** - videvo.net
- **Mixkit** - mixkit.co

### YouTube (com permissão)
Use ferramentas para baixar apenas vídeos com licença Creative Commons:
```bash
yt-dlp -f "best[ext=mp4]" URL_DO_VIDEO
```

## ⚠️ Direitos Autorais

**IMPORTANTE**: Certifique-se de ter permissão para usar todos os vídeos. Use apenas:
- Vídeos próprios
- Vídeos com licença Creative Commons
- Vídeos de domínio público
- Vídeos comprados/licenciados

## 📝 Exemplo de Nomenclatura

Bons nomes de arquivo:
- ✅ `cachorros-brincando-parque.mp4`
- ✅ `como-desenhar-gato.mp4`
- ✅ `musica-abc-infantil.mp4`

Evite:
- ❌ `video (1).mp4`
- ❌ `VID_20240101_123456.mp4`
- ❌ `Download Filme HD.mp4`

---

**Dica**: Comece com 3-5 vídeos por categoria e adicione mais conforme necessário!
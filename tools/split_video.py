#!/usr/bin/env python3
"""
KidsTube Video Splitter
Ferramenta para dividir vídeos longos em clipes pequenos
"""

import subprocess
import os
import sys
import json
from pathlib import Path

# Configurações
CATEGORIAS = ['animais', 'desenhos', 'musica', 'ciencia', 'historias', 'brincadeiras']
VIDEOS_DIR = '../videos'

class VideoSplitter:
    def __init__(self):
        self.check_ffmpeg()
    
    def check_ffmpeg(self):
        """Verifica se FFmpeg está instalado"""
        try:
            subprocess.run(['ffmpeg', '-version'], 
                         stdout=subprocess.PIPE, 
                         stderr=subprocess.PIPE, 
                         check=True)
            print("✅ FFmpeg encontrado!")
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("❌ FFmpeg não encontrado!")
            print("\nInstale o FFmpeg:")
            print("  Windows: choco install ffmpeg")
            print("  Mac: brew install ffmpeg")
            print("  Linux: sudo apt install ffmpeg")
            sys.exit(1)
    
    def get_video_info(self, video_path):
        """Obtém informações do vídeo"""
        cmd = [
            'ffprobe',
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            video_path
        ]
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            data = json.loads(result.stdout)
            
            duration = float(data['format']['duration'])
            video_stream = next(s for s in data['streams'] if s['codec_type'] == 'video')
            width = video_stream['width']
            height = video_stream['height']
            
            return {
                'duration': duration,
                'width': width,
                'height': height,
                'format': data['format']['format_name']
            }
        except Exception as e:
            print(f"❌ Erro ao obter informações do vídeo: {e}")
            return None
    
    def format_time(self, seconds):
        """Formata segundos em MM:SS"""
        mins = int(seconds // 60)
        secs = int(seconds % 60)
        return f"{mins:02d}:{secs:02d}"
    
    def split_video(self, input_file, clip_duration, categoria, prefix=None):
        """Divide o vídeo em clipes menores"""
        
        # Validar categoria
        if categoria not in CATEGORIAS:
            print(f"❌ Categoria inválida! Use uma dessas: {', '.join(CATEGORIAS)}")
            return False
        
        # Verificar se arquivo existe
        if not os.path.exists(input_file):
            print(f"❌ Arquivo não encontrado: {input_file}")
            return False
        
        # Obter informações do vídeo
        print(f"\n📹 Analisando vídeo...")
        info = self.get_video_info(input_file)
        if not info:
            return False
        
        duration = info['duration']
        num_clips = int(duration / clip_duration) + (1 if duration % clip_duration > 5 else 0)
        
        print(f"\n📊 Informações do Vídeo:")
        print(f"   Duração total: {self.format_time(duration)}")
        print(f"   Resolução: {info['width']}x{info['height']}")
        print(f"   Formato: {info['format']}")
        print(f"   Clipes a gerar: {num_clips}")
        print(f"   Duração por clipe: {clip_duration}s")
        
        # Confirmar
        resposta = input(f"\n🤔 Continuar? (s/n): ").lower()
        if resposta != 's':
            print("❌ Operação cancelada.")
            return False
        
        # Criar diretório de saída
        output_dir = Path(VIDEOS_DIR) / categoria
        output_dir.mkdir(parents=True, exist_ok=True)
        
        # Definir prefixo
        if not prefix:
            prefix = Path(input_file).stem.replace(' ', '-').lower()
        
        # Dividir vídeo
        print(f"\n✂️  Dividindo vídeo...\n")
        
        clips_info = []
        
        for i in range(num_clips):
            start_time = i * clip_duration
            
            # Não criar clipe muito pequeno no final
            if start_time + 5 > duration:
                break
            
            output_file = output_dir / f"{prefix}_parte{i+1:02d}.mp4"
            
            cmd = [
                'ffmpeg',
                '-i', input_file,
                '-ss', str(start_time),
                '-t', str(clip_duration),
                '-c:v', 'libx264',
                '-preset', 'medium',
                '-crf', '23',
                '-c:a', 'aac',
                '-b:a', '128k',
                '-y',  # Sobrescrever sem perguntar
                str(output_file)
            ]
            
            print(f"[{i+1}/{num_clips}] Processando: {output_file.name}")
            
            try:
                subprocess.run(cmd, 
                             stdout=subprocess.PIPE, 
                             stderr=subprocess.PIPE, 
                             check=True)
                
                end_time = min(start_time + clip_duration, duration)
                
                clips_info.append({
                    'titulo': f"{prefix.replace('-', ' ').title()} - Parte {i+1}",
                    'descricao': f"Parte {i+1} de {num_clips}",
                    'url': f"videos/{categoria}/{output_file.name}",
                    'start': self.format_time(start_time),
                    'end': self.format_time(end_time)
                })
                
                print(f"   ✅ Criado: {self.format_time(start_time)} → {self.format_time(end_time)}")
                
            except subprocess.CalledProcessError as e:
                print(f"   ❌ Erro ao processar clipe {i+1}")
                continue
        
        # Exibir resultados
        print(f"\n{'='*60}")
        print(f"✅ VÍDEO DIVIDIDO COM SUCESSO!")
        print(f"{'='*60}")
        print(f"\n📁 Localização: {output_dir}")
        print(f"📊 Clipes gerados: {len(clips_info)}")
        
        # Gerar código JavaScript
        print(f"\n{'='*60}")
        print(f"📝 ADICIONE ESTE CÓDIGO AO SEU js/app.js:")
        print(f"{'='*60}\n")
        
        print(f"// Adicione dentro de videosData.{categoria}:")
        for clip in clips_info:
            print(f"""    {{
        titulo: "{clip['titulo']}",
        descricao: "{clip['descricao']}",
        url: "{clip['url']}"
    }},""")
        
        print(f"\n{'='*60}")
        
        # Salvar em arquivo
        info_file = output_dir / f"{prefix}_clips_info.txt"
        with open(info_file, 'w', encoding='utf-8') as f:
            f.write(f"INFORMAÇÕES DOS CLIPES\n")
            f.write(f"={'='*60}\n\n")
            f.write(f"Vídeo original: {input_file}\n")
            f.write(f"Categoria: {categoria}\n")
            f.write(f"Clipes gerados: {len(clips_info)}\n\n")
            
            f.write(f"CÓDIGO PARA js/app.js:\n")
            f.write(f"{'='*60}\n\n")
            
            for clip in clips_info:
                f.write(f"""{{
    titulo: "{clip['titulo']}",
    descricao: "{clip['descricao']}",
    url: "{clip['url']}"
}},\n""")
        
        print(f"\n💾 Informações salvas em: {info_file}")
        print(f"\n🎉 Pronto! Agora você pode usar os vídeos no KidsTube!")
        
        return True


def print_help():
    """Exibe ajuda"""
    print("""
🎬 KidsTube Video Splitter
═══════════════════════════════════════════════════════════

USO:
  python split_video.py <arquivo> <duração> <categoria> [prefixo]

ARGUMENTOS:
  arquivo    - Caminho do vídeo a ser dividido
  duração    - Duração de cada clipe em segundos (15-300)
  categoria  - Uma das categorias: animais, desenhos, musica, ciencia, historias, brincadeiras
  prefixo    - (Opcional) Prefixo para os nomes dos arquivos

EXEMPLOS:
  python split_video.py filme.mp4 30 animais
  python split_video.py desenho.mp4 45 desenhos meu-desenho
  python split_video.py musica.mp4 60 musica

CATEGORIAS DISPONÍVEIS:
  🐾 animais        - Vídeos de bichinhos e natureza
  🎨 desenhos       - Tutoriais de desenho e arte
  🎵 musica         - Músicas e canções infantis
  🔬 ciencia        - Experimentos científicos
  📚 historias      - Contos e histórias
  🎮 brincadeiras   - Jogos e atividades

REQUISITOS:
  • FFmpeg instalado no sistema
  • Python 3.6+

═══════════════════════════════════════════════════════════
""")


def main():
    """Função principal"""
    
    # Verificar argumentos
    if len(sys.argv) < 4:
        print_help()
        sys.exit(1)
    
    # Parsear argumentos
    input_file = sys.argv[1]
    
    try:
        clip_duration = int(sys.argv[2])
        if not (5 <= clip_duration <= 300):
            print("❌ Duração deve estar entre 5 e 300 segundos")
            sys.exit(1)
    except ValueError:
        print("❌ Duração deve ser um número inteiro")
        sys.exit(1)
    
    categoria = sys.argv[3]
    prefix = sys.argv[4] if len(sys.argv) > 4 else None
    
    # Executar
    print("\n🎬 KidsTube Video Splitter")
    print("="*60)
    
    splitter = VideoSplitter()
    success = splitter.split_video(input_file, clip_duration, categoria, prefix)
    
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
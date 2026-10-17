#!/usr/bin/env bash
set -e

BOLD_FONT="/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
REG_FONT="/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"

echo "Generating 1200x630 og-image.png..."

# Create high-resolution social preview image matching corporate purple & white identity
convert -size 1200x630 xc:"#240742" \
  \( -size 1200x630 radial-gradient:"#6D32A5"-"#240742" \) -compose screen -composite \
  -fill "#9047DE" -draw "rectangle 0,0 1200,8" \
  -fill "#F0E7FC" -stroke "#6D32A5" -strokewidth 2 \
  -draw "roundrectangle 76,46 510,88 20,20" \
  -stroke none -fill "#10B981" -draw "circle 98,67 104,67" \
  -font "$BOLD_FONT" -fill "#4B197A" -pointsize 14 \
  -annotate +114+72 "TRAYECTORIA EN SALUD Y SECTOR COMERCIAL" \
  -font "$BOLD_FONT" -fill "#FFFFFF" -pointsize 54 \
  -annotate +76+162 "Eber Ruiz Zamora" \
  -font "$BOLD_FONT" -fill "#D8B4FE" -pointsize 26 \
  -annotate +76+208 "Ingeniero de Sistemas · 20+ Años de Experiencia" \
  -stroke "#6D32A5" -strokewidth 1.5 -fill "#34105B" \
  -draw "roundrectangle 76,236 416,334 16,16" \
  -draw "roundrectangle 436,236 776,334 16,16" \
  -draw "roundrectangle 76,350 416,448 16,16" \
  -draw "roundrectangle 436,350 776,448 16,16" \
  -stroke none -fill "#FFFFFF" -font "$BOLD_FONT" -pointsize 18 \
  -annotate +96+274 "Excel & Power Query" \
  -annotate +456+274 "Power BI & SQL" \
  -annotate +96+388 "Inventarios Farmacéuticos" \
  -annotate +456+388 "Soporte & Mantenimiento TI" \
  -fill "#E9D8FD" -font "$REG_FONT" -pointsize 14 \
  -annotate +96+304 "Automatización y modelado de datos" \
  -annotate +456+304 "Tableros dinámicos y analítica" \
  -annotate +96+418 "Semaforización, vencimientos y lotes" \
  -annotate +456+418 "Diagnóstico, optimización y redes" \
  -stroke "#6D32A5" -strokewidth 1.5 -fill "#2C0B52" \
  -draw "roundrectangle 820,110 1124,470 24,24" \
  -stroke "#9047DE" -strokewidth 2 -fill "#4B197A" \
  -draw "roundrectangle 880,140 1064,300 24,24" \
  -stroke none -fill "#FFFFFF" -font "$BOLD_FONT" -pointsize 68 \
  -annotate +922+244 "ER" \
  -fill "#FFFFFF" -font "$BOLD_FONT" -pointsize 20 \
  -annotate +866+338 "Eber Ruiz Zamora" \
  -fill "#C084FC" -font "$REG_FONT" -pointsize 15 \
  -annotate +862+368 "Consultor TI Independiente" \
  -fill "#4B197A" -stroke "#6D32A5" -strokewidth 1 \
  -draw "roundrectangle 860,392 1084,432 16,16" \
  -stroke none -fill "#F0E7FC" -font "$BOLD_FONT" -pointsize 13 \
  -annotate +884+418 "Ética · Datos · Resultados" \
  -fill "#2D0A54" -draw "rectangle 0,550 1200,630" \
  -fill "#6D32A5" -draw "rectangle 0,548 1200,550" \
  -fill "#E9D8FD" -font "$REG_FONT" -pointsize 16 \
  -annotate +76+594 "Cartagena de Indias, Bolívar · Cobertura Presencial y Remota (Colombia)" \
  -fill "#34D399" -font "$BOLD_FONT" -pointsize 16 \
  -annotate +740+594 "WhatsApp: +57 302 310 5047 · ruzae1@gmail.com" \
  public/og-image.png

echo "Generating favicon.svg..."
cat << 'EOF' > public/favicon.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="favGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4B197A" />
      <stop offset="100%" stop-color="#6D32A5" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="url(#favGrad)" />
  <rect x="2" y="2" width="60" height="60" rx="14" fill="none" stroke="#F0E7FC" stroke-opacity="0.3" stroke-width="2" />
  <text x="32" y="42" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="26" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
    ER
  </text>
  <circle cx="50" cy="14" r="4" fill="#34D399" />
</svg>
EOF

echo "Generating favicon-32x32.png and apple-touch-icon.png..."
convert -size 64x64 xc:"#4B197A" \
  -fill "#6D32A5" -draw "roundrectangle 0,0 64,64 16,16" \
  -font "$BOLD_FONT" -fill "#FFFFFF" -pointsize 26 -annotate +14+42 "ER" \
  -fill "#34D399" -draw "circle 50,14 53,14" \
  public/apple-touch-icon.png

convert public/apple-touch-icon.png -resize 32x32 public/favicon-32x32.png
convert public/apple-touch-icon.png -resize 16x16 public/favicon-16x16.png
convert public/favicon-32x32.png public/favicon.ico

echo "Asset generation complete!"

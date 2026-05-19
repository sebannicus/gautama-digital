import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "../..");
const carouselsDir = path.join(root, ".agents", "carousels");

const poseBase = "../../../_media/gautama-poses/";
const logo = "../../../imagenes%20para%20historias/gautama_reel.png";

const posts = [
  {
    slug: "2026-05-19-01-dashboard-clientes-reales",
    area: "Inteligencia de negocios",
    title: "Los datos tambien pueden ser amables",
    subtitle: "Un tablero no es para controlar. Es para comprender con calma que camino trae clientes reales.",
    heroPose: "pose-chart.png",
    heroLayout: "right",
    slides: [
      {
        pose: "pose-laptop.png",
        layout: "left",
        title: "Mira el camino, no solo el numero",
        body: "Las visitas importan menos cuando no sabes cuales terminan en una conversacion real."
      },
      {
        pose: "pose-think.png",
        layout: "right",
        title: "Cada canal cuenta una historia",
        body: "Google, Instagram, WhatsApp y referidos muestran senales distintas. Juntas, revelan donde poner energia."
      },
      {
        pose: "pose-heart.png",
        layout: "left",
        title: "Decidir con calma es decidir mejor",
        body: "Cuando el dato esta ordenado, el marketing deja de sentirse como apuesta y empieza a sentirse como direccion."
      },
      {
        pose: "pose-meditate.png",
        layout: "right",
        title: "Un buen tablero susurra el siguiente paso",
        body: "No necesitas mirar veinte graficos. Necesitas ver que cambio y que accion conviene tomar hoy."
      }
    ],
    ctaTitle: "Ordenemos tus datos sin perder humanidad",
    ctaBody: "Gautama Digital convierte presencia, datos y automatizacion en decisiones mas claras para negocios locales.",
    caption: `Los datos tambien pueden ser amables.

Un tablero no deberia hacerte sentir perdido. Deberia ayudarte a respirar, mirar con calma y entender que canal esta trayendo conversaciones reales.

La inteligencia de negocios no es frialdad. Es claridad para cuidar mejor tu energia, tu presupuesto y tus oportunidades.

Diagnostico gratuito -> Link en bio

#GautamaDigital #InteligenciaDeNegocios #Dashboard #MarketingDigital #GA4 #NegociosLocales`
  },
  {
    slug: "2026-05-19-02-web-que-convierte",
    area: "Marketing digital",
    title: "Tu web puede recibir con calma",
    subtitle: "No se trata de empujar. Se trata de guiar a una persona hasta que entienda por que confiar.",
    heroPose: "pose-book.png",
    heroLayout: "left",
    slides: [
      {
        pose: "pose-meditate.png",
        layout: "right",
        title: "Claridad antes que ruido",
        body: "Una web que convierte responde rapido: que haces, para quien es y cual es el siguiente paso."
      },
      {
        pose: "pose-heart.png",
        layout: "left",
        title: "La confianza tambien se disena",
        body: "Orden visual, palabras simples y pruebas reales hacen que el cliente avance sin sentirse presionado."
      },
      {
        pose: "pose-laptop.png",
        layout: "right",
        title: "Cada clic deberia tener sentido",
        body: "Botones, formularios y WhatsApp deben trabajar como una ruta amable, no como piezas sueltas."
      },
      {
        pose: "pose-chart.png",
        layout: "left",
        title: "Medir es escuchar",
        body: "Si sabes donde se detienen las personas, puedes mejorar la experiencia antes de pedir mas trafico."
      }
    ],
    ctaTitle: "Hagamos que tu web trabaje con serenidad",
    ctaBody: "Disenamos presencia digital clara, medible y conectada con oportunidades comerciales reales.",
    caption: `Tu web puede recibir a las personas con calma.

No necesita gritar para vender. Necesita explicar bien, generar confianza y abrir un camino simple hacia la conversacion.

El marketing digital se vuelve mas poderoso cuando deja de perseguir y empieza a guiar.

Diagnostico gratuito -> Link en bio

#GautamaDigital #DisenoWeb #MarketingDigital #PaginaWeb #NegociosLocales #Coquimbo #LaSerena`
  },
  {
    slug: "2026-05-20-01-seguimiento-automatico-clientes",
    area: "Automatizaciones",
    title: "Seguir no es presionar",
    subtitle: "Es cuidar una conversacion que todavia puede convertirse en confianza, venta y relacion.",
    heroPose: "pose-heart.png",
    heroLayout: "right",
    slides: [
      {
        pose: "pose-think.png",
        layout: "left",
        title: "Un recordatorio puede ser un gesto",
        body: "Cuando alguien pidio informacion, un seguimiento oportuno demuestra orden y atencion."
      },
      {
        pose: "pose-book.png",
        layout: "right",
        title: "El tiempo correcto cambia el tono",
        body: "Automatizar no es insistir cada hora. Es aparecer con respeto cuando la decision sigue viva."
      },
      {
        pose: "pose-laptop.png",
        layout: "left",
        title: "Tu equipo recupera contexto",
        body: "Cada contacto queda ordenado: que pregunto, que recibio y que falta para ayudarle mejor."
      },
      {
        pose: "pose-meditate.png",
        layout: "right",
        title: "La tecnologia debe saber detenerse",
        body: "Un buen flujo deriva a una persona cuando hace falta criterio humano. Ahi la automatizacion se vuelve sabia."
      }
    ],
    ctaTitle: "Automatizar tambien puede sentirse cercano",
    ctaBody: "Creamos flujos simples para WhatsApp, CRM y seguimiento comercial sin perder el tono humano.",
    caption: `Automatizar seguimiento no es perseguir.

Es cuidar conversaciones que quedaron abiertas, recordar con respeto y ordenar el contexto para que cada cliente reciba una mejor respuesta.

La tecnologia se vuelve valiosa cuando hace espacio para una atencion mas humana.

Diagnostico gratuito -> Link en bio

#GautamaDigital #Automatizacion #CRM #Ventas #WhatsAppBusiness #NegociosLocales`
  },
  {
    slug: "2026-05-20-02-contenido-autoridad-local",
    area: "Marketing digital",
    title: "La autoridad tambien puede ser cercana",
    subtitle: "El contenido no tiene que gritar para que alguien confie. Puede ensenar, acompanar y abrir criterio.",
    heroPose: "pose-book.png",
    heroLayout: "right",
    slides: [
      {
        pose: "pose-book.png",
        layout: "left",
        title: "Ensenar atrae mejor que insistir",
        body: "Cuando explicas con generosidad, las personas entienden tu criterio antes de pedir una cotizacion."
      },
      {
        pose: "pose-think.png",
        layout: "right",
        title: "Repetir con intencion crea memoria",
        body: "No publiques al azar. Vuelve a tus ideas centrales desde distintos angulos hasta que tu marca sea reconocible."
      },
      {
        pose: "pose-chart.png",
        layout: "left",
        title: "Mostrar proceso construye confianza",
        body: "La autoridad nace cuando el cliente puede ver como piensas, que mides y por que recomiendas cada paso."
      },
      {
        pose: "pose-heart.png",
        layout: "right",
        title: "La cercania tambien vende",
        body: "Un mensaje amable reduce distancia. La sabiduria del contenido esta en hacerlo facil de entender."
      }
    ],
    ctaTitle: "Construyamos un feed con presencia y criterio",
    ctaBody: "Gautama Digital ordena contenido, medicion y automatizacion para que tu marca comunique con calma.",
    caption: `La autoridad no necesita gritar.

Una marca local puede crecer ensenando, mostrando criterio y repitiendo sus ideas con calma hasta que las personas entiendan por que confiar.

El contenido tambien puede ser una forma de servicio.

Diagnostico gratuito -> Link en bio

#GautamaDigital #MarketingDigital #Contenido #MarcaDigital #NegociosLocales #Chile`
  }
];

function esc(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function poseUrl(file) {
  return `${poseBase}${encodeURIComponent(file)}`;
}

function slide(post, item, index) {
  return `        <div class="slide teach layout-${item.layout}">
          <div class="slide-inner" style="--pose: url('${poseUrl(item.pose)}');">
            <div class="aura"></div>
            <div class="gautama"></div>
            <div class="copy-panel">
              <p class="kicker">${esc(post.area)}</p>
              <span class="num">0${index}</span>
              <h2>${esc(item.title)}</h2>
              <p class="body-copy">${esc(item.body)}</p>
            </div>
            <span class="slide-count">${index + 1} / 6</span>
            <span class="brand-seal"></span>
          </div>
        </div>`;
}

function html(post) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Gautama Digital - ${esc(post.title)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');
    :root {
      --W: 1080px;
      --H: 1350px;
      --S: 0.5;
      --cyan: #23E7FF;
      --cyan-soft: #89F5FF;
      --blue: #0573D9;
      --deep: #020817;
      --mid: #061936;
      --ink: #EAFBFF;
      --muted: #A6DCEC;
      --logo: url('${logo}');
    }
    * { box-sizing: border-box; margin: 0; padding: 0; letter-spacing: 0; }
    body {
      background: #05070d;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 48px 20px;
      font-family: Lato, Arial, sans-serif;
    }
    .carousel-wrapper {
      position: relative;
      width: calc(var(--W) * var(--S));
      height: calc(var(--H) * var(--S));
    }
    .carousel {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 6px;
      box-shadow: 0 26px 90px rgba(0,0,0,.66);
      background: var(--deep);
    }
    .slides-wrapper {
      display: flex;
      height: 100%;
      transition: transform .38s cubic-bezier(.4,0,.2,1);
    }
    .slide {
      width: calc(var(--W) * var(--S));
      height: calc(var(--H) * var(--S));
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }
    .slide-inner {
      width: var(--W);
      height: var(--H);
      transform: scale(var(--S));
      transform-origin: top left;
      position: absolute;
      inset: 0 auto auto 0;
      overflow: hidden;
      background:
        radial-gradient(circle at 72% 18%, rgba(35,231,255,.2), transparent 26%),
        radial-gradient(circle at 24% 78%, rgba(5,115,217,.34), transparent 30%),
        linear-gradient(155deg, #010613 0%, #03122B 48%, #061B3D 100%);
    }
    .slide-inner::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle, rgba(137,245,255,.9) 0 1px, transparent 1.8px) 30px 44px / 112px 112px,
        radial-gradient(circle, rgba(5,115,217,.65) 0 1px, transparent 2px) 18px 20px / 72px 72px,
        linear-gradient(90deg, transparent 0 94%, rgba(35,231,255,.12) 95% 96%, transparent 97%) 0 0 / 92px 92px,
        linear-gradient(0deg, transparent 0 94%, rgba(35,231,255,.08) 95% 96%, transparent 97%) 0 0 / 92px 92px;
      opacity: .5;
      z-index: 1;
    }
    .slide-inner::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 2;
      background:
        linear-gradient(90deg, rgba(2,8,23,.9), rgba(2,8,23,.22) 48%, rgba(2,8,23,.82)),
        radial-gradient(circle at 50% 50%, transparent 0 44%, rgba(2,8,23,.45) 72%, rgba(0,0,0,.6) 100%);
      pointer-events: none;
    }
    .aura {
      position: absolute;
      width: 760px;
      height: 760px;
      border-radius: 50%;
      border: 2px solid rgba(35,231,255,.28);
      box-shadow: inset 0 0 42px rgba(35,231,255,.12), 0 0 60px rgba(35,231,255,.14);
      z-index: 3;
    }
    .aura::before,
    .aura::after {
      content: "";
      position: absolute;
      border-radius: 50%;
      inset: 58px;
      border: 1px solid rgba(137,245,255,.28);
    }
    .aura::after { inset: 118px; opacity: .7; }
    .gautama {
      position: absolute;
      z-index: 4;
      width: 600px;
      height: 520px;
      background: var(--pose) center bottom / contain no-repeat;
      filter: drop-shadow(0 0 32px rgba(35,231,255,.72)) drop-shadow(0 0 90px rgba(5,115,217,.54));
      mix-blend-mode: screen;
    }
    .copy-panel {
      position: absolute;
      z-index: 8;
      width: 604px;
      padding: 42px 44px 48px;
      border: 1px solid rgba(137,245,255,.26);
      border-left: 5px solid var(--cyan);
      border-radius: 8px;
      background: linear-gradient(145deg, rgba(2,8,23,.86), rgba(5,25,54,.74));
      box-shadow: 0 24px 70px rgba(0,0,0,.38), inset 0 0 32px rgba(35,231,255,.08);
      backdrop-filter: blur(7px);
    }
    .kicker {
      color: var(--cyan-soft);
      font-size: 25px;
      line-height: 1.2;
      font-weight: 900;
      text-transform: uppercase;
      margin-bottom: 24px;
    }
    h1, h2 {
      color: white;
      font-weight: 900;
      text-wrap: balance;
    }
    h1 {
      font-size: 82px;
      line-height: 1.04;
      max-width: 740px;
      margin-bottom: 28px;
    }
    h2 {
      font-size: 62px;
      line-height: 1.09;
      margin: 16px 0 24px;
    }
    .body-copy,
    .subtitle,
    .cta-copy {
      color: rgba(234,251,255,.82);
      font-size: 34px;
      line-height: 1.42;
      font-weight: 400;
    }
    .subtitle { max-width: 650px; }
    .num {
      display: block;
      color: var(--cyan);
      font-size: 112px;
      line-height: .82;
      font-weight: 900;
      text-shadow: 0 0 26px rgba(35,231,255,.5);
    }
    .slide-count {
      position: absolute;
      left: 74px;
      bottom: 58px;
      z-index: 10;
      color: rgba(166,220,236,.86);
      font-size: 24px;
      font-weight: 700;
    }
    .brand-seal {
      position: absolute;
      right: 56px;
      bottom: 48px;
      z-index: 10;
      width: 116px;
      height: 116px;
      border-radius: 50%;
      background: var(--logo) center / cover no-repeat;
      border: 1px solid rgba(137,245,255,.38);
      box-shadow: 0 0 32px rgba(35,231,255,.32);
      opacity: .95;
    }
    .layout-right .copy-panel { left: 70px; top: 88px; }
    .layout-right .gautama { right: -10px; bottom: 88px; }
    .layout-right .aura { right: -118px; bottom: 28px; }
    .layout-left .copy-panel { right: 70px; top: 88px; }
    .layout-left .gautama { left: -18px; bottom: 88px; }
    .layout-left .aura { left: -124px; bottom: 26px; }
    .hero .copy-panel {
      width: 672px;
      top: 84px;
      padding: 46px 48px 52px;
    }
    .hero.layout-right .copy-panel { left: 66px; }
    .hero.layout-left .copy-panel { right: 66px; }
    .hero .gautama {
      width: 650px;
      height: 590px;
      bottom: 56px;
    }
    .hero.layout-right .gautama { right: -28px; }
    .hero.layout-left .gautama { left: -28px; }
    .hero .aura { width: 830px; height: 830px; bottom: -14px; }
    .cta .copy-panel {
      top: 98px;
      left: 70px;
      width: 680px;
      padding: 50px 50px 56px;
    }
    .cta .gautama {
      right: -22px;
      bottom: 70px;
      width: 600px;
      height: 560px;
      opacity: .96;
    }
    .cta .aura { right: -146px; bottom: 2px; }
    .cta h2 { font-size: 70px; line-height: 1.05; margin-bottom: 24px; }
    .pill {
      display: inline-flex;
      width: fit-content;
      align-items: center;
      justify-content: center;
      margin-top: 34px;
      min-height: 82px;
      padding: 0 34px;
      border-radius: 8px;
      background: linear-gradient(90deg, var(--cyan), #0C9CFF);
      color: #02101D;
      font-size: 31px;
      font-weight: 900;
      box-shadow: 0 0 34px rgba(35,231,255,.35);
    }
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 0;
      background: rgba(0,0,0,.56);
      color: white;
      cursor: pointer;
      z-index: 30;
      font-size: 18px;
    }
    .nav-prev { left: -76px; }
    .nav-next { right: -76px; }
    .counter { color: #6f7d8f; font-size: 12px; font-weight: 700; }
  </style>
</head>
<body>
  <div class="carousel-wrapper">
    <div class="carousel">
      <div class="slides-wrapper" id="slider">
        <div class="slide hero layout-${post.heroLayout}">
          <div class="slide-inner" style="--pose: url('${poseUrl(post.heroPose)}');">
            <div class="aura"></div>
            <div class="gautama"></div>
            <div class="copy-panel">
              <p class="kicker">${esc(post.area)}</p>
              <h1>${esc(post.title)}</h1>
              <p class="subtitle">${esc(post.subtitle)}</p>
            </div>
            <span class="slide-count">1 / 6</span>
            <span class="brand-seal"></span>
          </div>
        </div>

${post.slides.map((item, index) => slide(post, item, index + 1)).join("\n\n")}

        <div class="slide cta layout-right">
          <div class="slide-inner" style="--pose: url('${poseUrl("pose-meditate.png")}');">
            <div class="aura"></div>
            <div class="gautama"></div>
            <div class="copy-panel">
              <p class="kicker">Gautama Digital</p>
              <h2>${esc(post.ctaTitle)}</h2>
              <p class="cta-copy">${esc(post.ctaBody)}</p>
              <span class="pill">Diagnostico gratuito</span>
            </div>
            <span class="slide-count">6 / 6</span>
            <span class="brand-seal"></span>
          </div>
        </div>
      </div>
    </div>
    <button class="nav-btn nav-prev" id="prev" onclick="prevSlide()">&#8592;</button>
    <button class="nav-btn nav-next" id="next" onclick="nextSlide()">&#8594;</button>
  </div>
  <div class="counter" id="counter">1 / 6</div>
  <script>
    let current = 0;
    const total = 6;
    const slider = document.getElementById('slider');
    const counter = document.getElementById('counter');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const sw = 1080 * 0.5;
    function update() {
      slider.style.transform = \`translateX(-\${current * sw}px)\`;
      counter.textContent = \`\${current + 1} / \${total}\`;
      prev.style.display = current === 0 ? 'none' : 'block';
      next.style.display = current === total - 1 ? 'none' : 'block';
    }
    function nextSlide() { if (current < total - 1) { current++; update(); } }
    function prevSlide() { if (current > 0) { current--; update(); } }
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
    update();
  </script>
</body>
</html>
`;
}

for (const post of posts) {
  const folder = path.join(carouselsDir, post.slug);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, "carousel.html"), html(post), "utf8");
  fs.writeFileSync(path.join(folder, "caption.txt"), `${post.caption}\n`, "utf8");
  console.log(`updated ${post.slug}`);
}

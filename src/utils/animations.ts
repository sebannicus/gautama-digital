/**
 * animations.ts
 * Propósito: Funciones GSAP reutilizables para las animaciones del sitio.
 * Principio SRP: cada función anima un tipo de elemento — no mezcla lógica.
 * Principio ISP: los componentes importan solo las funciones que usan.
 * Relación: Importado por componentes .astro vía <script> client-side.
 *
 * Carga diferida: GSAP se importa dinámicamente para no bloquear LCP.
 */

/** Anima el Hero en la carga inicial: título, subtítulo, CTA y scroll hint */
export async function initHeroAnimation(): Promise<void> {
  const { gsap } = await import('gsap');

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(
    '[data-hero-label]',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 }
  )
    .fromTo(
      '[data-hero-title]',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9 },
      '-=0.2'
    )
    .fromTo(
      '[data-hero-sub]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.4'
    )
    .fromTo(
      '[data-hero-cta]',
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(
      '[data-hero-scroll]',
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.1'
    );
}

/** Scroll reveal genérico: anima elementos .gs-fade-up cuando entran al viewport */
export async function initScrollReveal(): Promise<void> {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');

  gsap.registerPlugin(ScrollTrigger);

  // Fade up — el más común
  gsap.utils.toArray<HTMLElement>('.gs-fade-up').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Fade in
  gsap.utils.toArray<HTMLElement>('.gs-fade-in').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Scale in
  gsap.utils.toArray<HTMLElement>('.gs-scale-in').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Slide left
  gsap.utils.toArray<HTMLElement>('.gs-slide-left').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Slide right
  gsap.utils.toArray<HTMLElement>('.gs-slide-right').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

/**
 * Anima un stagger de hijos de un contenedor.
 * Útil para listas de features, pasos de proceso, tarjetas de servicio.
 */
export async function initStaggerReveal(
  containerSelector: string,
  childSelector: string = '*',
  options?: { delay?: number; stagger?: number }
): Promise<void> {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');

  gsap.registerPlugin(ScrollTrigger);

  const containers = gsap.utils.toArray<HTMLElement>(containerSelector);

  containers.forEach((container) => {
    const children = container.querySelectorAll<HTMLElement>(childSelector);
    if (!children.length) return;

    gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: options?.stagger ?? 0.12,
        delay: options?.delay ?? 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      }
    );
  });
}

/**
 * Anima contadores numéricos (p.ej: 0 → 100 en las métricas del case study).
 * Busca elementos [data-counter] con atributo data-target.
 */
export async function initCounterAnimation(): Promise<void> {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');

  gsap.registerPlugin(ScrollTrigger);

  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');

  counters.forEach((el) => {
    const target = parseFloat(el.dataset.target ?? '0');
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';
    const decimals = parseInt(el.dataset.decimals ?? '0', 10);

    const obj = { value: 0 };

    gsap.to(obj, {
      value: target,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate() {
        el.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    });
  });
}

/**
 * Parallax sutil en el hero background.
 * Solo se activa en desktop (window.matchMedia).
 */
export async function initParallaxBg(selector: string): Promise<void> {
  if (!window.matchMedia('(min-width: 1024px)').matches) return;

  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');

  gsap.registerPlugin(ScrollTrigger);

  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;

  gsap.to(el, {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

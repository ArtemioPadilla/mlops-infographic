/**
 * MLOps Infografía - GSAP Animations (Compact Version)
 * Simplified animations for single-page layout
 */

/**
 * Initialize all animations
 */
export function initAnimations() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Hero animations
  animateHero();

  // Component animations
  animateComponents('.metric-mini', 'x', -40);
  animateComponents('.role-mini', 'y', 30);
  animateComponents('.pipeline-step', 'y', 40);
  animateComponents('.concept-mini', 'scale', 0.9);
  animateComponents('.stack-item', 'y', 20);
  animateComponents('.mlflow-module-mini', 'y', 30);
  animateComponents('.reference-item', 'x', -30);
}

/**
 * Animate hero section
 */
function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-title', {
    y: 60,
    opacity: 0,
    duration: 1
  })
  .from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8
  }, '-=0.5')
  .from('.hero-stat-main', {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.4)'
  }, '-=0.3');
}

/**
 * Generic component animation
 */
function animateComponents(selector, property, value) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element, index) => {
    const animProps = {
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        once: true
      },
      opacity: 0,
      duration: 0.6,
      delay: index * 0.08,
      ease: 'power2.out'
    };

    // Add the specific property
    if (property === 'scale') {
      animProps.scale = value;
    } else {
      animProps[property] = value;
    }

    gsap.from(element, animProps);
  });
}

/**
 * Add parallax effect (minimal for single page)
 */
export function addParallaxEffect() {
  // Minimal parallax for hero banner
  const heroBanner = document.querySelector('.hero-banner');

  if (heroBanner) {
    gsap.to(heroBanner, {
      scrollTrigger: {
        trigger: heroBanner,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 50,
      ease: 'none'
    });
  }
}

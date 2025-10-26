/**
 * MLOps Infografía - Animated Counters
 * Number counter animations using GSAP
 */

/**
 * Initialize animated counters
 */
export function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.counter);
    const duration = parseFloat(counter.dataset.duration) || 2;
    const delay = parseFloat(counter.dataset.delay) || 0;

    // Create scroll trigger for counter animation
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      once: true,
      onEnter: () => animateCounter(counter, target, duration, delay)
    });
  });
}

/**
 * Animate a single counter
 */
function animateCounter(element, target, duration, delay) {
  const obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: duration,
    delay: delay,
    ease: 'power2.out',
    onUpdate: function() {
      element.textContent = Math.ceil(obj.val);
    },
    onComplete: function() {
      element.textContent = target;
    }
  });
}

/**
 * Animate hero stat number on page load
 */
export function animateHeroStat() {
  const heroNumber = document.querySelector('.hero-stat-number');

  if (heroNumber) {
    const target = parseInt(heroNumber.dataset.counter);

    gsap.from(heroNumber, {
      textContent: 0,
      duration: 2.5,
      delay: 0.5,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: function() {
        heroNumber.textContent = Math.ceil(this.targets()[0].textContent);
      }
    });
  }
}

/**
 * Create counting animation for metric numbers
 */
export function animateMetricNumbers() {
  const metricNumbers = document.querySelectorAll('.metric-number');

  metricNumbers.forEach((number, index) => {
    const value = parseInt(number.textContent);

    gsap.from(number, {
      scrollTrigger: {
        trigger: number,
        start: 'top 85%',
        once: true
      },
      textContent: 0,
      duration: 1.5,
      delay: index * 0.1,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: function() {
        number.textContent = Math.ceil(this.targets()[0].textContent);
      },
      onComplete: function() {
        number.textContent = value;
      }
    });
  });
}

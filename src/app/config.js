export const config = {
  navbar: {
    navSelector: 'nav',
    navLinksSelector: '.nav-links',
    navIconSelector: '.nav-icon',
    navItemSelector: '.nav-item',
    scrolledClass: 'nav-scrolled',
    openClass: 'show',
    scrollOffset: 110,
    mobileBreakpoint: 900,
    scrolledThreshold: 55
  },

  tabs: {
    itemSelector: '.tabs-item',
    itemActiveClass: 'tabs-item-active',
    bodyItemSelector: '.tabs-body-item',
    bodyActiveClass: 'tabs-body-item-active'
  },

  swipers: {
    home: {
      selector: '.home-swiper',
      options: {
        loop: true,
        autoplay: { delay: 1500 },
        navigation: {
          nextEl: '.home-swiper .fa-arrow-left',
          prevEl: '.home-swiper .fa-arrow-right'
        }
      }
    },
    review: {
      selector: '.review-swiper',
      options: {
        loop: true,
        navigation: {
          nextEl: '.review-swiper .fa-arrow-left',
          prevEl: '.review-swiper .fa-arrow-right'
        }
      }
    }
  },

  scrollTop: {
    selector: '.scroll-top',
    visibleClass: 'show',
    threshold: 100
  },

  theme: {
    selector: '.theme-toggle',
    storageKey: 'theme',
    defaultTheme: 'light'
  }
};

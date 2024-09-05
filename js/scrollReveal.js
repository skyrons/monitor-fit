window.addEventListener('scroll', onScroll)

function onScroll() {
  showNavOnScroll()
}

function showNavOnScroll() {
  if (scrollY > 0) {
    ide.classList.add('scroll')
  } else {
    ide.classList.remove('scroll')
  }
}

ScrollReveal({
  origin: 'top',
  distance: '70px',
  duration: 1000
}).reveal(`
   #home,
   #home img,
   #home .stats,
  .content`)

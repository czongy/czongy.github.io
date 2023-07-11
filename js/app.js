
// Navbar Active
var sections = document.querySelectorAll('section');
var navLi = document.querySelectorAll('.nav-item a');
var overlayNavLi = document.querySelectorAll('.overlay-item a');
var mediaQuery = window.matchMedia('(max-width: 800px)')

window.addEventListener('scroll', ()=> {
  let current = '';
  sections.forEach(section=> {
    var sectionTop = section.offsetTop;
    var sectionHeight = section.clientHeight;
    if(scrollY >= sectionTop - sectionHeight / 4) {
      current = section.getAttribute('id');
    }
  })

  if (mediaQuery.matches) {
    overlayNavLi.forEach(li=> {
      li.classList.remove('overlay-active');
      if(li.classList.contains(current)) {
        li.classList.add('overlay-active');
      }
    })
  } else {
    navLi.forEach(li=> {
      li.classList.remove('active');
      if(li.classList.contains(current)) {
        li.classList.add('active');
      }
    })
  }
})

// Navbar Menu
function toggleMenu() {
  var open = document.querySelector(".menu-open");
  var close = document.querySelector(".menu-close");
  var menu = document.querySelector(".navbar-menu-overlay");

  open.classList.toggle("menu-inactive");
  close.classList.toggle("menu-inactive");
  menu.classList.toggle("menu-inactive");
}

// Intersection Observer
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
}

let callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.querySelector("polyline")) {
      entry.target.querySelector("polyline").classList.add('animate');
    } else if (entry.target.querySelector("polyline")) {
      entry.target.querySelector("polyline").classList.remove('animate');
    }
  });
}

let observer = new IntersectionObserver(callback, options);
let target = document.querySelectorAll("section");
target.forEach(section => {
  observer.observe(section);
})

// contact_me inputs to emailjs
form = document.querySelector(".form-contact")
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var name = document.querySelector("[name='name']").value;
  var email = document.querySelector("[name='email']").value;
  var message = document.querySelector("[name='message']").value;

  sendMail(name, email, message);

  form.reset()
});

// emailjs
function sendMail(name, email, message) {
  var templateParams = {
    contact_name: name,
    contact_email: email,
    message: message,
  }

  emailjs.send("default_service", "template_w8lqb86", templateParams, publicKey="iVre4EQvsdCEc4Rmd")
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
}

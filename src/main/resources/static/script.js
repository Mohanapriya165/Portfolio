// script.js
document.addEventListener('DOMContentLoaded', () => {

  // reveal on scroll (kept as before)
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.classList.add('show');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));

  // mobile nav toggle
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(btn && nav){
    btn.addEventListener('click', () => {
      if(nav.style.display === 'flex'){
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '68px';
        nav.style.right = '18px';
        nav.style.background = 'rgba(11,61,105,0.95)';
        nav.style.padding = '12px';
        nav.style.borderRadius = '10px';
        nav.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
      }
    });
  }

  // contact form
  const form = document.getElementById('contactForm');
  const popup = document.getElementById('popup');

  if (form && popup) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      const formData = { name, email, subject, message };

      popup.textContent = 'Sending message...';
      popup.style.backgroundColor = 'white';
      popup.style.color = 'var(--violet)';
      popup.classList.add('show');

      try {
        // <-- RELATIVE PATH: '/contact' (works when frontend is served by Spring Boot)
        const response = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          popup.textContent = 'Message sent successfully! Thank you.';
          form.reset();
        } else {
          const errorText = await response.text();
          console.error('Server Error:', response.status, errorText);
          popup.textContent = 'Error: Failed to send message.';
          popup.style.backgroundColor = '#d9534f';
          popup.style.color = 'white';
        }
      } catch (error) {
        console.error('Network Error:', error);
        popup.textContent = 'Network Error: Check if backend is running.';
        popup.style.backgroundColor = '#d9534f';
        popup.style.color = 'white';
      }

      setTimeout(() => {
        popup.classList.remove('show');
        popup.style.backgroundColor = '';
        popup.style.color = '';
      }, 3500);
    });
  }
});

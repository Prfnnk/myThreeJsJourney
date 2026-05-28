import Experience from './Experience/Experience.js';

const experience = new Experience(document.querySelector('canvas.webgl'));

// Plant selection buttons
const seedButtons = document.querySelectorAll('.seed-btn');
seedButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const plant = btn.dataset.plant;

    // Update active state
    seedButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // Update garden selection
    experience.world.garden.setSelectedType(plant);
  });
});

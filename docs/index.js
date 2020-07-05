document.addEventListener('DOMContentLoaded', () => {
  const actionBtn = document.querySelector('.nav-btn-js');
  const revealBlock = document.querySelector('.nav-js');

  window.revealer(actionBtn, revealBlock);
});

document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('connect-dialog');
    const openBtn = document.getElementById('open-connect');
    const closeBtn = document.getElementById('close-connect');
  
    if (openBtn && dialog && closeBtn) {
      openBtn.removeAttribute('hidden');
  
      openBtn.addEventListener('click', () => {
        dialog.showModal();
      });
  
      closeBtn.addEventListener('click', () => {
        dialog.close();
      });
  
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
          dialog.close();
        }
      });
    }
  });
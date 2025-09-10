<script>
  function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
  }

  // Reloj en tiempo real
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `🕒 ${hours}:${mins}`;
  }
  setInterval(updateClock, 1000);
  updateClock();
</script>

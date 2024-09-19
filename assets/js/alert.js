// fungsi menyembunyikan alert
  setTimeout(function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
      alert.classList.add('fade-out'); // Tambahkan class CSS untuk animasi fade-out
    });
  }, 3000);

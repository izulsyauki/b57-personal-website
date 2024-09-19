document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll("#buttonDelete");
  
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
  
        if (confirm("Are you sure you want to delete this project?")) {
          window.location.href = this.href;
        }
      });
    });
  });
  
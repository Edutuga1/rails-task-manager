// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener('DOMContentLoaded', () => {
  const deleteLinks = document.querySelectorAll('.delete-link');

  deleteLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      const confirmed = confirm(this.dataset.confirm);

      if (confirmed) {
        fetch(this.href, {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
          }
        })
        .then(response => {
          if (response.ok) {

            const taskItem = this.closest('.task-item');
            if (taskItem) {
              taskItem.remove();
            } else {
              console.error('Could not delete item');
            }
          }
        })
      }
    });
  });
});

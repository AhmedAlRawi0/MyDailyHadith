(function() {
  const script = document.currentScript;
  const theme = script.getAttribute('data-theme') || 'light';
  const language = script.getAttribute('data-language') || 'both';

  // Create widget container
  const container = document.createElement('div');
  container.id = 'mdr-hadith-widget';
  script.parentNode.insertBefore(container, script);

  // Load styles
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = 'YOUR_DOMAIN/widgets/hadith-widget.css';
  document.head.appendChild(style);

  // Load widget
  fetch(`YOUR_DOMAIN/api/widget/hadith?theme=${theme}&language=${language}`)
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;
    })
    .catch(error => {
      container.innerHTML = 'Failed to load hadith widget';
      console.error('Widget loading error:', error);
    });
})(); 
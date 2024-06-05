document.addEventListener('DOMContentLoaded', ()=> {
    const content = document.getElementById('content');
    const loadContent=(hash)=> {
        let page = hash.replace('#', '');
        if (page === '') {
            page = 'home';
        }
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
            })
            .catch(() => {
                content.innerHTML = '<p>Page not found 404.</p>';
            });
    }
    window.addEventListener('hashchange', ()=> {
        loadContent(location.hash);
    });
    loadContent(location.hash);
});

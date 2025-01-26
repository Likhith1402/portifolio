document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-images-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-project-title');
    const modalImageContainer = document.getElementById('modal-image-container');

    // Project image collections
    const projectImages = {
        drishti: [
            './images/image1.png',
            './images/image2.png'
        ],
        gasLeakage: [
            './images/image5.png',
            './images/image4.png'
        ]
    };

    // View Images Button Event Listeners
    document.querySelectorAll('.view-images-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectKey = btn.dataset.project;
            
            modalTitle.textContent = projectKey === 'drishti' 
                ? 'Drishti Web Application Images' 
                : 'Gas Leakage Detection System Images';

            modalImageContainer.innerHTML = projectImages[projectKey]
                .map(img => `<img src="${img}" alt="Project Image">`)
                .join('');

            modal.style.display = 'block';
        });
    });

    // Close Modal
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});

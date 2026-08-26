document.addEventListener('DOMContentLoaded', () => {
    
    // Toggle Category Active State
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(cat => cat.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Toggle Favorite (Heart) Buttons
    const heartButtons = document.querySelectorAll('.heart-btn');
    
    heartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            const icon = btn.querySelector('i');
            
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                btn.classList.add('active');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                btn.classList.remove('active');
            }
        });
    });

    // Increment Cart Counter
    const addButtons = document.querySelectorAll('.add-btn');
    const cartBadge = document.getElementById('cart-count');
    
    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            let currentCount = parseInt(cartBadge.innerText);
            cartBadge.innerText = currentCount + 1;
            
            btn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });
});
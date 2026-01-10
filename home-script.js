// Sample portfolio data
const portfolios = [
    {
        name: "Kaiden Carr",
        title: "Full Stack Developer",
        bio: "Passionate about building web applications with modern technologies.",
        image: "./assets/images/profile-kaiden-carr.png",
        tags: ["JavaScript", "Python", "React", "HTML", "CSS"],
        portfolioUrl: "1092489655888379915.html"
    },
    {
        name: "Antony Hallick",
        title: "Professional with Diverse Industry Experience",
        bio: "Professional with extensive experience across multiple industries including roofline products, aluminium manufacturing, and furniture.",
        image: "./assets/images/profile-antony-hallick.png",
        tags: ["Manufacturing", "Aluminium", "Technical", "Operations"],
        portfolioUrl: "Antony_Hallick.html"
    }
];

// Function to render profiles
function renderProfiles(profiles) {
    const profilesGrid = document.getElementById('profilesGrid');
    const noResults = document.getElementById('noResults');
    
    profilesGrid.innerHTML = '';
    
    if (profiles.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    profiles.forEach(profile => {
        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';
        profileCard.innerHTML = `
            <a href="${profile.portfolioUrl}" class="profile-link">
                <div class="profile-image">
                    <img src="${profile.image}" alt="${profile.name}">
                </div>
                <div class="profile-content">
                    <h3 class="profile-name">${profile.name}</h3>
                    <p class="profile-title">${profile.title}</p>
                    <p class="profile-bio">${profile.bio}</p>
                    <div class="profile-tags">
                        ${profile.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="profile-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
            </a>
        `;
        profilesGrid.appendChild(profileCard);
    });
}

// Function to search profiles
function searchProfiles(query) {
    const lowerQuery = query.toLowerCase();
    
    return portfolios.filter(profile => {
        const name = profile.name.toLowerCase();
        const title = profile.title.toLowerCase();
        const bio = profile.bio.toLowerCase();
        const tags = profile.tags.map(tag => tag.toLowerCase()).join(' ');
        
        return name.includes(lowerQuery) || 
               title.includes(lowerQuery) || 
               bio.includes(lowerQuery) || 
               tags.includes(lowerQuery);
    });
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value;
    const results = searchProfiles(query);
    renderProfiles(results);
});

// Initial render
renderProfiles(portfolios);

// ==================== DOM Content Loaded ==================== //
document.addEventListener('DOMContentLoaded', () => {
    // Popup close functionality
    const popupClose = document.getElementById('popupClose');
    if (popupClose) {
        popupClose.addEventListener('click', () => {
            const popup = document.getElementById('bottomPopup');
            popup.style.animation = 'slideOut 0.4s ease forwards';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 400);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    loadGallery();
    loadLetter();
    loadPlaylist();
    startCounter();
    createFloatingHearts();
});

function loadProfile() {
    document.getElementById('profileName').textContent = database.profile.name;
    document.getElementById('profileBirth').textContent = database.profile.birth;
    document.getElementById('profileImage').src = database.profile.photo;
}

function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    database.memories.forEach(function(memory, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = (index * 0.1) + 's';
        
        item.innerHTML = '<img src="' + memory.image + '" alt="' + memory.title + '" class="gallery-image">' +
            '<div class="gallery-content">' +
            '<div class="gallery-date">📅 ' + memory.date + '</div>' +
            '<h3 class="gallery-title">' + memory.title + '</h3>' +
            '<p class="gallery-desc">' + memory.description + '</p>' +
            '</div>';
        
        galleryGrid.appendChild(item);
    });
}

function loadLetter() {
    const letterContent = document.getElementById('letterContent');
    letterContent.innerHTML = database.loveLetter.replace(/\n/g, '<br><br>');
}

function loadPlaylist() {
    const playlist = document.getElementById('playlist');
    
    database.songs.forEach(function(song) {
        const item = document.createElement('div');
        item.className = 'song-item';
        
        item.innerHTML = '<div class="song-icon">🎵</div>' +
            '<div class="song-info">' +
            '<div class="song-title">' + song.title + '</div>' +
            '<div class="song-artist">' + song.artist + '</div>' +
            '</div>' +
            '<div class="song-links">' +
            '<a href="' + song.spotify + '" target="_blank" class="song-link spotify-link">🎵 Spotify</a>' +
            '<a href="' + song.youtube + '" target="_blank" class="song-link youtube-link">▶️ YouTube</a>' +
            '</div>';
        
        playlist.appendChild(item);
    });
}

function startCounter() {
    const startDate = new Date('2025-07-14');
    
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('daysCounter').textContent = days;
        document.getElementById('hoursCounter').textContent = hours;
        document.getElementById('minutesCounter').textContent = minutes;
    }
    
    updateCounter();
    setInterval(updateCounter, 60000);
}

function createFloatingHearts() {
    const container = document.querySelector('.hearts-container');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️'];
    
    setInterval(function() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        container.appendChild(heart);
        
        setTimeout(function() {
            heart.remove();
        }, 8000);
    }, 800);
}

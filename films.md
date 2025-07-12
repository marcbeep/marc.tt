---
layout: default
permalink: films
title: Films
description: A collection of Marc Beepath's films.

---

# Films

Making films is a massive hobby of mine. 
See more on my [YouTube.](https://youtube.com/@marcbeep)

<!-- Inline CSS for Featured Videos -->
<style>
  .video-container {
    max-width: 1000px;
    margin: 40px auto;
    text-align: left;
    padding: 0;
  }
  
  /* Grid layout for larger screens */
  @media (min-width: 768px) {
    #featured-videos {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }
  
  /* Video item styling to match project cards */
  .video-item {
    padding: 1.5rem;
    background: var(--color-light);
    border-radius: 8px;
    border: 2px solid var(--color-accent);
    transition: all 0.2s ease;
    text-decoration: none;
    color: var(--color-dark);
    display: block;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    margin-bottom: 1.5rem;
  }
  
  .video-item a {
    color: inherit;
    display: block;
    width: 100%;
    text-decoration: none;
  }
  
  .video-item img {
    width: 100%;
    height: auto;
    border-radius: 6px;
    margin-bottom: 0.75rem;
    transition: transform 0.2s ease;
    display: block;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
  
  .video-item h3 {
    font-size: 1.1rem;
    margin: 0 0 0.5rem 0;
    width: 100%;
    font-weight: 600;
    transition: color 0.2s ease;
    line-height: 1.3;
  }
  
  .video-item small {
    color: var(--color-secondary);
    font-size: 0.8rem;
    font-family: var(--font-mono);
    font-weight: 400;
    transition: color 0.2s ease;
    opacity: 0.8;
  }
  
  /* Hover effects to match project cards */
  .video-item:hover {
    transform: translateY(-2px);
    background: var(--color-accent);
    color: var(--color-light);
    box-shadow: 0 4px 12px var(--shadow-accent-medium);
  }
  
  .video-item:hover img {
    transform: scale(1.05);
  }
  
  .video-item:hover h3 {
    color: var(--color-light);
  }
  
  .video-item:hover small {
    color: var(--color-light);
    opacity: 0.9;
  }
  
  @media (min-width: 768px) {
    .video-item {
      margin-bottom: 0;
    }
  }
</style>

<!-- Video Content Container -->
<div class="video-container">
  <div id="featured-videos">
    <div id="latest" class="video-section">
      <div class="video-item" id="latest-video">Loading...</div>
    </div>

    <div id="most-viewed" class="video-section">
      <div class="video-item" id="most-viewed-video">Loading...</div>
    </div>

    <div id="most-loved" class="video-section">
      <div class="video-item" id="most-loved-video">Loading...</div>
    </div>

  </div>
</div>

{% include youtube-scripts.html %}

{% raw %}

<script>
  // Returns an HTML string for the video element and its badge.
  function createVideoElement(video, badgeText) {
    if (!video) return "";
    const videoId = video.id;
    const title = video.snippet.title;
    // Try to get the highest quality thumbnail available
    const thumbnail = video.snippet.thumbnails.maxres?.url || 
                     video.snippet.thumbnails.high?.url || 
                     video.snippet.thumbnails.medium?.url || 
                     video.snippet.thumbnails.default?.url || "";
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Escape HTML in title to prevent XSS
    const safeTitle = title.replace(/[&<>"']/g, function(match) {
      const escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return escape[match];
    });
    
    return `
      <a href="${videoUrl}" target="_blank">
        ${thumbnail ? `<img src="${thumbnail}" alt="${safeTitle}">` : ""}
        <h3>${safeTitle}</h3>
      </a>
      <small>${badgeText}</small>
    `;
  }

  // Fetch the channel's uploads playlist ID.
  getChannelUploadsPlaylist()
    .then(uploadsPlaylistId => {
      // Fetch the latest 20 videos from the uploads playlist.
      return fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return response.json();
        })
        .then(playlistData => {
          if (!playlistData.items || playlistData.items.length === 0) {
            throw new Error("No videos found in playlist.");
          }
          const videoIds = playlistData.items
            .map(item => item.snippet.resourceId.videoId)
            .filter(id => id); // Remove any invalid IDs.
          if (videoIds.length === 0) throw new Error("No valid videos found.");
          return { videoIds, latestVideoId: videoIds[0] };
        });
    })
    .then(({ videoIds, latestVideoId }) => {
      // Fetch detailed info (snippet and statistics) for the videos.
      return getVideoDetails(videoIds)
        .then(videos => {
          if (!videos || videos.length === 0) {
            throw new Error("No video details retrieved.");
          }
          
          // Determine the most recent, most viewed, and most loved videos.
          let latestVideo = videos.find(video => video.id === latestVideoId) || videos[0];
          let mostViewedVideo = null;
          let highestLikeRateVideo = null;
          let highestViewCount = -1;
          let highestLoveRatio = -1;
          let validVideos = 0;

          videos.forEach(video => {
            if (!video || !video.statistics) return;
            
            const stats = video.statistics;
            const viewCount = parseInt(stats.viewCount || "0", 10);
            const likeCount = parseInt(stats.likeCount || "0", 10);
            
            // Skip videos with no views for love ratio calculation
            if (viewCount > 0) {
              validVideos++;
              
              if (viewCount > highestViewCount) {
                highestViewCount = viewCount;
                mostViewedVideo = video;
              }

              const loveRatio = likeCount / viewCount;
              if (loveRatio > highestLoveRatio) {
                highestLoveRatio = loveRatio;
                highestLikeRateVideo = video;
              }
            } else if (viewCount === 0 && !mostViewedVideo) {
              // If no videos have views, use the first one as fallback
              mostViewedVideo = video;
            }
          });

          // Fallbacks for missing data.
          if (!latestVideo) {
            document.getElementById("latest-video").textContent = "No recent videos available.";
            return;
          }
          if (!mostViewedVideo) mostViewedVideo = latestVideo;
          if (!highestLikeRateVideo) highestLikeRateVideo = latestVideo;

          // Handle edge case where we have very few videos
          if (validVideos <= 1) {
            document.getElementById("latest-video").innerHTML = createVideoElement(latestVideo, "✅ Latest Film");
            document.getElementById("most-viewed").style.display = "none";
            document.getElementById("most-loved").style.display = "none";
            return;
          }

          // Determine relationships.
          const isMVSameAsLatest = latestVideo.id === mostViewedVideo.id;
          const isMLSameAsLatest = latestVideo.id === highestLikeRateVideo.id;
          const isMVSameAsML = mostViewedVideo.id === highestLikeRateVideo.id;

          // --- LOGIC IMPLEMENTATION ---
          // 1. Always show the most recent video.
          let latestBadgeText = "✅ Latest Film";
          let showMostViewed = true;
          let showMostLoved = true;

          if (isMVSameAsLatest && isMLSameAsLatest) {
            latestBadgeText += " (This was also my most viewed and had the highest like rate)";
            showMostViewed = false;
            showMostLoved = false;
          } else if (isMVSameAsLatest && !isMLSameAsLatest) {
            latestBadgeText += " (This was also my most viewed)";
            showMostViewed = false;
          } else if (isMLSameAsLatest && !isMVSameAsLatest) {
            latestBadgeText += " (This also had the highest like rate)";
            showMostLoved = false;
          }

          document.getElementById("latest-video").innerHTML = createVideoElement(latestVideo, latestBadgeText);

          // 2. Next, show the most viewed video if it's not the same as the most recent.
          if (showMostViewed) {
            let mostViewedBadgeText = "🔥 Most Viewed";
            if (mostViewedVideo.id === highestLikeRateVideo.id) {
              mostViewedBadgeText += " (This also had the highest like rate)";
              showMostLoved = false;
            }
            document.getElementById("most-viewed-video").innerHTML = createVideoElement(mostViewedVideo, mostViewedBadgeText);
          } else {
            document.getElementById("most-viewed").style.display = "none";
          }

          // 3. Next, if the highest like rate video is not the same as both the most recent and most viewed, show it.
          if (showMostLoved) {
            document.getElementById("most-loved-video").innerHTML = createVideoElement(highestLikeRateVideo, "📈 Highest Like Rate");
          } else {
            document.getElementById("most-loved").style.display = "none";
          }
        });
    })
    .catch(error => {
      console.error("Error fetching videos:", error);
      
      // More specific error messages
      let errorMessage = "Error loading videos.";
      if (error.message.includes("quota")) {
        errorMessage = "YouTube API quota exceeded. Please try again later.";
      } else if (error.message.includes("403")) {
        errorMessage = "YouTube API access denied. Please check configuration.";
      } else if (error.message.includes("404")) {
        errorMessage = "Channel or videos not found.";
      }
      
      document.getElementById("latest-video").textContent = errorMessage;
      document.getElementById("most-viewed-video").textContent = "";
      document.getElementById("most-loved-video").textContent = "";
    });
</script>

{% endraw %}

## Notable Past Films

<div class="projects-list">
{% assign sorted_films = site.films | sort: "date" | reverse %}
{% for film in sorted_films %}
  <a href="{{ film.url }}" class="project-item">
    <div class="project-meta-info">
      <span class="project-number">{{ forloop.index }}</span>
      <span class="project-date">{% if film.date %}{{ film.date | date: "%B %Y" }}{% else %}{{ film.released }}{% endif %}</span>
    </div>
    <div class="project-content">
      <div class="project-title-row">
        <span class="project-emoji">{{ film.emoji | default: "🎬" }}</span>
        <strong>{{ film.title }}</strong>
      </div>
      <div class="project-description">{{ film.description }}</div>
    </div>
  </a>
{% endfor %}
</div>

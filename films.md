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
  .video-section {
    margin-bottom: 30px;
    width: 100%;
  }
  .video-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    border-radius: 8px;
    margin-bottom: 5px;
    transition: transform 0.2s ease-in-out;
    border: 2px solid #e0e0e0;
  }
  .video-item a:hover img {
    transform: scale(1.02);
    border-color: #b0b0b0;
  }
  .video-item h3 {
    font-size: 1.5em;
    margin: 5px 0;
    width: 100%;
  }
  .video-item small {
    color: #666;
    font-size: 0.9em;
  }
  
  /* Grid layout for larger screens */
  @media (min-width: 768px) {
    #featured-videos {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
    }
    .video-section {
      margin-bottom: 0;
    }
    .video-item img {
      display: block;
      aspect-ratio: 16/9;
      object-fit: cover;
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
    return `
      <a href="${videoUrl}" target="_blank">
        ${thumbnail ? `<img src="${thumbnail}" alt="${title}">` : ""}
        <h3>${title}</h3>
      </a>
      <small>${badgeText}</small>
    `;
  }

  // Fetch the channel's uploads playlist ID.
  getChannelUploadsPlaylist()
    .then(uploadsPlaylistId => {
      // Fetch the latest 4 videos from the uploads playlist.
      return fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`)
        .then(response => response.json())
        .then(playlistData => {
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
          // Determine the most recent, most viewed, and most loved videos.
          let latestVideo = videos.find(video => video.id === latestVideoId) || null;
          let mostViewedVideo = null;
          let mostLovedVideo = null;
          let highestViewCount = -1;
          let highestLoveRatio = -1;

          videos.forEach(video => {
            if (!video || !video.statistics) return;
            const stats = video.statistics;
            const viewCount = parseInt(stats.viewCount || "0", 10);
            const likeCount = parseInt(stats.likeCount || "0", 10);

            if (viewCount > highestViewCount) {
              highestViewCount = viewCount;
              mostViewedVideo = video;
            }

            const loveRatio = viewCount > 0 ? likeCount / viewCount : 0;
            if (loveRatio > highestLoveRatio) {
              highestLoveRatio = loveRatio;
              mostLovedVideo = video;
            }
          });

          // Fallbacks for missing data.
          if (!latestVideo) {
            document.getElementById("latest-video").textContent = "No recent videos available.";
            return;
          }
          if (!mostViewedVideo) mostViewedVideo = latestVideo;
          if (!mostLovedVideo) mostLovedVideo = latestVideo;

          // Determine relationships.
          const isMVSameAsLatest = latestVideo.id === mostViewedVideo.id;
          const isMLSameAsLatest = latestVideo.id === mostLovedVideo.id;
          const isMVSameAsML = mostViewedVideo.id === mostLovedVideo.id;

          // --- LOGIC IMPLEMENTATION ---
          // 1. Always show the most recent video.
          let latestBadgeText = "✅ Latest Film";
          let showMostViewed = true;
          let showMostLoved = true;

          if (isMVSameAsLatest && isMLSameAsLatest) {
            latestBadgeText += " (This was also my most viewed and loved)";
            showMostViewed = false;
            showMostLoved = false;
          } else if (isMVSameAsLatest && !isMLSameAsLatest) {
            latestBadgeText += " (This was also my most viewed)";
            showMostViewed = false;
          } else if (isMLSameAsLatest && !isMVSameAsLatest) {
            latestBadgeText += " (This was also my most loved)";
            showMostLoved = false;
          }

          document.getElementById("latest-video").innerHTML = createVideoElement(latestVideo, latestBadgeText);

          // 2. Next, show the most viewed video if it's not the same as the most recent.
          if (showMostViewed) {
            let mostViewedBadgeText = "🔥 Most Viewed";
            if (mostViewedVideo.id === mostLovedVideo.id) {
              mostViewedBadgeText += " (This was also my most loved)";
              showMostLoved = false;
            }
            document.getElementById("most-viewed-video").innerHTML = createVideoElement(mostViewedVideo, mostViewedBadgeText);
          } else {
            document.getElementById("most-viewed").style.display = "none";
          }

          // 3. Next, if the most loved video is not the same as both the most recent and most viewed, show it.
          if (showMostLoved) {
            document.getElementById("most-loved-video").innerHTML = createVideoElement(mostLovedVideo, "❤️ Most Loved by Audience");
          } else {
            document.getElementById("most-loved").style.display = "none";
          }
        });
    })
    .catch(error => {
      console.error("Error fetching videos:", error);
      document.getElementById("latest-video").textContent = "Error loading videos.";
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

---
layout: default
title: Home
---

# Hi I'm Marc

I'm a postgraduate Computer Science student at the University of Liverpool from Trinidad and Tobago 🇹🇹
I also work part time as a Software Engineer, currently based in the UK.

Check out my [projects](/projects) to see what I've been working on.

When I'm not making computers say Hello World, I make short [films](/films) and [write](/writings).

<figure>
  <img src="assets/imgs/home.webp" alt="Me & a penguin in Lisbon">
  <figcaption>Me & a penguin in Lisbon. What a crossover</figcaption>
</figure>

<div class="latest-activities">
  <div class="activities-grid">
    {% assign latest_project = site.projects | sort: "release_date" | reverse | first %}
    {% if latest_project %}
    <div class="activity-card">
      <h3><span class="activity-icon">🔨</span>Latest Project</h3>
      <a href="{{ latest_project.url }}" class="activity-title">{{ latest_project.title }}</a>
      <div class="activity-date">{% if latest_project.release_date %}{{ latest_project.release_date | date: "%B %Y" }}{% else %}{{ latest_project.released }}{% endif %}</div>
    </div>
    {% endif %}

    {% assign latest_post = site.categories.writings | first %}
    {% if latest_post %}
    <div class="activity-card">
      <h3><span class="activity-icon">✍️</span>Latest Writing</h3>
      <a href="{{ latest_post.url }}" class="activity-title">{{ latest_post.title }}</a>
      <div class="activity-date">{{ latest_post.date | date: "%B %d, %Y" }}</div>
    </div>
    {% endif %}

    <div class="activity-card" id="latest-film-card">
      <h3><span class="activity-icon">🎬</span>Latest Film</h3>
      <div id="latest-film-content">Loading...</div>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const API_KEY = "AIzaSyBP_ffszCIrC6efTQ_gyx3-mpCdyuDukPY";
  const CHANNEL_ID = "UCikA-2x66qt2odtnyuOEQCg";

  fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (!data.items || data.items.length === 0) throw new Error("Channel not found.");
      return data.items[0].contentDetails.relatedPlaylists.uploads;
    })
    .then(uploadsPlaylistId => {
      return fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${uploadsPlaylistId}&key=${API_KEY}`);
    })
    .then(response => response.json())
    .then(data => {
      if (!data.items || data.items.length === 0) throw new Error("No videos found.");
      const latestVideo = data.items[0].snippet;
      const videoId = latestVideo.resourceId.videoId;
      const title = latestVideo.title;
      const publishedAt = new Date(latestVideo.publishedAt);
      
      document.getElementById('latest-film-content').innerHTML = `
        <a href="https://www.youtube.com/watch?v=${videoId}" class="activity-title" target="_blank">${title}</a>
        <div class="activity-date">${publishedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
      `;
    })
    .catch(error => {
      console.error("Error fetching latest video:", error);
      document.getElementById('latest-film-content').innerHTML = 'Error loading latest film.';
    });
});
</script>

## Other bits

- I graduated from the University of Liverpool with a BSc in Computer Science in 2023 that cost way too much.
- I was awarded an additional [scholarship](https://napcol.bluechiptt.com/scholarships-2020/) from the Government of Trinidad & Tobago for my results in Computer Science in 2020.
- I earned the Duke of Edinburgh Gold Award in 2020.
- Check out some of my [archived short films](https://youtube.com/@Marcbeep).
- I love the ocean. We should protect it (my favourite film is Finding Nemo). I'm a certified PADI Rescue Diver and I've been learning to surf recently.

> PS. This site was written in Markdown and is intentionally simple due to my affinity to the [Small Web](https://benhoyt.com/writings/the-small-web-is-beautiful/).

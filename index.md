---
layout: default
title: Home
---

# Hi I'm Marc

I'm a postgraduate Computer Science student at the University of Liverpool from Trinidad and Tobago 🇹🇹
I also work part time as a Software Engineer, currently based in the UK.

Check out my [projects](/projects) to see what I've been working on.

When I'm not making computers say Hello World, I [write](/writings) and make short [films](/films).

<div class="latest-activities">
  <div class="activities-grid">
    {% assign latest_project = site.projects | sort: "release_date" | reverse | first %}
    {% if latest_project %}
    <a href="{{ latest_project.url }}" class="activity-card">
      <div class="activity-label">Latest Project</div>
      <div class="activity-title">{{ latest_project.title }}</div>
      <div class="activity-date">{% if latest_project.release_date %}{{ latest_project.release_date | date: "%B %Y" }}{% else %}{{ latest_project.released }}{% endif %}</div>
    </a>
    {% endif %}

    {% assign latest_post = site.categories.writings | first %}
    {% if latest_post %}
    <a href="{{ latest_post.url }}" class="activity-card">
      <div class="activity-label">Latest Writing</div>
      <div class="activity-title">{{ latest_post.title }}</div>
      <div class="activity-date">{{ latest_post.date | date: "%B %Y" }}</div>
    </a>
    {% endif %}

    <a href="#" target="_blank" class="activity-card" id="latest-film-card">
      <div id="latest-film-content">Loading...</div>
    </a>
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
      
      const filmCard = document.getElementById('latest-film-card');
      filmCard.href = `https://www.youtube.com/watch?v=${videoId}`;
      
      document.getElementById('latest-film-content').innerHTML = `
        <div class="activity-label">Latest Film</div>
        <div class="activity-title">${title}</div>
        <div class="activity-date">${publishedAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
      `;
    })
    .catch(error => {
      console.error("Error fetching latest video:", error);
      document.getElementById('latest-film-content').innerHTML = 'Error loading latest film.';
    });
});
</script>

<figure>
  <img src="assets/imgs/home.webp" alt="Me & a penguin in Lisbon">
  <figcaption>Me & a penguin in Lisbon. What a crossover</figcaption>
</figure>

## Some achievements of mine

<div class="achievements-timeline">
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><i class="fa-regular fa-briefcase"></i></span><span class="timeline-date">SEP 2024</span></span>
    <div class="timeline-content">Began working as a Software Engineer with the folks at <a href="https://ultamation.com">Ultamation</a> in the Liverpool Science Park whilst doing my Masters</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><i class="fa-regular fa-graduation-cap"></i></span><span class="timeline-date">SEP 2024</span></span>
    <div class="timeline-content">Started my MSc in Advanced Computer Science</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><i class="fa-regular fa-certificate"></i></span><span class="timeline-date">JUN 2024</span></span>
    <div class="timeline-content">Graduated from the University of Liverpool with a BSc in Computer Science</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><i class="fa-regular fa-briefcase"></i></span><span class="timeline-date">JUN 2023</span></span>
    <div class="timeline-content">Interned as a Software Engineer for the summer at <a href="https://octopus.energy">Octopus Energy</a> in Manchester</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><i class="fa-regular fa-trophy"></i></span><span class="timeline-date">MAY 2023</span></span>
    <div class="timeline-content"><a href="/wildroutes">Wildroutes</a> won first place at the Design Your Future Startup Pitching Competition</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><i class="fa-regular fa-people-group"></i></span><span class="timeline-date">SEP 2022</span></span>
    <div class="timeline-content">Began working as a Careers Coach at the University of Liverpool, whilst studying for my Bachelors</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><i class="fa-regular fa-leaf"></i></span><span class="timeline-date">JUN 2022</span></span>
    <div class="timeline-content">Spent the summer interning at <a href="https://voicefornature.com">Voice for Nature</a></div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><i class="fa-regular fa-award"></i></span><span class="timeline-date">JUN 2020</span></span>
    <div class="timeline-content">Awarded a <a href="https://napcol.bluechiptt.com/scholarships-2020/">national scholarship</a> from the Government of Trinidad & Tobago for excellence in Computer Science</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><i class="fa-regular fa-film"></i></span><span class="timeline-date">SEP 2021</span></span>
    <div class="timeline-content"><a href="https://www.youtube.com/watch?v=q3DFanw9s40">Wrecked</a> is officially selected for the T&T Film Festival</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><i class="fa-regular fa-medal"></i></span><span class="timeline-date">MAY 2020</span></span>
    <div class="timeline-content">Earned the Duke of Edinburgh Gold Award and met the President of Trinidad and Tobago</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><i class="fa-regular fa-water"></i></span><span class="timeline-date">DEC 2019</span></span>
    <div class="timeline-content">Became a certified PADI Rescue Diver</div>
  </div>
</div>

Here's to some more.
---
layout: default
title: Home
---

# Hi I'm Marc

I'm a postgraduate Computer Science student at the University of Liverpool from Trinidad and Tobago 🇹🇹
I also work as a Software Engineer, currently based in the UK.

Check out my [projects](/projects) to see what I've been working on.

When I'm not making computers say Hello World, I [write](/writings) and make short [films](/films).

<div class="latest-activities">
  <div class="activities-grid">
    {% assign latest_project = site.projects | sort: "release_date" | reverse | first %}
    {% if latest_project %}
    <a href="{{ latest_project.url }}" class="activity-card">
      <div class="activity-icon">
        <span class="material-symbols-rounded">terminal</span>
      </div>
      <div class="activity-label">Latest Project</div>
      <div class="activity-title">{{ latest_project.title }}</div>
      <div class="activity-date">{% if latest_project.date %}{{ latest_project.date | date: "%B %Y" }}{% else %}{{ latest_project.released }}{% endif %}</div>
    </a>
    {% else %}
    <div class="activity-card activity-empty">
      <div class="activity-icon">
        <span class="material-symbols-rounded">terminal</span>
      </div>
      <div class="activity-label">Latest Project</div>
      <div class="activity-title">No projects yet</div>
      <div class="activity-date">Stay tuned</div>
    </div>
    {% endif %}

    {% assign latest_post = site.categories.writings | first %}
    {% if latest_post %}
    <a href="{{ latest_post.url }}" class="activity-card">
      <div class="activity-icon">
        <span class="material-symbols-rounded">draw</span>
      </div>
      <div class="activity-label">Latest Writing</div>
      <div class="activity-title">{{ latest_post.title }}</div>
      <div class="activity-date">{{ latest_post.date | date: "%B %Y" }}</div>
    </a>
    {% else %}
    <div class="activity-card activity-empty">
      <div class="activity-icon">
        <span class="material-symbols-rounded">draw</span>
      </div>
      <div class="activity-label">Latest Writing</div>
      <div class="activity-title">No writings yet</div>
      <div class="activity-date">Stay tuned</div>
    </div>
    {% endif %}

    <a href="#" target="_blank" class="activity-card" id="latest-film-card">
      <div id="latest-film-content">
        <div class="activity-icon">
          <span class="material-symbols-rounded">movie</span>
        </div>
        <div class="activity-label">Latest Film</div>
        <div class="activity-title">Loading...</div>
        <div class="activity-date"></div>
      </div>
    </a>
  </div>
</div>

{% include youtube-scripts.html %}

<script>
document.addEventListener('DOMContentLoaded', function() {
  const filmCard = document.getElementById('latest-film-card');
  const filmContent = document.getElementById('latest-film-content');

  const setErrorState = () => {
    filmCard.classList.add('activity-empty');
    filmCard.removeAttribute('href');
    filmContent.innerHTML = `
      <div class="activity-icon">
        <span class="material-symbols-rounded">movie</span>
      </div>
      <div class="activity-label">Latest Film</div>
      <div class="activity-title">No films available</div>
      <div class="activity-date">Check back later</div>
    `;
  };

  getChannelUploadsPlaylist()
    .then(uploadsPlaylistId => getLatestVideo(uploadsPlaylistId))
    .then(latestVideo => {
      const videoId = latestVideo.resourceId.videoId;
      const title = latestVideo.title;
      const publishedAt = new Date(latestVideo.publishedAt);
      
      filmCard.href = `https://www.youtube.com/watch?v=${videoId}`;
      filmCard.classList.remove('activity-empty');
      
      filmContent.innerHTML = `
        <div class="activity-icon">
          <span class="material-symbols-rounded">movie</span>
        </div>
        <div class="activity-label">Latest Film</div>
        <div class="activity-title">${title}</div>
        <div class="activity-date">${publishedAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
      `;
    })
    .catch(error => {
      console.error("Error fetching latest video:", error);
      setErrorState();
    });
});
</script>

<figure>
  <img src="assets/index/home.jpeg" alt="My parents & I at my graduation, shot on film">
  <figcaption>My parents & I at my graduation, shot on film</figcaption>
</figure>

## Some achievements of mine

<div class="achievements-timeline">
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><span class="material-symbols-rounded">work</span></span><span class="timeline-date">SEP 2024</span></span>
    <div class="timeline-content">Began working as a Software Engineer with the folks at <a href="https://ultamation.com">Ultamation</a> in the Liverpool Science Park whilst doing my Masters</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><span class="material-symbols-rounded">school</span></span><span class="timeline-date">SEP 2024</span></span>
    <div class="timeline-content">Started my MSc in Advanced Computer Science</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><span class="material-symbols-rounded">verified</span></span><span class="timeline-date">JUN 2024</span></span>
    <div class="timeline-content">Graduated from the University of Liverpool with a BSc in Computer Science</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><span class="material-symbols-rounded">work</span></span><span class="timeline-date">JUN 2023</span></span>
    <div class="timeline-content">Interned as a Software Engineer for the summer at <a href="https://octopus.energy">Octopus Energy</a> in Manchester</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><span class="material-symbols-rounded">trophy</span></span><span class="timeline-date">MAY 2023</span></span>
    <div class="timeline-content"><a href="/wildroutes">Wildroutes</a> won first place at the Design Your Future Startup Pitching Competition</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><span class="material-symbols-rounded">groups</span></span><span class="timeline-date">SEP 2022</span></span>
    <div class="timeline-content">Began working as a Careers Coach at the University of Liverpool, whilst studying for my Bachelors</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><span class="material-symbols-rounded">eco</span></span><span class="timeline-date">JUN 2022</span></span>
    <div class="timeline-content">Spent the summer interning at <a href="https://voicefornature.com">Voice for Nature</a></div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><span class="material-symbols-rounded">celebration</span></span><span class="timeline-date">SEP 2021</span></span>
    <div class="timeline-content"><a href="/goodbyeforever">Goodbye Forever</a> became a tiny local hit</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><span class="material-symbols-rounded">movie</span></span><span class="timeline-date">SEP 2021</span></span>
    <div class="timeline-content"><a href="/wrecked">Wrecked</a> is officially selected for the T&T Film Festival</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><span class="material-symbols-rounded">military_tech</span></span><span class="timeline-date">JUN 2020</span></span>
    <div class="timeline-content">Awarded a <a href="https://napcol.bluechiptt.com/scholarships-2020/">national scholarship</a> from the Government of Trinidad & Tobago for excellence in Computer Science</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><span class="material-symbols-rounded">stars</span></span><span class="timeline-date">MAY 2020</span></span>
    <div class="timeline-content">Earned the Duke of Edinburgh Gold Award and met the President of Trinidad and Tobago</div>
  </div>
  <div class="timeline-item">
    <span class="timeline-date-row"><span class="timeline-icon"><span class="material-symbols-rounded">scuba_diving</span></span><span class="timeline-date">DEC 2019</span></span>
    <div class="timeline-content">Became a certified PADI Rescue Diver</div>
  </div>
</div>

Here's to some more.

<figure>
  <img src="assets/index/speaking.jpeg" alt="Me speaking on stage at Design Your Future 2024">
  <figcaption>Me speaking on stage at Design Your Future 2024</figcaption>
</figure>
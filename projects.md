---
title: Projects
layout: default
permalink: projects
description: A collection of Marc Beepath's projects.
---

# Projects

Here are some of the projects I've worked on:

<div class="projects-list">
{% assign sorted_projects = site.projects | sort: "release_date" | reverse %}
{% for project in sorted_projects %}
  <a href="{{ project.url }}" class="project-item">
    <span class="project-emoji">{{ project.emoji | default: "🔨" }}</span>
    <strong>{{ project.title }}</strong>
    <div class="project-description">{{ project.description }}</div>
  </a>
{% endfor %}
</div> 
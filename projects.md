---
title: Projects
layout: default
permalink: projects
description: A collection of Marc Beepath's projects.
---

# Projects

Here are some of the projects I've worked on:

<div class="projects-list">
{% assign sorted_projects = site.projects | sort: "date" | reverse %}
{% for project in sorted_projects %}
  <a href="{{ project.url }}" class="project-item">
    <div class="project-meta-info">
      <span class="project-number">{{ forloop.index }}</span>
      <span class="project-date">{% if project.date %}{{ project.date | date: "%B %Y" }}{% else %}{{ project.released }}{% endif %}</span>
    </div>
    <div class="project-content">
      <div class="project-title-row">
        <img src="{{ project.logo }}" alt="{{ project.title }} logo" class="project-logo">
        <strong>{{ project.title }}</strong>
      </div>
      <div class="project-description">{{ project.description }}</div>
    </div>
  </a>
{% endfor %}
</div> 
---
layout: default
permalink: writings
title: Writings
description: A collection of Marc Beepath's writings, thoughts, and insights on software engineering, technology, and personal experiences.
---

# Writings

Here's a collection of my written thoughts.

{% assign posts_by_year = site.categories.writings | group_by_exp: "post", "post.date | date: '%Y'" | sort: "name" | reverse %}

{% for year in posts_by_year %}
## {{ year.name }}

{% for post in year.items %}
- <span class="post-date">{{ post.date | date: "%B %d" }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a>
{% endfor %}

{% endfor %}

<style>
.post-date {
  color: var(--color-secondary);
  font-size: 0.9em;
  font-family: var(--font-mono);
}
</style>

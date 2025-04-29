---
layout: default
permalink: writings
description: A collection of Marc Beepath's writings, thoughts, and insights on software engineering, technology, and personal experiences.
---

# Marc's Writings ✍🏽

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
  color: #666;
  font-size: 0.9em;
}
</style>

---
layout: default
permalink: writings
---

# The Fieldnotes Writings ✍🏽

These ideas slow cook and develop over time.
My opinions change often and these notes are frequently updated.
You can have these emailed to you every now and again through my [Newsletter ✉️](https://marcbeep.substack.com).

{% for post in site.categories.writings %}

  <li><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}

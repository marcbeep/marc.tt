---
layout: default
permalink: writings
description: A collection of Marc Beepath's writings, thoughts, and insights on software engineering, technology, and personal experiences.
---

# Marc's Writings ✍🏽

Here's a collection of my written thoughts.

{% for post in site.categories.writings %}
<span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a>
{% endfor %}

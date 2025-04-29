---
layout: default
permalink: writings
description: A collection of Marc Beepath's writings, thoughts, and insights on software engineering, technology, and personal experiences.
---

# Marc's Writings ✍🏽

> See also: [Marc's Films](/films) and [Marc's Newsletter](https://marcbeep.substack.com)

<br/>

{% for post in site.categories.writings %}

  <li><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}

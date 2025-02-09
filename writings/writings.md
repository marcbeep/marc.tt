---
layout: default
permalink: writings
---

# The Fieldnotes Writings ✍🏽

> See also: [The Fieldnotes Films](/films) and [The Fieldnotes Newsletter](https://marcbeep.substack.com)

{% for post in site.categories.writings %}

  <li><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}

---
layout: default
permalink: writings
---

# Marc's Writings ✍🏽

> See also: [Marc's Films](/films) and [Marc's Newsletter](https://marcbeep.substack.com)

<br/>

{% for post in site.categories.writings %}

  <li><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}

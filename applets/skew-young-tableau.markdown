---
layout: default
title: Young Tableau Applet
permalink: /applets/skew-young-tableau/
---

## Standard Young Tableau Builder

Build a standard Young tableau of generic skew shape.

First select the external shape, then the internal shape and finally label cells of the skew shape.

<link rel="stylesheet" href="/assets/css/applets/grid-style.css">


<div class="grid-container">
  {% for i in (1..10) %}
    {% for j in (1..10) %}
      <div class="grid-item" id="{{ i }}-{{ j }}"></div>
    {% endfor %}
  {% endfor %}
</div>


<button id="button1">Select External Shape</button>
<button id="button2">Select Internal Shape</button>
<button id="button3">Build Tableau</button>
<button id="restart">Restart</button>


<div id="message-1"></div>
<div id="message-2"></div>
<div id="message-3"></div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/assets/js/young-tableau.js"></script>
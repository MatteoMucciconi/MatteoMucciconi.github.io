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
<button id="button3">Build Tableau P</button>
<button id="button4">Build Tableau Q</button>
<button id="restart">Restart</button>


<div id="message-1"></div>
<div id="message-2"></div>
<div id="message-3"></div>
<div id="message-4"></div>

<div id="tableau-grids-wrapper">
  <div id="tableau-t-grid-container" class="grid-container"></div>
  <div id="tableau-q-grid-container" class="grid-container"></div>
</div>

<div id="operation-buttons" style="display: none;">
  <button id="iota1">ι₁</button>
  <button id="iota2">ι₂</button>
  <button id="skewRSK">skewRSK</button>
  <button id="restart-dynamics">Restart dynamics</button>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/assets/js/young-tableau.js"></script>
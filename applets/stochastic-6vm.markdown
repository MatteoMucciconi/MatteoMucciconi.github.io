---
layout: default
title: Stochastic Six Vertex Model
---

<link rel="stylesheet" href="/assets/css/applets/stochastic-6vm.css">


# Stochastic Six Vertex Model

Below are reported vertex configurations and Bolzmann probability weights. Select `a` and `b` to vary the probability weights.

<div class="configurations-container">
    <!-- Configuration (0,0,0,0) -->
    <div class="configuration">
        <div class="cell"></div>
        <div id="prob-0-0-0-0">1</div>
    </div>
    <!-- Configuration (1,1,1,1) -->
    <div class="configuration">
        <div class="cell">
        <div class="edge down"></div>
        <div class="edge left"></div>
        <div class="edge up"></div>
        <div class="edge right"></div>
        </div>
        <div id="prob-1-1-1-1">1</div>
    </div>
    <!-- Configuration (1,0,1,0) -->
    <div class="configuration">
        <div class="cell">
        <div class="edge down"></div>
        <div class="edge up"></div>
        </div>
        <div id="prob-1-0-1-0">a</div>
    </div>
    <!-- Configuration (1,0,0,1) -->
    <div class="configuration">
        <div class="cell">
        <div class="edge down"></div>
        <div class="edge right"></div>
        </div>
        <div id="prob-1-0-0-1">1-a</div>
    </div>
    <!-- Configuration (0,1,0,1) -->
    <div class="configuration">
        <div class="cell">
        <div class="edge left"></div>
        <div class="edge right"></div>
        </div>
        <div id="prob-0-1-0-1">b</div>
    </div>
    <!-- Configuration (0,1,1,0) -->
    <div class="configuration">
        <div class="cell">
        <div class="edge left"></div>
        <div class="edge up"></div>
        </div>
        <div id="prob-0-1-1-0">1-b</div>
    </div>
</div>
<br>
<div class="inputs-container">
    <div class="input-container">
        <label for="input-a">a:</label>
        <input id="input-a" type="range" min="0" max="1" step="0.01" value="0.5" onchange="updateProbabilities()">
    </div>
    &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
    <div class="input-container">
        <label for="input-b">b:</label>
        <input id="input-b" type="range" min="0" max="1" step="0.01" value="0.5" onchange="updateProbabilities()">
    </div>
</div>

<br>
<div>
    <label for="input-n">Grid size: </label>
    <input type="number" id="input-n" min="1" max="250" value="10" oninput="createGrid()">
    &nbsp; &nbsp; &nbsp;
    <button onclick="startSimulation()">Start simulation</button>
</div>
<br>



<div id="grid-container" class="grid"></div>



<script src="/assets/js/stochastic-6vm.js"></script>

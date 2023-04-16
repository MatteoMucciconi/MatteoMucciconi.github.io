---
layout: default
title: Erdős–Rényi Graphs Applet
permalink: /applets/erdos-renyi-graph
---



## Erdős–Rényi Graphs

This applet generates the Erdős–Rényi graph G(k,p), that is a random graph with k nodes and where each pair of nodes is connected by an edge with probability p. Connected components are displayed in column ranked from the largest down to the smaller ones.


<script src="https://unpkg.com/cytoscape@3.19.0/dist/cytoscape.min.js"></script>

<link rel="stylesheet" href="/assets/css/applets/crystals-ssyt.css">

<body>
    <div>
        <label for="k-value">Enter value of k:</label>
        <input type="number" id="k-value" min="1">
        <br>
        <label for="p-value">Enter value of p (between 0 and 1):</label>
        <input type="number" id="p-value" min="0" max="1" step="0.01">
        <br>
        <button id="generate-graph">Generate Graph</button>
    </div>
    <div id="cy"></div>
    <div id="connected-components"></div>
    <script src="/assets/js/crystals-ssyt.js"></script>

</body>


---
layout: projects
permalink: monty
categories: projects
title: "Monty"
description: "A portfolio backtester tool for retail investors."
visit: "https://monty.marc.tt"
external_links:
  - label: GitHub
    url: "https://github.com/marcbeep/monty"
date: 2025-09-01
emoji: "🐍"
logo: "assets/projects/monty/logo.png"
---

<figure>
  <img src="assets/projects/monty/1.png" alt="Screenshot of Monty">
  <figcaption>Screenshot of Monty</figcaption>
</figure>

<br>

This was my final project for my Master's in Advanced Computer Science.

Monty allows you to create a portfolio of assets and analyse it by using a historical backtest or monte carlo simulation.

Features include:

1. Dashboard showing key metrics, historic chart and portfolio holdings
2. Portfolio builder that has a fuzzy find search via YahooFinance API, and allows you to allocate percentages to assets
3. Backtester that allows:
  - Stress Test using historic dates
  - Monte Carlo simulation with projection bands chart and return distribution curve
4. Portfolio comparison tool
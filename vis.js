// vis.js — Minimal "Brain tabs" hover-expand visualization
// - Collapsed: label only + "›" hint
// - Hover: expands and shows attention bar + % (like your 2nd screenshot)
// Renders into #viz1. Leaves #viz2 blank.

document.addEventListener("DOMContentLoaded", () => {
  const v1 = document.getElementById("viz1");
  const v2 = document.getElementById("viz2");

  if (v1) renderBrainTabs(v1);
  if (v2) renderCatFromFile(v2); // <-- instead of clearing it
});


function svgEl(tag, attrs = {}) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
}
function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
function truncate(str, max = 30) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}
function easeOutBack(t) {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function tween({ from, to, duration, ease, onUpdate, onDone }) {
  let raf = 0;
  const t0 = performance.now();
  function step(now) {
    const p = clamp((now - t0) / duration, 0, 1);
    onUpdate(from + (to - from) * ease(p), p);
    if (p < 1) raf = requestAnimationFrame(step);
    else onDone && onDone();
  }
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

function renderBrainTabs(container) {
  container.innerHTML = "";

  const tabs = [
    { title: "what should i eat rn", attention: 72 },
    { title: "concert tickets prices??", attention: 64 },
    { title: "outfit inspo", attention: 48 },
    { title: "i should start using a calender", attention: 80 },
    { title: "can cats feel embarrassed", attention: 55 },
    { title: "new playlist time!", attention: 41 },
    { title: "what show should i start next", attention: 60 },
    { title: "i need a walk", attention: 35 },
  ];

  const w = clamp(container.clientWidth || 760, 320, 980);
  const pad = 18;

  // Browser window
  const frameX = pad;
  const frameY = pad;
  const frameW = w - pad * 2;
  const chromeH = 44;

  // Tabs layout
  const tabH = 38;
  const gap = 10;
  const innerPad = 18;
  const tabTopOffset = chromeH + 18;

  const expandedW = Math.min(520, frameW - innerPad * 2);
  const collapsedW = Math.min(260, expandedW);

  // Make window tall enough for all tabs
  const tabsTotalH = tabs.length * tabH + (tabs.length - 1) * gap;
  const frameH = tabTopOffset + tabsTotalH + 18;
  const h = frameY + frameH + pad;

  const svg = svgEl("svg", {
    width: "100%",
    height: h,
    viewBox: `0 0 ${w} ${h}`,
    role: "img",
    "aria-label": "Brain tabs open visualization"
  });

  const defs = svgEl("defs");
  svg.appendChild(defs);

  // Frame
  svg.appendChild(svgEl("rect", {
    x: frameX, y: frameY, width: frameW, height: frameH,
    rx: 12,
    fill: "rgba(255,255,255,.10)",
    stroke: "rgba(139,10,10,.22)",
    "stroke-width": 1.2
  }));

  // Chrome bar
  svg.appendChild(svgEl("rect", {
    x: frameX, y: frameY, width: frameW, height: chromeH,
    rx: 12,
    fill: "rgba(255,255,255,.12)",
    stroke: "rgba(139,10,10,.18)",
    "stroke-width": 1
  }));

  // Window dots
  const dotY = frameY + 22;
  [frameX + 18, frameX + 34, frameX + 50].forEach((dx) => {
    svg.appendChild(svgEl("circle", { cx: dx, cy: dotY, r: 5, fill: "rgba(139,10,10,.28)" }));
  });

  // Address bar
  svg.appendChild(svgEl("rect", {
    x: frameX + 78, y: frameY + 12,
    width: frameW - 98, height: 20,
    rx: 10,
    fill: "rgba(255,255,255,.18)",
    stroke: "rgba(139,10,10,.14)",
    "stroke-width": 1
  }));

  const tabAreaX = frameX + innerPad;
  const tabAreaY = frameY + tabTopOffset;

  // Attention UI sizing (matches your desired style)
  const rightPad = 18;     // space from right edge
  const pctGap = 25;       // gap between bar end and %
  const barTotalW = 240;   // track width
  const barPad = 0;        // inner padding for fill ends

  tabs.forEach((t, i) => {
    const x = tabAreaX;
    const y = tabAreaY + i * (tabH + gap);

    // Clip so expanded content doesn't spill outside current width
    const clipId = `clip-tab-${i}`;
    const clipPath = svgEl("clipPath", { id: clipId, clipPathUnits: "userSpaceOnUse" });
    const clipRect = svgEl("rect", { x: 0, y: 0, width: collapsedW, height: tabH, rx: 10 });
    clipPath.appendChild(clipRect);
    defs.appendChild(clipPath);

    const g = svgEl("g", {
      transform: `translate(${x},${y})`,
      style: `clip-path: url(#${clipId});`,
      cursor: "pointer"
    });

    const hit = svgEl("rect", { x: 0, y: 0, width: collapsedW, height: tabH, rx: 10, fill: "rgba(0,0,0,0)" });

    const card = svgEl("rect", {
      x: 0, y: 0, width: collapsedW, height: tabH, rx: 10,
      fill: "rgba(255,255,255,.72)",
      stroke: "rgba(139,10,10,.22)",
      "stroke-width": 1.1
    });

    const icon = svgEl("circle", { cx: 14, cy: tabH / 2, r: 6, fill: "rgba(139,10,10,.35)" });

    const label = svgEl("text", { x: 28, y: 24, "font-size": 14, fill: "rgba(139,10,10,.92)" });
    label.textContent = truncate(t.title, 34);

    // Expand hint (collapsed only)
    const caret = svgEl("text", {
      x: collapsedW - 18,
      y: 24,
      "font-size": 16,
      "text-anchor": "end",
      fill: "rgba(139,10,10,.55)",
      opacity: 1
    });
    caret.textContent = "›";

    // Attention group (bar + % OUTSIDE bar)
    const attnG = svgEl("g", { opacity: 0 });

    const barBg = svgEl("rect", {
      x: 0, y: 12, width: barTotalW, height: 14, rx: 7,
      fill: "rgba(139,10,10,.10)"
    });

    const fillW = clamp((t.attention / 100) * (barTotalW - barPad * 2), 0, (barTotalW - barPad * 2));
    const barFill = svgEl("rect", {
      x: 0, y: 12, width: fillW, height: 14, rx: 7,
      fill: "rgba(139,10,10,.38)"
    });

    const pctText = svgEl("text", {
      x: 0, y: 24,
      "font-size": 12,
      "text-anchor": "end",
      fill: "rgba(139,10,10,.75)"
    });
    pctText.textContent = `${t.attention}%`;

    attnG.appendChild(barBg);
    attnG.appendChild(barFill);
    attnG.appendChild(pctText);

    g.appendChild(hit);
    g.appendChild(card);
    g.appendChild(icon);
    g.appendChild(label);
    g.appendChild(caret);
    g.appendChild(attnG);

    svg.appendChild(g);

    // State
    let width = collapsedW;
    let expanded = false;
    let cancelWidth = null;

    function setWidth(newW) {
      width = newW;

      card.setAttribute("width", String(newW));
      hit.setAttribute("width", String(newW));
      clipRect.setAttribute("width", String(newW));

      // caret pinned to right edge (only visible when collapsed)
      caret.setAttribute("x", String(newW - 18));

      // % pinned to right edge
      const pctX = newW - rightPad;

      // bar ends before % with a gap
      const barRight = pctX - pctGap;
      const barX = barRight - barTotalW;

      barBg.setAttribute("x", String(barX));
      barFill.setAttribute("x", String(barX + barPad));
      pctText.setAttribute("x", String(pctX));
    }

    function fade(el, to) {
      el.getAnimations?.().forEach(a => a.cancel());
      el.animate(
        [{ opacity: el.getAttribute("opacity") || 0 }, { opacity: to }],
        { duration: 120, easing: "cubic-bezier(.16,1,.3,1)", fill: "forwards" }
      );
      el.setAttribute("opacity", String(to));
    }

    function pop(scaleTo) {
      g.getAnimations?.().forEach(a => a.cancel());
      g.animate(
        [
          { transform: `translate(${x},${y}) scale(1)` },
          { transform: `translate(${x},${y}) scale(${scaleTo})` },
          { transform: `translate(${x},${y}) scale(${scaleTo - 0.02})` }
        ],
        { duration: 220, easing: "cubic-bezier(.16,1,.3,1)", fill: "forwards" }
      );
    }

    function expand() {
      if (expanded) return;
      expanded = true;

      if (cancelWidth) cancelWidth();

      card.setAttribute("fill", "rgba(255,255,255,.86)");
      card.setAttribute("stroke", "rgba(139,10,10,.40)");

      // show attention immediately + hide caret immediately
      fade(attnG, 1);
      fade(caret, 0);
      pop(1.02);

      cancelWidth = tween({
        from: width,
        to: expandedW,
        duration: 300,
        ease: easeOutBack,
        onUpdate: (v) => setWidth(clamp(v, collapsedW, expandedW)),
        onDone: () => setWidth(expandedW)
      });
    }

    function collapse() {
      if (!expanded) return;
      expanded = false;

      if (cancelWidth) cancelWidth();

      fade(attnG, 0);
      fade(caret, 1);
      pop(1);

      card.setAttribute("fill", "rgba(255,255,255,.72)");
      card.setAttribute("stroke", "rgba(139,10,10,.22)");

      cancelWidth = tween({
        from: width,
        to: collapsedW,
        duration: 220,
        ease: easeInOutCubic,
        onUpdate: (v) => setWidth(clamp(v, collapsedW, expandedW)),
        onDone: () => setWidth(collapsedW)
      });
    }

    g.addEventListener("pointerenter", expand);
    g.addEventListener("pointerleave", collapse);

    // init
    setWidth(collapsedW);
    attnG.setAttribute("opacity", "0");
    caret.setAttribute("opacity", "1");
  });

  container.appendChild(svg);
}


function renderCatFromFile(container) {
  container.innerHTML = "";

  let el = container;
  for (let i = 0; i < 5 && el; i++) {
    el.style.overflow = "visible";
    el = el.parentElement;
  }

  const wrap = document.createElement("div");
  wrap.style.display = "flex";
  wrap.style.justifyContent = "center";
  wrap.style.alignItems = "center";
  wrap.style.padding = "0.2rem";     
  wrap.style.overflow = "visible";
  wrap.style.lineHeight = "0";

  const img = document.createElement("img");
  img.src = "images/cat.svg";
  img.alt = "Cat icon";

  // Use rem instead of px
  img.style.width = "min(20rem, 100%)"; 
  img.style.height = "auto";
  img.style.display = "block";
  img.style.cursor = "pointer";

  // Smooth (no jitter)
  img.style.transformOrigin = "50% 50%";
  img.style.willChange = "transform";
  img.style.transition = "transform 0.22s cubic-bezier(.16, 1, .3, 1)";
  img.style.transform = "translateY(0) scale(1)";

  let leaveTimer = null;

  img.addEventListener("mouseenter", () => {
    if (leaveTimer) clearTimeout(leaveTimer);
    img.style.transform = "translateY(-0.125rem) scale(1.05)"; // was -2px
  });

  img.addEventListener("mouseleave", () => {
    img.style.transform = "translateY(0.375rem) scale(1)";     // was 6px
    leaveTimer = setTimeout(() => {
      img.style.transform = "translateY(0) scale(1)";
    }, 120);
  });

  wrap.appendChild(img);
  container.appendChild(wrap);
}


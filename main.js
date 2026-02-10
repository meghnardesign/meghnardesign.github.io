

document.addEventListener("DOMContentLoaded", () => {
  setupPhotoStack();
});

function setupPhotoStack() {
  const stack = document.getElementById("photoStack");
  if (!stack) return;

  const left = stack.querySelector(".p-left");
  const center = stack.querySelector(".p-center");
  const right = stack.querySelector(".p-right");
  const frame = stack.querySelector(".hover-frame");
  const note = document.getElementById("expandedNote");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  const T = {
    collapsed: {
      left: "translate(-16%, 10%) rotate(-10deg) scale(.98)",
      center: "translate(0%, 2%) rotate(2deg) scale(1)",
      right: "translate(16%, 10%) rotate(10deg) scale(.98)",
      frame: "translate(0%, 8%) scale(1)",
      frameOpacity: 1,
      noteOpacity: 0,
      noteTransform: "rotate(8deg) translateY(6px)"
    },
    expanded: {
      left: "translate(-52%, 12%) rotate(-8deg) scale(1)",
      center: "translate(0%, -2%) rotate(1deg) scale(1.03)",
      right: "translate(52%, 12%) rotate(8deg) scale(1)",
      frame: "translate(0%, 8%) scale(.98)",
      frameOpacity: 0,
      noteOpacity: 1,
      noteTransform: "rotate(8deg) translateY(0px)"
    }
  };

  let expanded = false;
  let running = [];

  function cancelRunning() {
    running.forEach(a => a.cancel());
    running = [];
  }

  function applyInstant(state) {
    left.style.transform = state.left;
    center.style.transform = state.center;
    right.style.transform = state.right;

    frame.style.transform = state.frame;
    frame.style.opacity = String(state.frameOpacity);

    if (note) {
      note.style.opacity = String(state.noteOpacity);
      note.style.transform = state.noteTransform;
      note.setAttribute("aria-hidden", state.noteOpacity === 0 ? "true" : "false");
    }
  }

  function animateTo(targetKey) {
    const from = expanded ? T.expanded : T.collapsed;
    const to = targetKey === "expanded" ? T.expanded : T.collapsed;

    expanded = targetKey === "expanded";
    stack.setAttribute("aria-expanded", expanded ? "true" : "false");

    if (reduced || !("animate" in HTMLElement.prototype)) {
      cancelRunning();
      applyInstant(to);
      return;
    }

    cancelRunning();

    const ease = "cubic-bezier(.16, 1, .3, 1)";
    const dur = 560;

    const overshoot = (val, factor = 1) => {

      return val
        .replace("scale(1)", `scale(${1 + 0.02 * factor})`)
        .replace("scale(1.03)", `scale(${1.04 + 0.01 * factor})`);
    };

    running.push(left.animate(
      [
        { transform: from.left, offset: 0 },
        { transform: overshoot(to.left, 1), offset: 0.78 },
        { transform: to.left, offset: 1 }
      ],
      { duration: dur, easing: ease, fill: "forwards" }
    ));

    running.push(center.animate(
      [
        { transform: from.center, offset: 0 },
        { transform: overshoot(to.center, 1.2), offset: 0.8 },
        { transform: to.center, offset: 1 }
      ],
      { duration: dur + 60, easing: ease, fill: "forwards" }
    ));

    running.push(right.animate(
      [
        { transform: from.right, offset: 0 },
        { transform: overshoot(to.right, 1), offset: 0.78 },
        { transform: to.right, offset: 1 }
      ],
      { duration: dur, easing: ease, fill: "forwards" }
    ));

    running.push(frame.animate(
      [
        { opacity: from.frameOpacity, transform: from.frame, offset: 0 },
        { opacity: to.frameOpacity, transform: to.frame, offset: 1 }
      ],
      { duration: 320, easing: ease, fill: "forwards" }
    ));

    if (note) {
      running.push(note.animate(
        [
          { opacity: from.noteOpacity, transform: from.noteTransform, offset: 0 },
          { opacity: to.noteOpacity, transform: to.noteTransform, offset: 1 }
        ],
        { duration: 360, delay: expanded ? 120 : 0, easing: ease, fill: "forwards" }
      ));
    }
  }

  function expand() { if (!expanded) animateTo("expanded"); }
  function collapse() { if (expanded) animateTo("collapsed"); }
  function toggle() { animateTo(expanded ? "collapsed" : "expanded"); }


  stack.addEventListener("pointerenter", expand);
  stack.addEventListener("pointerleave", collapse);

  stack.addEventListener("click", (e) => {

    e.preventDefault();
    toggle();
  });


  stack.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
    if (e.key === "Escape") collapse();
  });

 
  applyInstant(T.collapsed);
}

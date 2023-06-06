const Ho = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
  new MutationObserver((n) => {
    for (const a of n)
      if (a.type === "childList")
        for (const r of a.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && i(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(n) {
    const a = {};
    return (
      n.integrity && (a.integrity = n.integrity),
      n.referrerpolicy && (a.referrerPolicy = n.referrerpolicy),
      n.crossorigin === "use-credentials"
        ? (a.credentials = "include")
        : n.crossorigin === "anonymous"
        ? (a.credentials = "omit")
        : (a.credentials = "same-origin"),
      a
    );
  }
  function i(n) {
    if (n.ep) return;
    n.ep = !0;
    const a = e(n);
    fetch(n.href, a);
  }
};
Ho();
var ot = "top",
  ct = "bottom",
  lt = "right",
  st = "left",
  Ke = "auto",
  se = [ot, ct, lt, st],
  Vt = "start",
  Zt = "end",
  jn = "clippingParents",
  Cr = "viewport",
  zt = "popper",
  kn = "reference",
  gr = se.reduce(function (o, t) {
    return o.concat([t + "-" + Vt, t + "-" + Zt]);
  }, []),
  wr = [].concat(se, [Ke]).reduce(function (o, t) {
    return o.concat([t, t + "-" + Vt, t + "-" + Zt]);
  }, []),
  Vn = "beforeRead",
  Fn = "read",
  Bn = "afterRead",
  Hn = "beforeMain",
  Wn = "main",
  Kn = "afterMain",
  Un = "beforeWrite",
  Gn = "write",
  Yn = "afterWrite",
  zn = [Vn, Fn, Bn, Hn, Wn, Kn, Un, Gn, Yn];
function bt(o) {
  return o ? (o.nodeName || "").toLowerCase() : null;
}
function ut(o) {
  if (o == null) return window;
  if (o.toString() !== "[object Window]") {
    var t = o.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return o;
}
function Ft(o) {
  var t = ut(o).Element;
  return o instanceof t || o instanceof Element;
}
function dt(o) {
  var t = ut(o).HTMLElement;
  return o instanceof t || o instanceof HTMLElement;
}
function Nr(o) {
  if (typeof ShadowRoot == "undefined") return !1;
  var t = ut(o).ShadowRoot;
  return o instanceof t || o instanceof ShadowRoot;
}
function Wo(o) {
  var t = o.state;
  Object.keys(t.elements).forEach(function (e) {
    var i = t.styles[e] || {},
      n = t.attributes[e] || {},
      a = t.elements[e];
    !dt(a) ||
      !bt(a) ||
      (Object.assign(a.style, i),
      Object.keys(n).forEach(function (r) {
        var s = n[r];
        s === !1 ? a.removeAttribute(r) : a.setAttribute(r, s === !0 ? "" : s);
      }));
  });
}
function Ko(o) {
  var t = o.state,
    e = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: { position: "absolute" },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, e.popper),
    (t.styles = e),
    t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow),
    function () {
      Object.keys(t.elements).forEach(function (i) {
        var n = t.elements[i],
          a = t.attributes[i] || {},
          r = Object.keys(t.styles.hasOwnProperty(i) ? t.styles[i] : e[i]),
          s = r.reduce(function (c, l) {
            return (c[l] = ""), c;
          }, {});
        !dt(n) ||
          !bt(n) ||
          (Object.assign(n.style, s),
          Object.keys(a).forEach(function (c) {
            n.removeAttribute(c);
          }));
      });
    }
  );
}
var xr = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Wo,
  effect: Ko,
  requires: ["computeStyles"],
};
function yt(o) {
  return o.split("-")[0];
}
var kt = Math.max,
  je = Math.min,
  qt = Math.round;
function yr() {
  var o = navigator.userAgentData;
  return o != null && o.brands && Array.isArray(o.brands)
    ? o.brands
        .map(function (t) {
          return t.brand + "/" + t.version;
        })
        .join(" ")
    : navigator.userAgent;
}
function Xn() {
  return !/^((?!chrome|android).)*safari/i.test(yr());
}
function te(o, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var i = o.getBoundingClientRect(),
    n = 1,
    a = 1;
  t &&
    dt(o) &&
    ((n = (o.offsetWidth > 0 && qt(i.width) / o.offsetWidth) || 1),
    (a = (o.offsetHeight > 0 && qt(i.height) / o.offsetHeight) || 1));
  var r = Ft(o) ? ut(o) : window,
    s = r.visualViewport,
    c = !Xn() && e,
    l = (i.left + (c && s ? s.offsetLeft : 0)) / n,
    u = (i.top + (c && s ? s.offsetTop : 0)) / a,
    f = i.width / n,
    p = i.height / a;
  return {
    width: f,
    height: p,
    top: u,
    right: l + f,
    bottom: u + p,
    left: l,
    x: l,
    y: u,
  };
}
function Ir(o) {
  var t = te(o),
    e = o.offsetWidth,
    i = o.offsetHeight;
  return (
    Math.abs(t.width - e) <= 1 && (e = t.width),
    Math.abs(t.height - i) <= 1 && (i = t.height),
    { x: o.offsetLeft, y: o.offsetTop, width: e, height: i }
  );
}
function Qn(o, t) {
  var e = t.getRootNode && t.getRootNode();
  if (o.contains(t)) return !0;
  if (e && Nr(e)) {
    var i = t;
    do {
      if (i && o.isSameNode(i)) return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function _t(o) {
  return ut(o).getComputedStyle(o);
}
function Uo(o) {
  return ["table", "td", "th"].indexOf(bt(o)) >= 0;
}
function Lt(o) {
  return ((Ft(o) ? o.ownerDocument : o.document) || window.document)
    .documentElement;
}
function Ue(o) {
  return bt(o) === "html"
    ? o
    : o.assignedSlot || o.parentNode || (Nr(o) ? o.host : null) || Lt(o);
}
function Gr(o) {
  return !dt(o) || _t(o).position === "fixed" ? null : o.offsetParent;
}
function Go(o) {
  var t = /firefox/i.test(yr()),
    e = /Trident/i.test(yr());
  if (e && dt(o)) {
    var i = _t(o);
    if (i.position === "fixed") return null;
  }
  var n = Ue(o);
  for (Nr(n) && (n = n.host); dt(n) && ["html", "body"].indexOf(bt(n)) < 0; ) {
    var a = _t(n);
    if (
      a.transform !== "none" ||
      a.perspective !== "none" ||
      a.contain === "paint" ||
      ["transform", "perspective"].indexOf(a.willChange) !== -1 ||
      (t && a.willChange === "filter") ||
      (t && a.filter && a.filter !== "none")
    )
      return n;
    n = n.parentNode;
  }
  return null;
}
function Ee(o) {
  for (var t = ut(o), e = Gr(o); e && Uo(e) && _t(e).position === "static"; )
    e = Gr(e);
  return e &&
    (bt(e) === "html" || (bt(e) === "body" && _t(e).position === "static"))
    ? t
    : e || Go(o) || t;
}
function Dr(o) {
  return ["top", "bottom"].indexOf(o) >= 0 ? "x" : "y";
}
function ve(o, t, e) {
  return kt(o, je(t, e));
}
function Yo(o, t, e) {
  var i = ve(o, t, e);
  return i > e ? e : i;
}
function Jn() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function Zn(o) {
  return Object.assign({}, Jn(), o);
}
function qn(o, t) {
  return t.reduce(function (e, i) {
    return (e[i] = o), e;
  }, {});
}
var zo = function (t, e) {
  return (
    (t =
      typeof t == "function"
        ? t(Object.assign({}, e.rects, { placement: e.placement }))
        : t),
    Zn(typeof t != "number" ? t : qn(t, se))
  );
};
function Xo(o) {
  var t,
    e = o.state,
    i = o.name,
    n = o.options,
    a = e.elements.arrow,
    r = e.modifiersData.popperOffsets,
    s = yt(e.placement),
    c = Dr(s),
    l = [st, lt].indexOf(s) >= 0,
    u = l ? "height" : "width";
  if (!(!a || !r)) {
    var f = zo(n.padding, e),
      p = Ir(a),
      d = c === "y" ? ot : st,
      h = c === "y" ? ct : lt,
      m =
        e.rects.reference[u] + e.rects.reference[c] - r[c] - e.rects.popper[u],
      v = r[c] - e.rects.reference[c],
      g = Ee(a),
      y = g ? (c === "y" ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
      S = m / 2 - v / 2,
      b = f[d],
      A = y - p[u] - f[h],
      E = y / 2 - p[u] / 2 + S,
      w = ve(b, E, A),
      x = c;
    e.modifiersData[i] = ((t = {}), (t[x] = w), (t.centerOffset = w - E), t);
  }
}
function Qo(o) {
  var t = o.state,
    e = o.options,
    i = e.element,
    n = i === void 0 ? "[data-popper-arrow]" : i;
  n != null &&
    ((typeof n == "string" && ((n = t.elements.popper.querySelector(n)), !n)) ||
      !Qn(t.elements.popper, n) ||
      (t.elements.arrow = n));
}
var to = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Xo,
  effect: Qo,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};
function ee(o) {
  return o.split("-")[1];
}
var Jo = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function Zo(o, t) {
  var e = o.x,
    i = o.y,
    n = t.devicePixelRatio || 1;
  return { x: qt(e * n) / n || 0, y: qt(i * n) / n || 0 };
}
function Yr(o) {
  var t,
    e = o.popper,
    i = o.popperRect,
    n = o.placement,
    a = o.variation,
    r = o.offsets,
    s = o.position,
    c = o.gpuAcceleration,
    l = o.adaptive,
    u = o.roundOffsets,
    f = o.isFixed,
    p = r.x,
    d = p === void 0 ? 0 : p,
    h = r.y,
    m = h === void 0 ? 0 : h,
    v = typeof u == "function" ? u({ x: d, y: m }) : { x: d, y: m };
  (d = v.x), (m = v.y);
  var g = r.hasOwnProperty("x"),
    y = r.hasOwnProperty("y"),
    S = st,
    b = ot,
    A = window;
  if (l) {
    var E = Ee(e),
      w = "clientHeight",
      x = "clientWidth";
    if (
      (E === ut(e) &&
        ((E = Lt(e)),
        _t(E).position !== "static" &&
          s === "absolute" &&
          ((w = "scrollHeight"), (x = "scrollWidth"))),
      (E = E),
      n === ot || ((n === st || n === lt) && a === Zt))
    ) {
      b = ct;
      var C = f && E === A && A.visualViewport ? A.visualViewport.height : E[w];
      (m -= C - i.height), (m *= c ? 1 : -1);
    }
    if (n === st || ((n === ot || n === ct) && a === Zt)) {
      S = lt;
      var D = f && E === A && A.visualViewport ? A.visualViewport.width : E[x];
      (d -= D - i.width), (d *= c ? 1 : -1);
    }
  }
  var T = Object.assign({ position: s }, l && Jo),
    O = u === !0 ? Zo({ x: d, y: m }, ut(e)) : { x: d, y: m };
  if (((d = O.x), (m = O.y), c)) {
    var N;
    return Object.assign(
      {},
      T,
      ((N = {}),
      (N[b] = y ? "0" : ""),
      (N[S] = g ? "0" : ""),
      (N.transform =
        (A.devicePixelRatio || 1) <= 1
          ? "translate(" + d + "px, " + m + "px)"
          : "translate3d(" + d + "px, " + m + "px, 0)"),
      N)
    );
  }
  return Object.assign(
    {},
    T,
    ((t = {}),
    (t[b] = y ? m + "px" : ""),
    (t[S] = g ? d + "px" : ""),
    (t.transform = ""),
    t)
  );
}
function qo(o) {
  var t = o.state,
    e = o.options,
    i = e.gpuAcceleration,
    n = i === void 0 ? !0 : i,
    a = e.adaptive,
    r = a === void 0 ? !0 : a,
    s = e.roundOffsets,
    c = s === void 0 ? !0 : s,
    l = {
      placement: yt(t.placement),
      variation: ee(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: n,
      isFixed: t.options.strategy === "fixed",
    };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      Yr(
        Object.assign({}, l, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: r,
          roundOffsets: c,
        })
      )
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        Yr(
          Object.assign({}, l, {
            offsets: t.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: c,
          })
        )
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement,
    }));
}
var Lr = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: qo,
    data: {},
  },
  we = { passive: !0 };
function ts(o) {
  var t = o.state,
    e = o.instance,
    i = o.options,
    n = i.scroll,
    a = n === void 0 ? !0 : n,
    r = i.resize,
    s = r === void 0 ? !0 : r,
    c = ut(t.elements.popper),
    l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    a &&
      l.forEach(function (u) {
        u.addEventListener("scroll", e.update, we);
      }),
    s && c.addEventListener("resize", e.update, we),
    function () {
      a &&
        l.forEach(function (u) {
          u.removeEventListener("scroll", e.update, we);
        }),
        s && c.removeEventListener("resize", e.update, we);
    }
  );
}
var Pr = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: ts,
    data: {},
  },
  es = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Re(o) {
  return o.replace(/left|right|bottom|top/g, function (t) {
    return es[t];
  });
}
var rs = { start: "end", end: "start" };
function zr(o) {
  return o.replace(/start|end/g, function (t) {
    return rs[t];
  });
}
function Rr(o) {
  var t = ut(o),
    e = t.pageXOffset,
    i = t.pageYOffset;
  return { scrollLeft: e, scrollTop: i };
}
function $r(o) {
  return te(Lt(o)).left + Rr(o).scrollLeft;
}
function ns(o, t) {
  var e = ut(o),
    i = Lt(o),
    n = e.visualViewport,
    a = i.clientWidth,
    r = i.clientHeight,
    s = 0,
    c = 0;
  if (n) {
    (a = n.width), (r = n.height);
    var l = Xn();
    (l || (!l && t === "fixed")) && ((s = n.offsetLeft), (c = n.offsetTop));
  }
  return { width: a, height: r, x: s + $r(o), y: c };
}
function os(o) {
  var t,
    e = Lt(o),
    i = Rr(o),
    n = (t = o.ownerDocument) == null ? void 0 : t.body,
    a = kt(
      e.scrollWidth,
      e.clientWidth,
      n ? n.scrollWidth : 0,
      n ? n.clientWidth : 0
    ),
    r = kt(
      e.scrollHeight,
      e.clientHeight,
      n ? n.scrollHeight : 0,
      n ? n.clientHeight : 0
    ),
    s = -i.scrollLeft + $r(o),
    c = -i.scrollTop;
  return (
    _t(n || e).direction === "rtl" &&
      (s += kt(e.clientWidth, n ? n.clientWidth : 0) - a),
    { width: a, height: r, x: s, y: c }
  );
}
function Mr(o) {
  var t = _t(o),
    e = t.overflow,
    i = t.overflowX,
    n = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + n + i);
}
function eo(o) {
  return ["html", "body", "#document"].indexOf(bt(o)) >= 0
    ? o.ownerDocument.body
    : dt(o) && Mr(o)
    ? o
    : eo(Ue(o));
}
function me(o, t) {
  var e;
  t === void 0 && (t = []);
  var i = eo(o),
    n = i === ((e = o.ownerDocument) == null ? void 0 : e.body),
    a = ut(i),
    r = n ? [a].concat(a.visualViewport || [], Mr(i) ? i : []) : i,
    s = t.concat(r);
  return n ? s : s.concat(me(Ue(r)));
}
function Er(o) {
  return Object.assign({}, o, {
    left: o.x,
    top: o.y,
    right: o.x + o.width,
    bottom: o.y + o.height,
  });
}
function ss(o, t) {
  var e = te(o, !1, t === "fixed");
  return (
    (e.top = e.top + o.clientTop),
    (e.left = e.left + o.clientLeft),
    (e.bottom = e.top + o.clientHeight),
    (e.right = e.left + o.clientWidth),
    (e.width = o.clientWidth),
    (e.height = o.clientHeight),
    (e.x = e.left),
    (e.y = e.top),
    e
  );
}
function Xr(o, t, e) {
  return t === Cr ? Er(ns(o, e)) : Ft(t) ? ss(t, e) : Er(os(Lt(o)));
}
function is(o) {
  var t = me(Ue(o)),
    e = ["absolute", "fixed"].indexOf(_t(o).position) >= 0,
    i = e && dt(o) ? Ee(o) : o;
  return Ft(i)
    ? t.filter(function (n) {
        return Ft(n) && Qn(n, i) && bt(n) !== "body";
      })
    : [];
}
function as(o, t, e, i) {
  var n = t === "clippingParents" ? is(o) : [].concat(t),
    a = [].concat(n, [e]),
    r = a[0],
    s = a.reduce(function (c, l) {
      var u = Xr(o, l, i);
      return (
        (c.top = kt(u.top, c.top)),
        (c.right = je(u.right, c.right)),
        (c.bottom = je(u.bottom, c.bottom)),
        (c.left = kt(u.left, c.left)),
        c
      );
    }, Xr(o, r, i));
  return (
    (s.width = s.right - s.left),
    (s.height = s.bottom - s.top),
    (s.x = s.left),
    (s.y = s.top),
    s
  );
}
function ro(o) {
  var t = o.reference,
    e = o.element,
    i = o.placement,
    n = i ? yt(i) : null,
    a = i ? ee(i) : null,
    r = t.x + t.width / 2 - e.width / 2,
    s = t.y + t.height / 2 - e.height / 2,
    c;
  switch (n) {
    case ot:
      c = { x: r, y: t.y - e.height };
      break;
    case ct:
      c = { x: r, y: t.y + t.height };
      break;
    case lt:
      c = { x: t.x + t.width, y: s };
      break;
    case st:
      c = { x: t.x - e.width, y: s };
      break;
    default:
      c = { x: t.x, y: t.y };
  }
  var l = n ? Dr(n) : null;
  if (l != null) {
    var u = l === "y" ? "height" : "width";
    switch (a) {
      case Vt:
        c[l] = c[l] - (t[u] / 2 - e[u] / 2);
        break;
      case Zt:
        c[l] = c[l] + (t[u] / 2 - e[u] / 2);
        break;
    }
  }
  return c;
}
function re(o, t) {
  t === void 0 && (t = {});
  var e = t,
    i = e.placement,
    n = i === void 0 ? o.placement : i,
    a = e.strategy,
    r = a === void 0 ? o.strategy : a,
    s = e.boundary,
    c = s === void 0 ? jn : s,
    l = e.rootBoundary,
    u = l === void 0 ? Cr : l,
    f = e.elementContext,
    p = f === void 0 ? zt : f,
    d = e.altBoundary,
    h = d === void 0 ? !1 : d,
    m = e.padding,
    v = m === void 0 ? 0 : m,
    g = Zn(typeof v != "number" ? v : qn(v, se)),
    y = p === zt ? kn : zt,
    S = o.rects.popper,
    b = o.elements[h ? y : p],
    A = as(Ft(b) ? b : b.contextElement || Lt(o.elements.popper), c, u, r),
    E = te(o.elements.reference),
    w = ro({ reference: E, element: S, strategy: "absolute", placement: n }),
    x = Er(Object.assign({}, S, w)),
    C = p === zt ? x : E,
    D = {
      top: A.top - C.top + g.top,
      bottom: C.bottom - A.bottom + g.bottom,
      left: A.left - C.left + g.left,
      right: C.right - A.right + g.right,
    },
    T = o.modifiersData.offset;
  if (p === zt && T) {
    var O = T[n];
    Object.keys(D).forEach(function (N) {
      var I = [lt, ct].indexOf(N) >= 0 ? 1 : -1,
        P = [ot, ct].indexOf(N) >= 0 ? "y" : "x";
      D[N] += O[P] * I;
    });
  }
  return D;
}
function cs(o, t) {
  t === void 0 && (t = {});
  var e = t,
    i = e.placement,
    n = e.boundary,
    a = e.rootBoundary,
    r = e.padding,
    s = e.flipVariations,
    c = e.allowedAutoPlacements,
    l = c === void 0 ? wr : c,
    u = ee(i),
    f = u
      ? s
        ? gr
        : gr.filter(function (h) {
            return ee(h) === u;
          })
      : se,
    p = f.filter(function (h) {
      return l.indexOf(h) >= 0;
    });
  p.length === 0 && (p = f);
  var d = p.reduce(function (h, m) {
    return (
      (h[m] = re(o, { placement: m, boundary: n, rootBoundary: a, padding: r })[
        yt(m)
      ]),
      h
    );
  }, {});
  return Object.keys(d).sort(function (h, m) {
    return d[h] - d[m];
  });
}
function ls(o) {
  if (yt(o) === Ke) return [];
  var t = Re(o);
  return [zr(o), t, zr(t)];
}
function us(o) {
  var t = o.state,
    e = o.options,
    i = o.name;
  if (!t.modifiersData[i]._skip) {
    for (
      var n = e.mainAxis,
        a = n === void 0 ? !0 : n,
        r = e.altAxis,
        s = r === void 0 ? !0 : r,
        c = e.fallbackPlacements,
        l = e.padding,
        u = e.boundary,
        f = e.rootBoundary,
        p = e.altBoundary,
        d = e.flipVariations,
        h = d === void 0 ? !0 : d,
        m = e.allowedAutoPlacements,
        v = t.options.placement,
        g = yt(v),
        y = g === v,
        S = c || (y || !h ? [Re(v)] : ls(v)),
        b = [v].concat(S).reduce(function (z, J) {
          return z.concat(
            yt(J) === Ke
              ? cs(t, {
                  placement: J,
                  boundary: u,
                  rootBoundary: f,
                  padding: l,
                  flipVariations: h,
                  allowedAutoPlacements: m,
                })
              : J
          );
        }, []),
        A = t.rects.reference,
        E = t.rects.popper,
        w = new Map(),
        x = !0,
        C = b[0],
        D = 0;
      D < b.length;
      D++
    ) {
      var T = b[D],
        O = yt(T),
        N = ee(T) === Vt,
        I = [ot, ct].indexOf(O) >= 0,
        P = I ? "width" : "height",
        R = re(t, {
          placement: T,
          boundary: u,
          rootBoundary: f,
          altBoundary: p,
          padding: l,
        }),
        M = I ? (N ? lt : st) : N ? ct : ot;
      A[P] > E[P] && (M = Re(M));
      var F = Re(M),
        k = [];
      if (
        (a && k.push(R[O] <= 0),
        s && k.push(R[M] <= 0, R[F] <= 0),
        k.every(function (z) {
          return z;
        }))
      ) {
        (C = T), (x = !1);
        break;
      }
      w.set(T, k);
    }
    if (x)
      for (
        var G = h ? 3 : 1,
          j = function (J) {
            var q = b.find(function (Q) {
              var W = w.get(Q);
              if (W)
                return W.slice(0, J).every(function (tt) {
                  return tt;
                });
            });
            if (q) return (C = q), "break";
          },
          B = G;
        B > 0;
        B--
      ) {
        var Z = j(B);
        if (Z === "break") break;
      }
    t.placement !== C &&
      ((t.modifiersData[i]._skip = !0), (t.placement = C), (t.reset = !0));
  }
}
var no = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: us,
  requiresIfExists: ["offset"],
  data: { _skip: !1 },
};
function Qr(o, t, e) {
  return (
    e === void 0 && (e = { x: 0, y: 0 }),
    {
      top: o.top - t.height - e.y,
      right: o.right - t.width + e.x,
      bottom: o.bottom - t.height + e.y,
      left: o.left - t.width - e.x,
    }
  );
}
function Jr(o) {
  return [ot, lt, ct, st].some(function (t) {
    return o[t] >= 0;
  });
}
function fs(o) {
  var t = o.state,
    e = o.name,
    i = t.rects.reference,
    n = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    r = re(t, { elementContext: "reference" }),
    s = re(t, { altBoundary: !0 }),
    c = Qr(r, i),
    l = Qr(s, n, a),
    u = Jr(c),
    f = Jr(l);
  (t.modifiersData[e] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: l,
    isReferenceHidden: u,
    hasPopperEscaped: f,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-reference-hidden": u,
      "data-popper-escaped": f,
    }));
}
var oo = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: fs,
};
function ds(o, t, e) {
  var i = yt(o),
    n = [st, ot].indexOf(i) >= 0 ? -1 : 1,
    a = typeof e == "function" ? e(Object.assign({}, t, { placement: o })) : e,
    r = a[0],
    s = a[1];
  return (
    (r = r || 0),
    (s = (s || 0) * n),
    [st, lt].indexOf(i) >= 0 ? { x: s, y: r } : { x: r, y: s }
  );
}
function ps(o) {
  var t = o.state,
    e = o.options,
    i = o.name,
    n = e.offset,
    a = n === void 0 ? [0, 0] : n,
    r = wr.reduce(function (u, f) {
      return (u[f] = ds(f, t.rects, a)), u;
    }, {}),
    s = r[t.placement],
    c = s.x,
    l = s.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c),
    (t.modifiersData.popperOffsets.y += l)),
    (t.modifiersData[i] = r);
}
var so = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: ps,
};
function hs(o) {
  var t = o.state,
    e = o.name;
  t.modifiersData[e] = ro({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement,
  });
}
var jr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: hs,
  data: {},
};
function vs(o) {
  return o === "x" ? "y" : "x";
}
function ms(o) {
  var t = o.state,
    e = o.options,
    i = o.name,
    n = e.mainAxis,
    a = n === void 0 ? !0 : n,
    r = e.altAxis,
    s = r === void 0 ? !1 : r,
    c = e.boundary,
    l = e.rootBoundary,
    u = e.altBoundary,
    f = e.padding,
    p = e.tether,
    d = p === void 0 ? !0 : p,
    h = e.tetherOffset,
    m = h === void 0 ? 0 : h,
    v = re(t, { boundary: c, rootBoundary: l, padding: f, altBoundary: u }),
    g = yt(t.placement),
    y = ee(t.placement),
    S = !y,
    b = Dr(g),
    A = vs(b),
    E = t.modifiersData.popperOffsets,
    w = t.rects.reference,
    x = t.rects.popper,
    C =
      typeof m == "function"
        ? m(Object.assign({}, t.rects, { placement: t.placement }))
        : m,
    D =
      typeof C == "number"
        ? { mainAxis: C, altAxis: C }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, C),
    T = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    O = { x: 0, y: 0 };
  if (!!E) {
    if (a) {
      var N,
        I = b === "y" ? ot : st,
        P = b === "y" ? ct : lt,
        R = b === "y" ? "height" : "width",
        M = E[b],
        F = M + v[I],
        k = M - v[P],
        G = d ? -x[R] / 2 : 0,
        j = y === Vt ? w[R] : x[R],
        B = y === Vt ? -x[R] : -w[R],
        Z = t.elements.arrow,
        z = d && Z ? Ir(Z) : { width: 0, height: 0 },
        J = t.modifiersData["arrow#persistent"]
          ? t.modifiersData["arrow#persistent"].padding
          : Jn(),
        q = J[I],
        Q = J[P],
        W = ve(0, w[R], z[R]),
        tt = S ? w[R] / 2 - G - W - q - D.mainAxis : j - W - q - D.mainAxis,
        ft = S ? -w[R] / 2 + G + W + Q + D.mainAxis : B + W + Q + D.mainAxis,
        nt = t.elements.arrow && Ee(t.elements.arrow),
        it = nt ? (b === "y" ? nt.clientTop || 0 : nt.clientLeft || 0) : 0,
        Y = (N = T == null ? void 0 : T[b]) != null ? N : 0,
        H = M + tt - Y - it,
        et = M + ft - Y,
        rt = ve(d ? je(F, H) : F, M, d ? kt(k, et) : k);
      (E[b] = rt), (O[b] = rt - M);
    }
    if (s) {
      var wt,
        tr = b === "x" ? ot : st,
        Ae = b === "x" ? ct : lt,
        gt = E[A],
        $t = A === "y" ? "height" : "width",
        le = gt + v[tr],
        ue = gt - v[Ae],
        fe = [ot, st].indexOf(g) !== -1,
        de = (wt = T == null ? void 0 : T[A]) != null ? wt : 0,
        _e = fe ? le : gt - w[$t] - x[$t] - de + D.altAxis,
        Tt = fe ? gt + w[$t] + x[$t] - de - D.altAxis : ue,
        St = d && fe ? Yo(_e, gt, Tt) : ve(d ? _e : le, gt, d ? Tt : ue);
      (E[A] = St), (O[A] = St - gt);
    }
    t.modifiersData[i] = O;
  }
}
var io = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: ms,
  requiresIfExists: ["offset"],
};
function gs(o) {
  return { scrollLeft: o.scrollLeft, scrollTop: o.scrollTop };
}
function ys(o) {
  return o === ut(o) || !dt(o) ? Rr(o) : gs(o);
}
function Es(o) {
  var t = o.getBoundingClientRect(),
    e = qt(t.width) / o.offsetWidth || 1,
    i = qt(t.height) / o.offsetHeight || 1;
  return e !== 1 || i !== 1;
}
function bs(o, t, e) {
  e === void 0 && (e = !1);
  var i = dt(t),
    n = dt(t) && Es(t),
    a = Lt(t),
    r = te(o, n, e),
    s = { scrollLeft: 0, scrollTop: 0 },
    c = { x: 0, y: 0 };
  return (
    (i || (!i && !e)) &&
      ((bt(t) !== "body" || Mr(a)) && (s = ys(t)),
      dt(t)
        ? ((c = te(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop))
        : a && (c.x = $r(a))),
    {
      x: r.left + s.scrollLeft - c.x,
      y: r.top + s.scrollTop - c.y,
      width: r.width,
      height: r.height,
    }
  );
}
function Ts(o) {
  var t = new Map(),
    e = new Set(),
    i = [];
  o.forEach(function (a) {
    t.set(a.name, a);
  });
  function n(a) {
    e.add(a.name);
    var r = [].concat(a.requires || [], a.requiresIfExists || []);
    r.forEach(function (s) {
      if (!e.has(s)) {
        var c = t.get(s);
        c && n(c);
      }
    }),
      i.push(a);
  }
  return (
    o.forEach(function (a) {
      e.has(a.name) || n(a);
    }),
    i
  );
}
function Ss(o) {
  var t = Ts(o);
  return zn.reduce(function (e, i) {
    return e.concat(
      t.filter(function (n) {
        return n.phase === i;
      })
    );
  }, []);
}
function Os(o) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (e) {
          Promise.resolve().then(function () {
            (t = void 0), e(o());
          });
        })),
      t
    );
  };
}
function As(o) {
  var t = o.reduce(function (e, i) {
    var n = e[i.name];
    return (
      (e[i.name] = n
        ? Object.assign({}, n, i, {
            options: Object.assign({}, n.options, i.options),
            data: Object.assign({}, n.data, i.data),
          })
        : i),
      e
    );
  }, {});
  return Object.keys(t).map(function (e) {
    return t[e];
  });
}
var Zr = { placement: "bottom", modifiers: [], strategy: "absolute" };
function qr() {
  for (var o = arguments.length, t = new Array(o), e = 0; e < o; e++)
    t[e] = arguments[e];
  return !t.some(function (i) {
    return !(i && typeof i.getBoundingClientRect == "function");
  });
}
function Ge(o) {
  o === void 0 && (o = {});
  var t = o,
    e = t.defaultModifiers,
    i = e === void 0 ? [] : e,
    n = t.defaultOptions,
    a = n === void 0 ? Zr : n;
  return function (s, c, l) {
    l === void 0 && (l = a);
    var u = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, Zr, a),
        modifiersData: {},
        elements: { reference: s, popper: c },
        attributes: {},
        styles: {},
      },
      f = [],
      p = !1,
      d = {
        state: u,
        setOptions: function (g) {
          var y = typeof g == "function" ? g(u.options) : g;
          m(),
            (u.options = Object.assign({}, a, u.options, y)),
            (u.scrollParents = {
              reference: Ft(s)
                ? me(s)
                : s.contextElement
                ? me(s.contextElement)
                : [],
              popper: me(c),
            });
          var S = Ss(As([].concat(i, u.options.modifiers)));
          return (
            (u.orderedModifiers = S.filter(function (b) {
              return b.enabled;
            })),
            h(),
            d.update()
          );
        },
        forceUpdate: function () {
          if (!p) {
            var g = u.elements,
              y = g.reference,
              S = g.popper;
            if (!!qr(y, S)) {
              (u.rects = {
                reference: bs(y, Ee(S), u.options.strategy === "fixed"),
                popper: Ir(S),
              }),
                (u.reset = !1),
                (u.placement = u.options.placement),
                u.orderedModifiers.forEach(function (D) {
                  return (u.modifiersData[D.name] = Object.assign({}, D.data));
                });
              for (var b = 0; b < u.orderedModifiers.length; b++) {
                if (u.reset === !0) {
                  (u.reset = !1), (b = -1);
                  continue;
                }
                var A = u.orderedModifiers[b],
                  E = A.fn,
                  w = A.options,
                  x = w === void 0 ? {} : w,
                  C = A.name;
                typeof E == "function" &&
                  (u = E({ state: u, options: x, name: C, instance: d }) || u);
              }
            }
          }
        },
        update: Os(function () {
          return new Promise(function (v) {
            d.forceUpdate(), v(u);
          });
        }),
        destroy: function () {
          m(), (p = !0);
        },
      };
    if (!qr(s, c)) return d;
    d.setOptions(l).then(function (v) {
      !p && l.onFirstUpdate && l.onFirstUpdate(v);
    });
    function h() {
      u.orderedModifiers.forEach(function (v) {
        var g = v.name,
          y = v.options,
          S = y === void 0 ? {} : y,
          b = v.effect;
        if (typeof b == "function") {
          var A = b({ state: u, name: g, instance: d, options: S }),
            E = function () {};
          f.push(A || E);
        }
      });
    }
    function m() {
      f.forEach(function (v) {
        return v();
      }),
        (f = []);
    }
    return d;
  };
}
var _s = Ge(),
  Cs = [Pr, jr, Lr, xr],
  ws = Ge({ defaultModifiers: Cs }),
  Ns = [Pr, jr, Lr, xr, so, no, io, to, oo],
  kr = Ge({ defaultModifiers: Ns }),
  ao = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        popperGenerator: Ge,
        detectOverflow: re,
        createPopperBase: _s,
        createPopper: kr,
        createPopperLite: ws,
        top: ot,
        bottom: ct,
        right: lt,
        left: st,
        auto: Ke,
        basePlacements: se,
        start: Vt,
        end: Zt,
        clippingParents: jn,
        viewport: Cr,
        popper: zt,
        reference: kn,
        variationPlacements: gr,
        placements: wr,
        beforeRead: Vn,
        read: Fn,
        afterRead: Bn,
        beforeMain: Hn,
        main: Wn,
        afterMain: Kn,
        beforeWrite: Un,
        write: Gn,
        afterWrite: Yn,
        modifierPhases: zn,
        applyStyles: xr,
        arrow: to,
        computeStyles: Lr,
        eventListeners: Pr,
        flip: no,
        hide: oo,
        offset: so,
        popperOffsets: jr,
        preventOverflow: io,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
/*!
 * Bootstrap v5.3.0 (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */ const Nt = new Map(),
  rr = {
    set(o, t, e) {
      Nt.has(o) || Nt.set(o, new Map());
      const i = Nt.get(o);
      if (!i.has(t) && i.size !== 0) {
        console.error(
          `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
            Array.from(i.keys())[0]
          }.`
        );
        return;
      }
      i.set(t, e);
    },
    get(o, t) {
      return (Nt.has(o) && Nt.get(o).get(t)) || null;
    },
    remove(o, t) {
      if (!Nt.has(o)) return;
      const e = Nt.get(o);
      e.delete(t), e.size === 0 && Nt.delete(o);
    },
  },
  xs = 1e6,
  Is = 1e3,
  br = "transitionend",
  co = (o) => (
    o &&
      window.CSS &&
      window.CSS.escape &&
      (o = o.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)),
    o
  ),
  Ds = (o) =>
    o == null
      ? `${o}`
      : Object.prototype.toString
          .call(o)
          .match(/\s([a-z]+)/i)[1]
          .toLowerCase(),
  Ls = (o) => {
    do o += Math.floor(Math.random() * xs);
    while (document.getElementById(o));
    return o;
  },
  Ps = (o) => {
    if (!o) return 0;
    let { transitionDuration: t, transitionDelay: e } =
      window.getComputedStyle(o);
    const i = Number.parseFloat(t),
      n = Number.parseFloat(e);
    return !i && !n
      ? 0
      : ((t = t.split(",")[0]),
        (e = e.split(",")[0]),
        (Number.parseFloat(t) + Number.parseFloat(e)) * Is);
  },
  lo = (o) => {
    o.dispatchEvent(new Event(br));
  },
  Ot = (o) =>
    !o || typeof o != "object"
      ? !1
      : (typeof o.jquery != "undefined" && (o = o[0]),
        typeof o.nodeType != "undefined"),
  xt = (o) =>
    Ot(o)
      ? o.jquery
        ? o[0]
        : o
      : typeof o == "string" && o.length > 0
      ? document.querySelector(co(o))
      : null,
  ie = (o) => {
    if (!Ot(o) || o.getClientRects().length === 0) return !1;
    const t = getComputedStyle(o).getPropertyValue("visibility") === "visible",
      e = o.closest("details:not([open])");
    if (!e) return t;
    if (e !== o) {
      const i = o.closest("summary");
      if ((i && i.parentNode !== e) || i === null) return !1;
    }
    return t;
  },
  It = (o) =>
    !o || o.nodeType !== Node.ELEMENT_NODE || o.classList.contains("disabled")
      ? !0
      : typeof o.disabled != "undefined"
      ? o.disabled
      : o.hasAttribute("disabled") && o.getAttribute("disabled") !== "false",
  uo = (o) => {
    if (!document.documentElement.attachShadow) return null;
    if (typeof o.getRootNode == "function") {
      const t = o.getRootNode();
      return t instanceof ShadowRoot ? t : null;
    }
    return o instanceof ShadowRoot ? o : o.parentNode ? uo(o.parentNode) : null;
  },
  ke = () => {},
  be = (o) => {
    o.offsetHeight;
  },
  fo = () =>
    window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
      ? window.jQuery
      : null,
  nr = [],
  Rs = (o) => {
    document.readyState === "loading"
      ? (nr.length ||
          document.addEventListener("DOMContentLoaded", () => {
            for (const t of nr) t();
          }),
        nr.push(o))
      : o();
  },
  pt = () => document.documentElement.dir === "rtl",
  vt = (o) => {
    Rs(() => {
      const t = fo();
      if (t) {
        const e = o.NAME,
          i = t.fn[e];
        (t.fn[e] = o.jQueryInterface),
          (t.fn[e].Constructor = o),
          (t.fn[e].noConflict = () => ((t.fn[e] = i), o.jQueryInterface));
      }
    });
  },
  at = (o, t = [], e = o) => (typeof o == "function" ? o(...t) : e),
  po = (o, t, e = !0) => {
    if (!e) {
      at(o);
      return;
    }
    const i = 5,
      n = Ps(t) + i;
    let a = !1;
    const r = ({ target: s }) => {
      s === t && ((a = !0), t.removeEventListener(br, r), at(o));
    };
    t.addEventListener(br, r),
      setTimeout(() => {
        a || lo(t);
      }, n);
  },
  Vr = (o, t, e, i) => {
    const n = o.length;
    let a = o.indexOf(t);
    return a === -1
      ? !e && i
        ? o[n - 1]
        : o[0]
      : ((a += e ? 1 : -1),
        i && (a = (a + n) % n),
        o[Math.max(0, Math.min(a, n - 1))]);
  },
  $s = /[^.]*(?=\..*)\.|.*/,
  Ms = /\..*/,
  js = /::\d+$/,
  or = {};
let tn = 1;
const ho = { mouseenter: "mouseover", mouseleave: "mouseout" },
  ks = new Set([
    "click",
    "dblclick",
    "mouseup",
    "mousedown",
    "contextmenu",
    "mousewheel",
    "DOMMouseScroll",
    "mouseover",
    "mouseout",
    "mousemove",
    "selectstart",
    "selectend",
    "keydown",
    "keypress",
    "keyup",
    "orientationchange",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointerleave",
    "pointercancel",
    "gesturestart",
    "gesturechange",
    "gestureend",
    "focus",
    "blur",
    "change",
    "reset",
    "select",
    "submit",
    "focusin",
    "focusout",
    "load",
    "unload",
    "beforeunload",
    "resize",
    "move",
    "DOMContentLoaded",
    "readystatechange",
    "error",
    "abort",
    "scroll",
  ]);
function vo(o, t) {
  return (t && `${t}::${tn++}`) || o.uidEvent || tn++;
}
function mo(o) {
  const t = vo(o);
  return (o.uidEvent = t), (or[t] = or[t] || {}), or[t];
}
function Vs(o, t) {
  return function e(i) {
    return (
      Fr(i, { delegateTarget: o }),
      e.oneOff && _.off(o, i.type, t),
      t.apply(o, [i])
    );
  };
}
function Fs(o, t, e) {
  return function i(n) {
    const a = o.querySelectorAll(t);
    for (let { target: r } = n; r && r !== this; r = r.parentNode)
      for (const s of a)
        if (s === r)
          return (
            Fr(n, { delegateTarget: r }),
            i.oneOff && _.off(o, n.type, t, e),
            e.apply(r, [n])
          );
  };
}
function go(o, t, e = null) {
  return Object.values(o).find(
    (i) => i.callable === t && i.delegationSelector === e
  );
}
function yo(o, t, e) {
  const i = typeof t == "string",
    n = i ? e : t || e;
  let a = Eo(o);
  return ks.has(a) || (a = o), [i, n, a];
}
function en(o, t, e, i, n) {
  if (typeof t != "string" || !o) return;
  let [a, r, s] = yo(t, e, i);
  t in ho &&
    (r = ((h) =>
      function (m) {
        if (
          !m.relatedTarget ||
          (m.relatedTarget !== m.delegateTarget &&
            !m.delegateTarget.contains(m.relatedTarget))
        )
          return h.call(this, m);
      })(r));
  const c = mo(o),
    l = c[s] || (c[s] = {}),
    u = go(l, r, a ? e : null);
  if (u) {
    u.oneOff = u.oneOff && n;
    return;
  }
  const f = vo(r, t.replace($s, "")),
    p = a ? Fs(o, e, r) : Vs(o, r);
  (p.delegationSelector = a ? e : null),
    (p.callable = r),
    (p.oneOff = n),
    (p.uidEvent = f),
    (l[f] = p),
    o.addEventListener(s, p, a);
}
function Tr(o, t, e, i, n) {
  const a = go(t[e], i, n);
  !a || (o.removeEventListener(e, a, Boolean(n)), delete t[e][a.uidEvent]);
}
function Bs(o, t, e, i) {
  const n = t[e] || {};
  for (const [a, r] of Object.entries(n))
    a.includes(i) && Tr(o, t, e, r.callable, r.delegationSelector);
}
function Eo(o) {
  return (o = o.replace(Ms, "")), ho[o] || o;
}
const _ = {
  on(o, t, e, i) {
    en(o, t, e, i, !1);
  },
  one(o, t, e, i) {
    en(o, t, e, i, !0);
  },
  off(o, t, e, i) {
    if (typeof t != "string" || !o) return;
    const [n, a, r] = yo(t, e, i),
      s = r !== t,
      c = mo(o),
      l = c[r] || {},
      u = t.startsWith(".");
    if (typeof a != "undefined") {
      if (!Object.keys(l).length) return;
      Tr(o, c, r, a, n ? e : null);
      return;
    }
    if (u) for (const f of Object.keys(c)) Bs(o, c, f, t.slice(1));
    for (const [f, p] of Object.entries(l)) {
      const d = f.replace(js, "");
      (!s || t.includes(d)) && Tr(o, c, r, p.callable, p.delegationSelector);
    }
  },
  trigger(o, t, e) {
    if (typeof t != "string" || !o) return null;
    const i = fo(),
      n = Eo(t),
      a = t !== n;
    let r = null,
      s = !0,
      c = !0,
      l = !1;
    a &&
      i &&
      ((r = i.Event(t, e)),
      i(o).trigger(r),
      (s = !r.isPropagationStopped()),
      (c = !r.isImmediatePropagationStopped()),
      (l = r.isDefaultPrevented()));
    const u = Fr(new Event(t, { bubbles: s, cancelable: !0 }), e);
    return (
      l && u.preventDefault(),
      c && o.dispatchEvent(u),
      u.defaultPrevented && r && r.preventDefault(),
      u
    );
  },
};
function Fr(o, t = {}) {
  for (const [e, i] of Object.entries(t))
    try {
      o[e] = i;
    } catch {
      Object.defineProperty(o, e, {
        configurable: !0,
        get() {
          return i;
        },
      });
    }
  return o;
}
function rn(o) {
  if (o === "true") return !0;
  if (o === "false") return !1;
  if (o === Number(o).toString()) return Number(o);
  if (o === "" || o === "null") return null;
  if (typeof o != "string") return o;
  try {
    return JSON.parse(decodeURIComponent(o));
  } catch {
    return o;
  }
}
function sr(o) {
  return o.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const At = {
  setDataAttribute(o, t, e) {
    o.setAttribute(`data-bs-${sr(t)}`, e);
  },
  removeDataAttribute(o, t) {
    o.removeAttribute(`data-bs-${sr(t)}`);
  },
  getDataAttributes(o) {
    if (!o) return {};
    const t = {},
      e = Object.keys(o.dataset).filter(
        (i) => i.startsWith("bs") && !i.startsWith("bsConfig")
      );
    for (const i of e) {
      let n = i.replace(/^bs/, "");
      (n = n.charAt(0).toLowerCase() + n.slice(1, n.length)),
        (t[n] = rn(o.dataset[i]));
    }
    return t;
  },
  getDataAttribute(o, t) {
    return rn(o.getAttribute(`data-bs-${sr(t)}`));
  },
};
class Te {
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error(
      'You have to implement the static method "NAME", for each component!'
    );
  }
  _getConfig(t) {
    return (
      (t = this._mergeConfigObj(t)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  _configAfterMerge(t) {
    return t;
  }
  _mergeConfigObj(t, e) {
    const i = Ot(e) ? At.getDataAttribute(e, "config") : {};
    return {
      ...this.constructor.Default,
      ...(typeof i == "object" ? i : {}),
      ...(Ot(e) ? At.getDataAttributes(e) : {}),
      ...(typeof t == "object" ? t : {}),
    };
  }
  _typeCheckConfig(t, e = this.constructor.DefaultType) {
    for (const [i, n] of Object.entries(e)) {
      const a = t[i],
        r = Ot(a) ? "element" : Ds(a);
      if (!new RegExp(n).test(r))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${r}" but expected type "${n}".`
        );
    }
  }
}
const Hs = "5.3.0";
class mt extends Te {
  constructor(t, e) {
    super(),
      (t = xt(t)),
      t &&
        ((this._element = t),
        (this._config = this._getConfig(e)),
        rr.set(this._element, this.constructor.DATA_KEY, this));
  }
  dispose() {
    rr.remove(this._element, this.constructor.DATA_KEY),
      _.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
  }
  _queueCallback(t, e, i = !0) {
    po(t, e, i);
  }
  _getConfig(t) {
    return (
      (t = this._mergeConfigObj(t, this._element)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  static getInstance(t) {
    return rr.get(xt(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
  static get VERSION() {
    return Hs;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(t) {
    return `${t}${this.EVENT_KEY}`;
  }
}
const ir = (o) => {
    let t = o.getAttribute("data-bs-target");
    if (!t || t === "#") {
      let e = o.getAttribute("href");
      if (!e || (!e.includes("#") && !e.startsWith("."))) return null;
      e.includes("#") && !e.startsWith("#") && (e = `#${e.split("#")[1]}`),
        (t = e && e !== "#" ? e.trim() : null);
    }
    return co(t);
  },
  $ = {
    find(o, t = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(t, o));
    },
    findOne(o, t = document.documentElement) {
      return Element.prototype.querySelector.call(t, o);
    },
    children(o, t) {
      return [].concat(...o.children).filter((e) => e.matches(t));
    },
    parents(o, t) {
      const e = [];
      let i = o.parentNode.closest(t);
      for (; i; ) e.push(i), (i = i.parentNode.closest(t));
      return e;
    },
    prev(o, t) {
      let e = o.previousElementSibling;
      for (; e; ) {
        if (e.matches(t)) return [e];
        e = e.previousElementSibling;
      }
      return [];
    },
    next(o, t) {
      let e = o.nextElementSibling;
      for (; e; ) {
        if (e.matches(t)) return [e];
        e = e.nextElementSibling;
      }
      return [];
    },
    focusableChildren(o) {
      const t = [
        "a",
        "button",
        "input",
        "textarea",
        "select",
        "details",
        "[tabindex]",
        '[contenteditable="true"]',
      ]
        .map((e) => `${e}:not([tabindex^="-"])`)
        .join(",");
      return this.find(t, o).filter((e) => !It(e) && ie(e));
    },
    getSelectorFromElement(o) {
      const t = ir(o);
      return t && $.findOne(t) ? t : null;
    },
    getElementFromSelector(o) {
      const t = ir(o);
      return t ? $.findOne(t) : null;
    },
    getMultipleElementsFromSelector(o) {
      const t = ir(o);
      return t ? $.find(t) : [];
    },
  },
  Ye = (o, t = "hide") => {
    const e = `click.dismiss${o.EVENT_KEY}`,
      i = o.NAME;
    _.on(document, e, `[data-bs-dismiss="${i}"]`, function (n) {
      if (
        (["A", "AREA"].includes(this.tagName) && n.preventDefault(), It(this))
      )
        return;
      const a = $.getElementFromSelector(this) || this.closest(`.${i}`);
      o.getOrCreateInstance(a)[t]();
    });
  },
  Ws = "alert",
  Ks = "bs.alert",
  bo = `.${Ks}`,
  Us = `close${bo}`,
  Gs = `closed${bo}`,
  Ys = "fade",
  zs = "show";
class ze extends mt {
  static get NAME() {
    return Ws;
  }
  close() {
    if (_.trigger(this._element, Us).defaultPrevented) return;
    this._element.classList.remove(zs);
    const e = this._element.classList.contains(Ys);
    this._queueCallback(() => this._destroyElement(), this._element, e);
  }
  _destroyElement() {
    this._element.remove(), _.trigger(this._element, Gs), this.dispose();
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = ze.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
Ye(ze, "close");
vt(ze);
const Xs = "button",
  Qs = "bs.button",
  Js = `.${Qs}`,
  Zs = ".data-api",
  qs = "active",
  nn = '[data-bs-toggle="button"]',
  ti = `click${Js}${Zs}`;
class Xe extends mt {
  static get NAME() {
    return Xs;
  }
  toggle() {
    this._element.setAttribute(
      "aria-pressed",
      this._element.classList.toggle(qs)
    );
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Xe.getOrCreateInstance(this);
      t === "toggle" && e[t]();
    });
  }
}
_.on(document, ti, nn, (o) => {
  o.preventDefault();
  const t = o.target.closest(nn);
  Xe.getOrCreateInstance(t).toggle();
});
vt(Xe);
const ei = "swipe",
  ae = ".bs.swipe",
  ri = `touchstart${ae}`,
  ni = `touchmove${ae}`,
  oi = `touchend${ae}`,
  si = `pointerdown${ae}`,
  ii = `pointerup${ae}`,
  ai = "touch",
  ci = "pen",
  li = "pointer-event",
  ui = 40,
  fi = { endCallback: null, leftCallback: null, rightCallback: null },
  di = {
    endCallback: "(function|null)",
    leftCallback: "(function|null)",
    rightCallback: "(function|null)",
  };
class Ve extends Te {
  constructor(t, e) {
    super(),
      (this._element = t),
      !(!t || !Ve.isSupported()) &&
        ((this._config = this._getConfig(e)),
        (this._deltaX = 0),
        (this._supportPointerEvents = Boolean(window.PointerEvent)),
        this._initEvents());
  }
  static get Default() {
    return fi;
  }
  static get DefaultType() {
    return di;
  }
  static get NAME() {
    return ei;
  }
  dispose() {
    _.off(this._element, ae);
  }
  _start(t) {
    if (!this._supportPointerEvents) {
      this._deltaX = t.touches[0].clientX;
      return;
    }
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX);
  }
  _end(t) {
    this._eventIsPointerPenTouch(t) &&
      (this._deltaX = t.clientX - this._deltaX),
      this._handleSwipe(),
      at(this._config.endCallback);
  }
  _move(t) {
    this._deltaX =
      t.touches && t.touches.length > 1
        ? 0
        : t.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX);
    if (t <= ui) return;
    const e = t / this._deltaX;
    (this._deltaX = 0),
      e && at(e > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents
      ? (_.on(this._element, si, (t) => this._start(t)),
        _.on(this._element, ii, (t) => this._end(t)),
        this._element.classList.add(li))
      : (_.on(this._element, ri, (t) => this._start(t)),
        _.on(this._element, ni, (t) => this._move(t)),
        _.on(this._element, oi, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return (
      this._supportPointerEvents &&
      (t.pointerType === ci || t.pointerType === ai)
    );
  }
  static isSupported() {
    return (
      "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
    );
  }
}
const pi = "carousel",
  hi = "bs.carousel",
  Pt = `.${hi}`,
  To = ".data-api",
  vi = "ArrowLeft",
  mi = "ArrowRight",
  gi = 500,
  pe = "next",
  Gt = "prev",
  Xt = "left",
  $e = "right",
  yi = `slide${Pt}`,
  ar = `slid${Pt}`,
  Ei = `keydown${Pt}`,
  bi = `mouseenter${Pt}`,
  Ti = `mouseleave${Pt}`,
  Si = `dragstart${Pt}`,
  Oi = `load${Pt}${To}`,
  Ai = `click${Pt}${To}`,
  So = "carousel",
  Ne = "active",
  _i = "slide",
  Ci = "carousel-item-end",
  wi = "carousel-item-start",
  Ni = "carousel-item-next",
  xi = "carousel-item-prev",
  Oo = ".active",
  Ao = ".carousel-item",
  Ii = Oo + Ao,
  Di = ".carousel-item img",
  Li = ".carousel-indicators",
  Pi = "[data-bs-slide], [data-bs-slide-to]",
  Ri = '[data-bs-ride="carousel"]',
  $i = { [vi]: $e, [mi]: Xt },
  Mi = {
    interval: 5e3,
    keyboard: !0,
    pause: "hover",
    ride: !1,
    touch: !0,
    wrap: !0,
  },
  ji = {
    interval: "(number|boolean)",
    keyboard: "boolean",
    pause: "(string|boolean)",
    ride: "(boolean|string)",
    touch: "boolean",
    wrap: "boolean",
  };
class Se extends mt {
  constructor(t, e) {
    super(t, e),
      (this._interval = null),
      (this._activeElement = null),
      (this._isSliding = !1),
      (this.touchTimeout = null),
      (this._swipeHelper = null),
      (this._indicatorsElement = $.findOne(Li, this._element)),
      this._addEventListeners(),
      this._config.ride === So && this.cycle();
  }
  static get Default() {
    return Mi;
  }
  static get DefaultType() {
    return ji;
  }
  static get NAME() {
    return pi;
  }
  next() {
    this._slide(pe);
  }
  nextWhenVisible() {
    !document.hidden && ie(this._element) && this.next();
  }
  prev() {
    this._slide(Gt);
  }
  pause() {
    this._isSliding && lo(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(),
      this._updateInterval(),
      (this._interval = setInterval(
        () => this.nextWhenVisible(),
        this._config.interval
      ));
  }
  _maybeEnableCycle() {
    if (!!this._config.ride) {
      if (this._isSliding) {
        _.one(this._element, ar, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  to(t) {
    const e = this._getItems();
    if (t > e.length - 1 || t < 0) return;
    if (this._isSliding) {
      _.one(this._element, ar, () => this.to(t));
      return;
    }
    const i = this._getItemIndex(this._getActive());
    if (i === t) return;
    const n = t > i ? pe : Gt;
    this._slide(n, e[t]);
  }
  dispose() {
    this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
  }
  _configAfterMerge(t) {
    return (t.defaultInterval = t.interval), t;
  }
  _addEventListeners() {
    this._config.keyboard && _.on(this._element, Ei, (t) => this._keydown(t)),
      this._config.pause === "hover" &&
        (_.on(this._element, bi, () => this.pause()),
        _.on(this._element, Ti, () => this._maybeEnableCycle())),
      this._config.touch && Ve.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const i of $.find(Di, this._element))
      _.on(i, Si, (n) => n.preventDefault());
    const e = {
      leftCallback: () => this._slide(this._directionToOrder(Xt)),
      rightCallback: () => this._slide(this._directionToOrder($e)),
      endCallback: () => {
        this._config.pause === "hover" &&
          (this.pause(),
          this.touchTimeout && clearTimeout(this.touchTimeout),
          (this.touchTimeout = setTimeout(
            () => this._maybeEnableCycle(),
            gi + this._config.interval
          )));
      },
    };
    this._swipeHelper = new Ve(this._element, e);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName)) return;
    const e = $i[t.key];
    e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement) return;
    const e = $.findOne(Oo, this._indicatorsElement);
    e.classList.remove(Ne), e.removeAttribute("aria-current");
    const i = $.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    i && (i.classList.add(Ne), i.setAttribute("aria-current", "true"));
  }
  _updateInterval() {
    const t = this._activeElement || this._getActive();
    if (!t) return;
    const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
    this._config.interval = e || this._config.defaultInterval;
  }
  _slide(t, e = null) {
    if (this._isSliding) return;
    const i = this._getActive(),
      n = t === pe,
      a = e || Vr(this._getItems(), i, n, this._config.wrap);
    if (a === i) return;
    const r = this._getItemIndex(a),
      s = (d) =>
        _.trigger(this._element, d, {
          relatedTarget: a,
          direction: this._orderToDirection(t),
          from: this._getItemIndex(i),
          to: r,
        });
    if (s(yi).defaultPrevented || !i || !a) return;
    const l = Boolean(this._interval);
    this.pause(),
      (this._isSliding = !0),
      this._setActiveIndicatorElement(r),
      (this._activeElement = a);
    const u = n ? wi : Ci,
      f = n ? Ni : xi;
    a.classList.add(f), be(a), i.classList.add(u), a.classList.add(u);
    const p = () => {
      a.classList.remove(u, f),
        a.classList.add(Ne),
        i.classList.remove(Ne, f, u),
        (this._isSliding = !1),
        s(ar);
    };
    this._queueCallback(p, i, this._isAnimated()), l && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(_i);
  }
  _getActive() {
    return $.findOne(Ii, this._element);
  }
  _getItems() {
    return $.find(Ao, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), (this._interval = null));
  }
  _directionToOrder(t) {
    return pt() ? (t === Xt ? Gt : pe) : t === Xt ? pe : Gt;
  }
  _orderToDirection(t) {
    return pt() ? (t === Gt ? Xt : $e) : t === Gt ? $e : Xt;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Se.getOrCreateInstance(this, t);
      if (typeof t == "number") {
        e.to(t);
        return;
      }
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
_.on(document, Ai, Pi, function (o) {
  const t = $.getElementFromSelector(this);
  if (!t || !t.classList.contains(So)) return;
  o.preventDefault();
  const e = Se.getOrCreateInstance(t),
    i = this.getAttribute("data-bs-slide-to");
  if (i) {
    e.to(i), e._maybeEnableCycle();
    return;
  }
  if (At.getDataAttribute(this, "slide") === "next") {
    e.next(), e._maybeEnableCycle();
    return;
  }
  e.prev(), e._maybeEnableCycle();
});
_.on(window, Oi, () => {
  const o = $.find(Ri);
  for (const t of o) Se.getOrCreateInstance(t);
});
vt(Se);
const ki = "collapse",
  Vi = "bs.collapse",
  Oe = `.${Vi}`,
  Fi = ".data-api",
  Bi = `show${Oe}`,
  Hi = `shown${Oe}`,
  Wi = `hide${Oe}`,
  Ki = `hidden${Oe}`,
  Ui = `click${Oe}${Fi}`,
  cr = "show",
  Jt = "collapse",
  xe = "collapsing",
  Gi = "collapsed",
  Yi = `:scope .${Jt} .${Jt}`,
  zi = "collapse-horizontal",
  Xi = "width",
  Qi = "height",
  Ji = ".collapse.show, .collapse.collapsing",
  Sr = '[data-bs-toggle="collapse"]',
  Zi = { parent: null, toggle: !0 },
  qi = { parent: "(null|element)", toggle: "boolean" };
class ge extends mt {
  constructor(t, e) {
    super(t, e), (this._isTransitioning = !1), (this._triggerArray = []);
    const i = $.find(Sr);
    for (const n of i) {
      const a = $.getSelectorFromElement(n),
        r = $.find(a).filter((s) => s === this._element);
      a !== null && r.length && this._triggerArray.push(n);
    }
    this._initializeChildren(),
      this._config.parent ||
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
      this._config.toggle && this.toggle();
  }
  static get Default() {
    return Zi;
  }
  static get DefaultType() {
    return qi;
  }
  static get NAME() {
    return ki;
  }
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown()) return;
    let t = [];
    if (
      (this._config.parent &&
        (t = this._getFirstLevelChildren(Ji)
          .filter((s) => s !== this._element)
          .map((s) => ge.getOrCreateInstance(s, { toggle: !1 }))),
      (t.length && t[0]._isTransitioning) ||
        _.trigger(this._element, Bi).defaultPrevented)
    )
      return;
    for (const s of t) s.hide();
    const i = this._getDimension();
    this._element.classList.remove(Jt),
      this._element.classList.add(xe),
      (this._element.style[i] = 0),
      this._addAriaAndCollapsedClass(this._triggerArray, !0),
      (this._isTransitioning = !0);
    const n = () => {
        (this._isTransitioning = !1),
          this._element.classList.remove(xe),
          this._element.classList.add(Jt, cr),
          (this._element.style[i] = ""),
          _.trigger(this._element, Hi);
      },
      r = `scroll${i[0].toUpperCase() + i.slice(1)}`;
    this._queueCallback(n, this._element, !0),
      (this._element.style[i] = `${this._element[r]}px`);
  }
  hide() {
    if (
      this._isTransitioning ||
      !this._isShown() ||
      _.trigger(this._element, Wi).defaultPrevented
    )
      return;
    const e = this._getDimension();
    (this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`),
      be(this._element),
      this._element.classList.add(xe),
      this._element.classList.remove(Jt, cr);
    for (const n of this._triggerArray) {
      const a = $.getElementFromSelector(n);
      a && !this._isShown(a) && this._addAriaAndCollapsedClass([n], !1);
    }
    this._isTransitioning = !0;
    const i = () => {
      (this._isTransitioning = !1),
        this._element.classList.remove(xe),
        this._element.classList.add(Jt),
        _.trigger(this._element, Ki);
    };
    (this._element.style[e] = ""), this._queueCallback(i, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(cr);
  }
  _configAfterMerge(t) {
    return (t.toggle = Boolean(t.toggle)), (t.parent = xt(t.parent)), t;
  }
  _getDimension() {
    return this._element.classList.contains(zi) ? Xi : Qi;
  }
  _initializeChildren() {
    if (!this._config.parent) return;
    const t = this._getFirstLevelChildren(Sr);
    for (const e of t) {
      const i = $.getElementFromSelector(e);
      i && this._addAriaAndCollapsedClass([e], this._isShown(i));
    }
  }
  _getFirstLevelChildren(t) {
    const e = $.find(Yi, this._config.parent);
    return $.find(t, this._config.parent).filter((i) => !e.includes(i));
  }
  _addAriaAndCollapsedClass(t, e) {
    if (!!t.length)
      for (const i of t)
        i.classList.toggle(Gi, !e), i.setAttribute("aria-expanded", e);
  }
  static jQueryInterface(t) {
    const e = {};
    return (
      typeof t == "string" && /show|hide/.test(t) && (e.toggle = !1),
      this.each(function () {
        const i = ge.getOrCreateInstance(this, e);
        if (typeof t == "string") {
          if (typeof i[t] == "undefined")
            throw new TypeError(`No method named "${t}"`);
          i[t]();
        }
      })
    );
  }
}
_.on(document, Ui, Sr, function (o) {
  (o.target.tagName === "A" ||
    (o.delegateTarget && o.delegateTarget.tagName === "A")) &&
    o.preventDefault();
  for (const t of $.getMultipleElementsFromSelector(this))
    ge.getOrCreateInstance(t, { toggle: !1 }).toggle();
});
vt(ge);
const on = "dropdown",
  ta = "bs.dropdown",
  Bt = `.${ta}`,
  Br = ".data-api",
  ea = "Escape",
  sn = "Tab",
  ra = "ArrowUp",
  an = "ArrowDown",
  na = 2,
  oa = `hide${Bt}`,
  sa = `hidden${Bt}`,
  ia = `show${Bt}`,
  aa = `shown${Bt}`,
  _o = `click${Bt}${Br}`,
  Co = `keydown${Bt}${Br}`,
  ca = `keyup${Bt}${Br}`,
  Qt = "show",
  la = "dropup",
  ua = "dropend",
  fa = "dropstart",
  da = "dropup-center",
  pa = "dropdown-center",
  Mt = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
  ha = `${Mt}.${Qt}`,
  Me = ".dropdown-menu",
  va = ".navbar",
  ma = ".navbar-nav",
  ga = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
  ya = pt() ? "top-end" : "top-start",
  Ea = pt() ? "top-start" : "top-end",
  ba = pt() ? "bottom-end" : "bottom-start",
  Ta = pt() ? "bottom-start" : "bottom-end",
  Sa = pt() ? "left-start" : "right-start",
  Oa = pt() ? "right-start" : "left-start",
  Aa = "top",
  _a = "bottom",
  Ca = {
    autoClose: !0,
    boundary: "clippingParents",
    display: "dynamic",
    offset: [0, 2],
    popperConfig: null,
    reference: "toggle",
  },
  wa = {
    autoClose: "(boolean|string)",
    boundary: "(string|element)",
    display: "string",
    offset: "(array|string|function)",
    popperConfig: "(null|object|function)",
    reference: "(string|element|object)",
  };
class Et extends mt {
  constructor(t, e) {
    super(t, e),
      (this._popper = null),
      (this._parent = this._element.parentNode),
      (this._menu =
        $.next(this._element, Me)[0] ||
        $.prev(this._element, Me)[0] ||
        $.findOne(Me, this._parent)),
      (this._inNavbar = this._detectNavbar());
  }
  static get Default() {
    return Ca;
  }
  static get DefaultType() {
    return wa;
  }
  static get NAME() {
    return on;
  }
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (It(this._element) || this._isShown()) return;
    const t = { relatedTarget: this._element };
    if (!_.trigger(this._element, ia, t).defaultPrevented) {
      if (
        (this._createPopper(),
        "ontouchstart" in document.documentElement && !this._parent.closest(ma))
      )
        for (const i of [].concat(...document.body.children))
          _.on(i, "mouseover", ke);
      this._element.focus(),
        this._element.setAttribute("aria-expanded", !0),
        this._menu.classList.add(Qt),
        this._element.classList.add(Qt),
        _.trigger(this._element, aa, t);
    }
  }
  hide() {
    if (It(this._element) || !this._isShown()) return;
    const t = { relatedTarget: this._element };
    this._completeHide(t);
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose();
  }
  update() {
    (this._inNavbar = this._detectNavbar()),
      this._popper && this._popper.update();
  }
  _completeHide(t) {
    if (!_.trigger(this._element, oa, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const i of [].concat(...document.body.children))
          _.off(i, "mouseover", ke);
      this._popper && this._popper.destroy(),
        this._menu.classList.remove(Qt),
        this._element.classList.remove(Qt),
        this._element.setAttribute("aria-expanded", "false"),
        At.removeDataAttribute(this._menu, "popper"),
        _.trigger(this._element, sa, t);
    }
  }
  _getConfig(t) {
    if (
      ((t = super._getConfig(t)),
      typeof t.reference == "object" &&
        !Ot(t.reference) &&
        typeof t.reference.getBoundingClientRect != "function")
    )
      throw new TypeError(
        `${on.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
      );
    return t;
  }
  _createPopper() {
    if (typeof ao == "undefined")
      throw new TypeError(
        "Bootstrap's dropdowns require Popper (https://popper.js.org)"
      );
    let t = this._element;
    this._config.reference === "parent"
      ? (t = this._parent)
      : Ot(this._config.reference)
      ? (t = xt(this._config.reference))
      : typeof this._config.reference == "object" &&
        (t = this._config.reference);
    const e = this._getPopperConfig();
    this._popper = kr(t, this._menu, e);
  }
  _isShown() {
    return this._menu.classList.contains(Qt);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(ua)) return Sa;
    if (t.classList.contains(fa)) return Oa;
    if (t.classList.contains(da)) return Aa;
    if (t.classList.contains(pa)) return _a;
    const e =
      getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() ===
      "end";
    return t.classList.contains(la) ? (e ? Ea : ya) : e ? Ta : ba;
  }
  _detectNavbar() {
    return this._element.closest(va) !== null;
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == "string"
      ? t.split(",").map((e) => Number.parseInt(e, 10))
      : typeof t == "function"
      ? (e) => t(e, this._element)
      : t;
  }
  _getPopperConfig() {
    const t = {
      placement: this._getPlacement(),
      modifiers: [
        {
          name: "preventOverflow",
          options: { boundary: this._config.boundary },
        },
        { name: "offset", options: { offset: this._getOffset() } },
      ],
    };
    return (
      (this._inNavbar || this._config.display === "static") &&
        (At.setDataAttribute(this._menu, "popper", "static"),
        (t.modifiers = [{ name: "applyStyles", enabled: !1 }])),
      { ...t, ...at(this._config.popperConfig, [t]) }
    );
  }
  _selectMenuItem({ key: t, target: e }) {
    const i = $.find(ga, this._menu).filter((n) => ie(n));
    !i.length || Vr(i, e, t === an, !i.includes(e)).focus();
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Et.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] == "undefined")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === na || (t.type === "keyup" && t.key !== sn)) return;
    const e = $.find(ha);
    for (const i of e) {
      const n = Et.getInstance(i);
      if (!n || n._config.autoClose === !1) continue;
      const a = t.composedPath(),
        r = a.includes(n._menu);
      if (
        a.includes(n._element) ||
        (n._config.autoClose === "inside" && !r) ||
        (n._config.autoClose === "outside" && r) ||
        (n._menu.contains(t.target) &&
          ((t.type === "keyup" && t.key === sn) ||
            /input|select|option|textarea|form/i.test(t.target.tagName)))
      )
        continue;
      const s = { relatedTarget: n._element };
      t.type === "click" && (s.clickEvent = t), n._completeHide(s);
    }
  }
  static dataApiKeydownHandler(t) {
    const e = /input|textarea/i.test(t.target.tagName),
      i = t.key === ea,
      n = [ra, an].includes(t.key);
    if ((!n && !i) || (e && !i)) return;
    t.preventDefault();
    const a = this.matches(Mt)
        ? this
        : $.prev(this, Mt)[0] ||
          $.next(this, Mt)[0] ||
          $.findOne(Mt, t.delegateTarget.parentNode),
      r = Et.getOrCreateInstance(a);
    if (n) {
      t.stopPropagation(), r.show(), r._selectMenuItem(t);
      return;
    }
    r._isShown() && (t.stopPropagation(), r.hide(), a.focus());
  }
}
_.on(document, Co, Mt, Et.dataApiKeydownHandler);
_.on(document, Co, Me, Et.dataApiKeydownHandler);
_.on(document, _o, Et.clearMenus);
_.on(document, ca, Et.clearMenus);
_.on(document, _o, Mt, function (o) {
  o.preventDefault(), Et.getOrCreateInstance(this).toggle();
});
vt(Et);
const wo = "backdrop",
  Na = "fade",
  cn = "show",
  ln = `mousedown.bs.${wo}`,
  xa = {
    className: "modal-backdrop",
    clickCallback: null,
    isAnimated: !1,
    isVisible: !0,
    rootElement: "body",
  },
  Ia = {
    className: "string",
    clickCallback: "(function|null)",
    isAnimated: "boolean",
    isVisible: "boolean",
    rootElement: "(element|string)",
  };
class No extends Te {
  constructor(t) {
    super(),
      (this._config = this._getConfig(t)),
      (this._isAppended = !1),
      (this._element = null);
  }
  static get Default() {
    return xa;
  }
  static get DefaultType() {
    return Ia;
  }
  static get NAME() {
    return wo;
  }
  show(t) {
    if (!this._config.isVisible) {
      at(t);
      return;
    }
    this._append();
    const e = this._getElement();
    this._config.isAnimated && be(e),
      e.classList.add(cn),
      this._emulateAnimation(() => {
        at(t);
      });
  }
  hide(t) {
    if (!this._config.isVisible) {
      at(t);
      return;
    }
    this._getElement().classList.remove(cn),
      this._emulateAnimation(() => {
        this.dispose(), at(t);
      });
  }
  dispose() {
    !this._isAppended ||
      (_.off(this._element, ln),
      this._element.remove(),
      (this._isAppended = !1));
  }
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      (t.className = this._config.className),
        this._config.isAnimated && t.classList.add(Na),
        (this._element = t);
    }
    return this._element;
  }
  _configAfterMerge(t) {
    return (t.rootElement = xt(t.rootElement)), t;
  }
  _append() {
    if (this._isAppended) return;
    const t = this._getElement();
    this._config.rootElement.append(t),
      _.on(t, ln, () => {
        at(this._config.clickCallback);
      }),
      (this._isAppended = !0);
  }
  _emulateAnimation(t) {
    po(t, this._getElement(), this._config.isAnimated);
  }
}
const Da = "focustrap",
  La = "bs.focustrap",
  Fe = `.${La}`,
  Pa = `focusin${Fe}`,
  Ra = `keydown.tab${Fe}`,
  $a = "Tab",
  Ma = "forward",
  un = "backward",
  ja = { autofocus: !0, trapElement: null },
  ka = { autofocus: "boolean", trapElement: "element" };
class xo extends Te {
  constructor(t) {
    super(),
      (this._config = this._getConfig(t)),
      (this._isActive = !1),
      (this._lastTabNavDirection = null);
  }
  static get Default() {
    return ja;
  }
  static get DefaultType() {
    return ka;
  }
  static get NAME() {
    return Da;
  }
  activate() {
    this._isActive ||
      (this._config.autofocus && this._config.trapElement.focus(),
      _.off(document, Fe),
      _.on(document, Pa, (t) => this._handleFocusin(t)),
      _.on(document, Ra, (t) => this._handleKeydown(t)),
      (this._isActive = !0));
  }
  deactivate() {
    !this._isActive || ((this._isActive = !1), _.off(document, Fe));
  }
  _handleFocusin(t) {
    const { trapElement: e } = this._config;
    if (t.target === document || t.target === e || e.contains(t.target)) return;
    const i = $.focusableChildren(e);
    i.length === 0
      ? e.focus()
      : this._lastTabNavDirection === un
      ? i[i.length - 1].focus()
      : i[0].focus();
  }
  _handleKeydown(t) {
    t.key === $a && (this._lastTabNavDirection = t.shiftKey ? un : Ma);
  }
}
const fn = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
  dn = ".sticky-top",
  Ie = "padding-right",
  pn = "margin-right";
class Or {
  constructor() {
    this._element = document.body;
  }
  getWidth() {
    const t = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - t);
  }
  hide() {
    const t = this.getWidth();
    this._disableOverFlow(),
      this._setElementAttributes(this._element, Ie, (e) => e + t),
      this._setElementAttributes(fn, Ie, (e) => e + t),
      this._setElementAttributes(dn, pn, (e) => e - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"),
      this._resetElementAttributes(this._element, Ie),
      this._resetElementAttributes(fn, Ie),
      this._resetElementAttributes(dn, pn);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow"),
      (this._element.style.overflow = "hidden");
  }
  _setElementAttributes(t, e, i) {
    const n = this.getWidth(),
      a = (r) => {
        if (r !== this._element && window.innerWidth > r.clientWidth + n)
          return;
        this._saveInitialAttribute(r, e);
        const s = window.getComputedStyle(r).getPropertyValue(e);
        r.style.setProperty(e, `${i(Number.parseFloat(s))}px`);
      };
    this._applyManipulationCallback(t, a);
  }
  _saveInitialAttribute(t, e) {
    const i = t.style.getPropertyValue(e);
    i && At.setDataAttribute(t, e, i);
  }
  _resetElementAttributes(t, e) {
    const i = (n) => {
      const a = At.getDataAttribute(n, e);
      if (a === null) {
        n.style.removeProperty(e);
        return;
      }
      At.removeDataAttribute(n, e), n.style.setProperty(e, a);
    };
    this._applyManipulationCallback(t, i);
  }
  _applyManipulationCallback(t, e) {
    if (Ot(t)) {
      e(t);
      return;
    }
    for (const i of $.find(t, this._element)) e(i);
  }
}
const Va = "modal",
  Fa = "bs.modal",
  ht = `.${Fa}`,
  Ba = ".data-api",
  Ha = "Escape",
  Wa = `hide${ht}`,
  Ka = `hidePrevented${ht}`,
  Io = `hidden${ht}`,
  Do = `show${ht}`,
  Ua = `shown${ht}`,
  Ga = `resize${ht}`,
  Ya = `click.dismiss${ht}`,
  za = `mousedown.dismiss${ht}`,
  Xa = `keydown.dismiss${ht}`,
  Qa = `click${ht}${Ba}`,
  hn = "modal-open",
  Ja = "fade",
  vn = "show",
  lr = "modal-static",
  Za = ".modal.show",
  qa = ".modal-dialog",
  tc = ".modal-body",
  ec = '[data-bs-toggle="modal"]',
  rc = { backdrop: !0, focus: !0, keyboard: !0 },
  nc = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
class ne extends mt {
  constructor(t, e) {
    super(t, e),
      (this._dialog = $.findOne(qa, this._element)),
      (this._backdrop = this._initializeBackDrop()),
      (this._focustrap = this._initializeFocusTrap()),
      (this._isShown = !1),
      (this._isTransitioning = !1),
      (this._scrollBar = new Or()),
      this._addEventListeners();
  }
  static get Default() {
    return rc;
  }
  static get DefaultType() {
    return nc;
  }
  static get NAME() {
    return Va;
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown ||
      this._isTransitioning ||
      _.trigger(this._element, Do, { relatedTarget: t }).defaultPrevented ||
      ((this._isShown = !0),
      (this._isTransitioning = !0),
      this._scrollBar.hide(),
      document.body.classList.add(hn),
      this._adjustDialog(),
      this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown ||
      this._isTransitioning ||
      _.trigger(this._element, Wa).defaultPrevented ||
      ((this._isShown = !1),
      (this._isTransitioning = !0),
      this._focustrap.deactivate(),
      this._element.classList.remove(vn),
      this._queueCallback(
        () => this._hideModal(),
        this._element,
        this._isAnimated()
      ));
  }
  dispose() {
    _.off(window, ht),
      _.off(this._dialog, ht),
      this._backdrop.dispose(),
      this._focustrap.deactivate(),
      super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  _initializeBackDrop() {
    return new No({
      isVisible: Boolean(this._config.backdrop),
      isAnimated: this._isAnimated(),
    });
  }
  _initializeFocusTrap() {
    return new xo({ trapElement: this._element });
  }
  _showElement(t) {
    document.body.contains(this._element) ||
      document.body.append(this._element),
      (this._element.style.display = "block"),
      this._element.removeAttribute("aria-hidden"),
      this._element.setAttribute("aria-modal", !0),
      this._element.setAttribute("role", "dialog"),
      (this._element.scrollTop = 0);
    const e = $.findOne(tc, this._dialog);
    e && (e.scrollTop = 0), be(this._element), this._element.classList.add(vn);
    const i = () => {
      this._config.focus && this._focustrap.activate(),
        (this._isTransitioning = !1),
        _.trigger(this._element, Ua, { relatedTarget: t });
    };
    this._queueCallback(i, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    _.on(this._element, Xa, (t) => {
      if (t.key === Ha) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }),
      _.on(window, Ga, () => {
        this._isShown && !this._isTransitioning && this._adjustDialog();
      }),
      _.on(this._element, za, (t) => {
        _.one(this._element, Ya, (e) => {
          if (!(this._element !== t.target || this._element !== e.target)) {
            if (this._config.backdrop === "static") {
              this._triggerBackdropTransition();
              return;
            }
            this._config.backdrop && this.hide();
          }
        });
      });
  }
  _hideModal() {
    (this._element.style.display = "none"),
      this._element.setAttribute("aria-hidden", !0),
      this._element.removeAttribute("aria-modal"),
      this._element.removeAttribute("role"),
      (this._isTransitioning = !1),
      this._backdrop.hide(() => {
        document.body.classList.remove(hn),
          this._resetAdjustments(),
          this._scrollBar.reset(),
          _.trigger(this._element, Io);
      });
  }
  _isAnimated() {
    return this._element.classList.contains(Ja);
  }
  _triggerBackdropTransition() {
    if (_.trigger(this._element, Ka).defaultPrevented) return;
    const e =
        this._element.scrollHeight > document.documentElement.clientHeight,
      i = this._element.style.overflowY;
    i === "hidden" ||
      this._element.classList.contains(lr) ||
      (e || (this._element.style.overflowY = "hidden"),
      this._element.classList.add(lr),
      this._queueCallback(() => {
        this._element.classList.remove(lr),
          this._queueCallback(() => {
            this._element.style.overflowY = i;
          }, this._dialog);
      }, this._dialog),
      this._element.focus());
  }
  _adjustDialog() {
    const t =
        this._element.scrollHeight > document.documentElement.clientHeight,
      e = this._scrollBar.getWidth(),
      i = e > 0;
    if (i && !t) {
      const n = pt() ? "paddingLeft" : "paddingRight";
      this._element.style[n] = `${e}px`;
    }
    if (!i && t) {
      const n = pt() ? "paddingRight" : "paddingLeft";
      this._element.style[n] = `${e}px`;
    }
  }
  _resetAdjustments() {
    (this._element.style.paddingLeft = ""),
      (this._element.style.paddingRight = "");
  }
  static jQueryInterface(t, e) {
    return this.each(function () {
      const i = ne.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof i[t] == "undefined")
          throw new TypeError(`No method named "${t}"`);
        i[t](e);
      }
    });
  }
}
_.on(document, Qa, ec, function (o) {
  const t = $.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && o.preventDefault(),
    _.one(t, Do, (n) => {
      n.defaultPrevented ||
        _.one(t, Io, () => {
          ie(this) && this.focus();
        });
    });
  const e = $.findOne(Za);
  e && ne.getInstance(e).hide(), ne.getOrCreateInstance(t).toggle(this);
});
Ye(ne);
vt(ne);
const oc = "offcanvas",
  sc = "bs.offcanvas",
  Ct = `.${sc}`,
  Lo = ".data-api",
  ic = `load${Ct}${Lo}`,
  ac = "Escape",
  mn = "show",
  gn = "showing",
  yn = "hiding",
  cc = "offcanvas-backdrop",
  Po = ".offcanvas.show",
  lc = `show${Ct}`,
  uc = `shown${Ct}`,
  fc = `hide${Ct}`,
  En = `hidePrevented${Ct}`,
  Ro = `hidden${Ct}`,
  dc = `resize${Ct}`,
  pc = `click${Ct}${Lo}`,
  hc = `keydown.dismiss${Ct}`,
  vc = '[data-bs-toggle="offcanvas"]',
  mc = { backdrop: !0, keyboard: !0, scroll: !1 },
  gc = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
class Dt extends mt {
  constructor(t, e) {
    super(t, e),
      (this._isShown = !1),
      (this._backdrop = this._initializeBackDrop()),
      (this._focustrap = this._initializeFocusTrap()),
      this._addEventListeners();
  }
  static get Default() {
    return mc;
  }
  static get DefaultType() {
    return gc;
  }
  static get NAME() {
    return oc;
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (
      this._isShown ||
      _.trigger(this._element, lc, { relatedTarget: t }).defaultPrevented
    )
      return;
    (this._isShown = !0),
      this._backdrop.show(),
      this._config.scroll || new Or().hide(),
      this._element.setAttribute("aria-modal", !0),
      this._element.setAttribute("role", "dialog"),
      this._element.classList.add(gn);
    const i = () => {
      (!this._config.scroll || this._config.backdrop) &&
        this._focustrap.activate(),
        this._element.classList.add(mn),
        this._element.classList.remove(gn),
        _.trigger(this._element, uc, { relatedTarget: t });
    };
    this._queueCallback(i, this._element, !0);
  }
  hide() {
    if (!this._isShown || _.trigger(this._element, fc).defaultPrevented) return;
    this._focustrap.deactivate(),
      this._element.blur(),
      (this._isShown = !1),
      this._element.classList.add(yn),
      this._backdrop.hide();
    const e = () => {
      this._element.classList.remove(mn, yn),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        this._config.scroll || new Or().reset(),
        _.trigger(this._element, Ro);
    };
    this._queueCallback(e, this._element, !0);
  }
  dispose() {
    this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  _initializeBackDrop() {
    const t = () => {
        if (this._config.backdrop === "static") {
          _.trigger(this._element, En);
          return;
        }
        this.hide();
      },
      e = Boolean(this._config.backdrop);
    return new No({
      className: cc,
      isVisible: e,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: e ? t : null,
    });
  }
  _initializeFocusTrap() {
    return new xo({ trapElement: this._element });
  }
  _addEventListeners() {
    _.on(this._element, hc, (t) => {
      if (t.key === ac) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        _.trigger(this._element, En);
      }
    });
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Dt.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
_.on(document, pc, vc, function (o) {
  const t = $.getElementFromSelector(this);
  if ((["A", "AREA"].includes(this.tagName) && o.preventDefault(), It(this)))
    return;
  _.one(t, Ro, () => {
    ie(this) && this.focus();
  });
  const e = $.findOne(Po);
  e && e !== t && Dt.getInstance(e).hide(),
    Dt.getOrCreateInstance(t).toggle(this);
});
_.on(window, ic, () => {
  for (const o of $.find(Po)) Dt.getOrCreateInstance(o).show();
});
_.on(window, dc, () => {
  for (const o of $.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(o).position !== "fixed" &&
      Dt.getOrCreateInstance(o).hide();
});
Ye(Dt);
vt(Dt);
const yc = /^aria-[\w-]*$/i,
  $o = {
    "*": ["class", "dir", "id", "lang", "role", yc],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: [],
  },
  Ec = new Set([
    "background",
    "cite",
    "href",
    "itemtype",
    "longdesc",
    "poster",
    "src",
    "xlink:href",
  ]),
  bc = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
  Tc = (o, t) => {
    const e = o.nodeName.toLowerCase();
    return t.includes(e)
      ? Ec.has(e)
        ? Boolean(bc.test(o.nodeValue))
        : !0
      : t.filter((i) => i instanceof RegExp).some((i) => i.test(e));
  };
function Sc(o, t, e) {
  if (!o.length) return o;
  if (e && typeof e == "function") return e(o);
  const n = new window.DOMParser().parseFromString(o, "text/html"),
    a = [].concat(...n.body.querySelectorAll("*"));
  for (const r of a) {
    const s = r.nodeName.toLowerCase();
    if (!Object.keys(t).includes(s)) {
      r.remove();
      continue;
    }
    const c = [].concat(...r.attributes),
      l = [].concat(t["*"] || [], t[s] || []);
    for (const u of c) Tc(u, l) || r.removeAttribute(u.nodeName);
  }
  return n.body.innerHTML;
}
const Oc = "TemplateFactory",
  Ac = {
    allowList: $o,
    content: {},
    extraClass: "",
    html: !1,
    sanitize: !0,
    sanitizeFn: null,
    template: "<div></div>",
  },
  _c = {
    allowList: "object",
    content: "object",
    extraClass: "(string|function)",
    html: "boolean",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    template: "string",
  },
  Cc = {
    entry: "(string|element|function|null)",
    selector: "(string|element)",
  };
class wc extends Te {
  constructor(t) {
    super(), (this._config = this._getConfig(t));
  }
  static get Default() {
    return Ac;
  }
  static get DefaultType() {
    return _c;
  }
  static get NAME() {
    return Oc;
  }
  getContent() {
    return Object.values(this._config.content)
      .map((t) => this._resolvePossibleFunction(t))
      .filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(t) {
    return (
      this._checkContent(t),
      (this._config.content = { ...this._config.content, ...t }),
      this
    );
  }
  toHtml() {
    const t = document.createElement("div");
    t.innerHTML = this._maybeSanitize(this._config.template);
    for (const [n, a] of Object.entries(this._config.content))
      this._setContent(t, a, n);
    const e = t.children[0],
      i = this._resolvePossibleFunction(this._config.extraClass);
    return i && e.classList.add(...i.split(" ")), e;
  }
  _typeCheckConfig(t) {
    super._typeCheckConfig(t), this._checkContent(t.content);
  }
  _checkContent(t) {
    for (const [e, i] of Object.entries(t))
      super._typeCheckConfig({ selector: e, entry: i }, Cc);
  }
  _setContent(t, e, i) {
    const n = $.findOne(i, t);
    if (!!n) {
      if (((e = this._resolvePossibleFunction(e)), !e)) {
        n.remove();
        return;
      }
      if (Ot(e)) {
        this._putElementInTemplate(xt(e), n);
        return;
      }
      if (this._config.html) {
        n.innerHTML = this._maybeSanitize(e);
        return;
      }
      n.textContent = e;
    }
  }
  _maybeSanitize(t) {
    return this._config.sanitize
      ? Sc(t, this._config.allowList, this._config.sanitizeFn)
      : t;
  }
  _resolvePossibleFunction(t) {
    return at(t, [this]);
  }
  _putElementInTemplate(t, e) {
    if (this._config.html) {
      (e.innerHTML = ""), e.append(t);
      return;
    }
    e.textContent = t.textContent;
  }
}
const Nc = "tooltip",
  xc = new Set(["sanitize", "allowList", "sanitizeFn"]),
  ur = "fade",
  Ic = "modal",
  De = "show",
  Dc = ".tooltip-inner",
  bn = `.${Ic}`,
  Tn = "hide.bs.modal",
  he = "hover",
  fr = "focus",
  Lc = "click",
  Pc = "manual",
  Rc = "hide",
  $c = "hidden",
  Mc = "show",
  jc = "shown",
  kc = "inserted",
  Vc = "click",
  Fc = "focusin",
  Bc = "focusout",
  Hc = "mouseenter",
  Wc = "mouseleave",
  Kc = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: pt() ? "left" : "right",
    BOTTOM: "bottom",
    LEFT: pt() ? "right" : "left",
  },
  Uc = {
    allowList: $o,
    animation: !0,
    boundary: "clippingParents",
    container: !1,
    customClass: "",
    delay: 0,
    fallbackPlacements: ["top", "right", "bottom", "left"],
    html: !1,
    offset: [0, 6],
    placement: "top",
    popperConfig: null,
    sanitize: !0,
    sanitizeFn: null,
    selector: !1,
    template:
      '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    title: "",
    trigger: "hover focus",
  },
  Gc = {
    allowList: "object",
    animation: "boolean",
    boundary: "(string|element)",
    container: "(string|element|boolean)",
    customClass: "(string|function)",
    delay: "(number|object)",
    fallbackPlacements: "array",
    html: "boolean",
    offset: "(array|string|function)",
    placement: "(string|function)",
    popperConfig: "(null|object|function)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    selector: "(string|boolean)",
    template: "string",
    title: "(string|element|function)",
    trigger: "string",
  };
class ce extends mt {
  constructor(t, e) {
    if (typeof ao == "undefined")
      throw new TypeError(
        "Bootstrap's tooltips require Popper (https://popper.js.org)"
      );
    super(t, e),
      (this._isEnabled = !0),
      (this._timeout = 0),
      (this._isHovered = null),
      (this._activeTrigger = {}),
      (this._popper = null),
      (this._templateFactory = null),
      (this._newContent = null),
      (this.tip = null),
      this._setListeners(),
      this._config.selector || this._fixTitle();
  }
  static get Default() {
    return Uc;
  }
  static get DefaultType() {
    return Gc;
  }
  static get NAME() {
    return Nc;
  }
  enable() {
    this._isEnabled = !0;
  }
  disable() {
    this._isEnabled = !1;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (!!this._isEnabled) {
      if (
        ((this._activeTrigger.click = !this._activeTrigger.click),
        this._isShown())
      ) {
        this._leave();
        return;
      }
      this._enter();
    }
  }
  dispose() {
    clearTimeout(this._timeout),
      _.off(this._element.closest(bn), Tn, this._hideModalHandler),
      this._element.getAttribute("data-bs-original-title") &&
        this._element.setAttribute(
          "title",
          this._element.getAttribute("data-bs-original-title")
        ),
      this._disposePopper(),
      super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled)) return;
    const t = _.trigger(this._element, this.constructor.eventName(Mc)),
      i = (
        uo(this._element) || this._element.ownerDocument.documentElement
      ).contains(this._element);
    if (t.defaultPrevented || !i) return;
    this._disposePopper();
    const n = this._getTipElement();
    this._element.setAttribute("aria-describedby", n.getAttribute("id"));
    const { container: a } = this._config;
    if (
      (this._element.ownerDocument.documentElement.contains(this.tip) ||
        (a.append(n), _.trigger(this._element, this.constructor.eventName(kc))),
      (this._popper = this._createPopper(n)),
      n.classList.add(De),
      "ontouchstart" in document.documentElement)
    )
      for (const s of [].concat(...document.body.children))
        _.on(s, "mouseover", ke);
    const r = () => {
      _.trigger(this._element, this.constructor.eventName(jc)),
        this._isHovered === !1 && this._leave(),
        (this._isHovered = !1);
    };
    this._queueCallback(r, this.tip, this._isAnimated());
  }
  hide() {
    if (
      !this._isShown() ||
      _.trigger(this._element, this.constructor.eventName(Rc)).defaultPrevented
    )
      return;
    if (
      (this._getTipElement().classList.remove(De),
      "ontouchstart" in document.documentElement)
    )
      for (const n of [].concat(...document.body.children))
        _.off(n, "mouseover", ke);
    (this._activeTrigger[Lc] = !1),
      (this._activeTrigger[fr] = !1),
      (this._activeTrigger[he] = !1),
      (this._isHovered = null);
    const i = () => {
      this._isWithActiveTrigger() ||
        (this._isHovered || this._disposePopper(),
        this._element.removeAttribute("aria-describedby"),
        _.trigger(this._element, this.constructor.eventName($c)));
    };
    this._queueCallback(i, this.tip, this._isAnimated());
  }
  update() {
    this._popper && this._popper.update();
  }
  _isWithContent() {
    return Boolean(this._getTitle());
  }
  _getTipElement() {
    return (
      this.tip ||
        (this.tip = this._createTipElement(
          this._newContent || this._getContentForTemplate()
        )),
      this.tip
    );
  }
  _createTipElement(t) {
    const e = this._getTemplateFactory(t).toHtml();
    if (!e) return null;
    e.classList.remove(ur, De),
      e.classList.add(`bs-${this.constructor.NAME}-auto`);
    const i = Ls(this.constructor.NAME).toString();
    return (
      e.setAttribute("id", i), this._isAnimated() && e.classList.add(ur), e
    );
  }
  setContent(t) {
    (this._newContent = t),
      this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return (
      this._templateFactory
        ? this._templateFactory.changeContent(t)
        : (this._templateFactory = new wc({
            ...this._config,
            content: t,
            extraClass: this._resolvePossibleFunction(this._config.customClass),
          })),
      this._templateFactory
    );
  }
  _getContentForTemplate() {
    return { [Dc]: this._getTitle() };
  }
  _getTitle() {
    return (
      this._resolvePossibleFunction(this._config.title) ||
      this._element.getAttribute("data-bs-original-title")
    );
  }
  _initializeOnDelegatedTarget(t) {
    return this.constructor.getOrCreateInstance(
      t.delegateTarget,
      this._getDelegateConfig()
    );
  }
  _isAnimated() {
    return (
      this._config.animation || (this.tip && this.tip.classList.contains(ur))
    );
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(De);
  }
  _createPopper(t) {
    const e = at(this._config.placement, [this, t, this._element]),
      i = Kc[e.toUpperCase()];
    return kr(this._element, t, this._getPopperConfig(i));
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == "string"
      ? t.split(",").map((e) => Number.parseInt(e, 10))
      : typeof t == "function"
      ? (e) => t(e, this._element)
      : t;
  }
  _resolvePossibleFunction(t) {
    return at(t, [this._element]);
  }
  _getPopperConfig(t) {
    const e = {
      placement: t,
      modifiers: [
        {
          name: "flip",
          options: { fallbackPlacements: this._config.fallbackPlacements },
        },
        { name: "offset", options: { offset: this._getOffset() } },
        {
          name: "preventOverflow",
          options: { boundary: this._config.boundary },
        },
        {
          name: "arrow",
          options: { element: `.${this.constructor.NAME}-arrow` },
        },
        {
          name: "preSetPlacement",
          enabled: !0,
          phase: "beforeMain",
          fn: (i) => {
            this._getTipElement().setAttribute(
              "data-popper-placement",
              i.state.placement
            );
          },
        },
      ],
    };
    return { ...e, ...at(this._config.popperConfig, [e]) };
  }
  _setListeners() {
    const t = this._config.trigger.split(" ");
    for (const e of t)
      if (e === "click")
        _.on(
          this._element,
          this.constructor.eventName(Vc),
          this._config.selector,
          (i) => {
            this._initializeOnDelegatedTarget(i).toggle();
          }
        );
      else if (e !== Pc) {
        const i =
            e === he
              ? this.constructor.eventName(Hc)
              : this.constructor.eventName(Fc),
          n =
            e === he
              ? this.constructor.eventName(Wc)
              : this.constructor.eventName(Bc);
        _.on(this._element, i, this._config.selector, (a) => {
          const r = this._initializeOnDelegatedTarget(a);
          (r._activeTrigger[a.type === "focusin" ? fr : he] = !0), r._enter();
        }),
          _.on(this._element, n, this._config.selector, (a) => {
            const r = this._initializeOnDelegatedTarget(a);
            (r._activeTrigger[a.type === "focusout" ? fr : he] =
              r._element.contains(a.relatedTarget)),
              r._leave();
          });
      }
    (this._hideModalHandler = () => {
      this._element && this.hide();
    }),
      _.on(this._element.closest(bn), Tn, this._hideModalHandler);
  }
  _fixTitle() {
    const t = this._element.getAttribute("title");
    !t ||
      (!this._element.getAttribute("aria-label") &&
        !this._element.textContent.trim() &&
        this._element.setAttribute("aria-label", t),
      this._element.setAttribute("data-bs-original-title", t),
      this._element.removeAttribute("title"));
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = !0;
      return;
    }
    (this._isHovered = !0),
      this._setTimeout(() => {
        this._isHovered && this.show();
      }, this._config.delay.show);
  }
  _leave() {
    this._isWithActiveTrigger() ||
      ((this._isHovered = !1),
      this._setTimeout(() => {
        this._isHovered || this.hide();
      }, this._config.delay.hide));
  }
  _setTimeout(t, e) {
    clearTimeout(this._timeout), (this._timeout = setTimeout(t, e));
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(!0);
  }
  _getConfig(t) {
    const e = At.getDataAttributes(this._element);
    for (const i of Object.keys(e)) xc.has(i) && delete e[i];
    return (
      (t = { ...e, ...(typeof t == "object" && t ? t : {}) }),
      (t = this._mergeConfigObj(t)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  _configAfterMerge(t) {
    return (
      (t.container = t.container === !1 ? document.body : xt(t.container)),
      typeof t.delay == "number" &&
        (t.delay = { show: t.delay, hide: t.delay }),
      typeof t.title == "number" && (t.title = t.title.toString()),
      typeof t.content == "number" && (t.content = t.content.toString()),
      t
    );
  }
  _getDelegateConfig() {
    const t = {};
    for (const [e, i] of Object.entries(this._config))
      this.constructor.Default[e] !== i && (t[e] = i);
    return (t.selector = !1), (t.trigger = "manual"), t;
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), (this._popper = null)),
      this.tip && (this.tip.remove(), (this.tip = null));
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = ce.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] == "undefined")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
vt(ce);
const Yc = "popover",
  zc = ".popover-header",
  Xc = ".popover-body",
  Qc = {
    ...ce.Default,
    content: "",
    offset: [0, 8],
    placement: "right",
    template:
      '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    trigger: "click",
  },
  Jc = { ...ce.DefaultType, content: "(null|string|element|function)" };
class Hr extends ce {
  static get Default() {
    return Qc;
  }
  static get DefaultType() {
    return Jc;
  }
  static get NAME() {
    return Yc;
  }
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  _getContentForTemplate() {
    return { [zc]: this._getTitle(), [Xc]: this._getContent() };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Hr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] == "undefined")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
vt(Hr);
const Zc = "scrollspy",
  qc = "bs.scrollspy",
  Wr = `.${qc}`,
  tl = ".data-api",
  el = `activate${Wr}`,
  Sn = `click${Wr}`,
  rl = `load${Wr}${tl}`,
  nl = "dropdown-item",
  Yt = "active",
  ol = '[data-bs-spy="scroll"]',
  dr = "[href]",
  sl = ".nav, .list-group",
  On = ".nav-link",
  il = ".nav-item",
  al = ".list-group-item",
  cl = `${On}, ${il} > ${On}, ${al}`,
  ll = ".dropdown",
  ul = ".dropdown-toggle",
  fl = {
    offset: null,
    rootMargin: "0px 0px -25%",
    smoothScroll: !1,
    target: null,
    threshold: [0.1, 0.5, 1],
  },
  dl = {
    offset: "(number|null)",
    rootMargin: "string",
    smoothScroll: "boolean",
    target: "element",
    threshold: "array",
  };
class Qe extends mt {
  constructor(t, e) {
    super(t, e),
      (this._targetLinks = new Map()),
      (this._observableSections = new Map()),
      (this._rootElement =
        getComputedStyle(this._element).overflowY === "visible"
          ? null
          : this._element),
      (this._activeTarget = null),
      (this._observer = null),
      (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
      this.refresh();
  }
  static get Default() {
    return fl;
  }
  static get DefaultType() {
    return dl;
  }
  static get NAME() {
    return Zc;
  }
  refresh() {
    this._initializeTargetsAndObservables(),
      this._maybeEnableSmoothScroll(),
      this._observer
        ? this._observer.disconnect()
        : (this._observer = this._getNewObserver());
    for (const t of this._observableSections.values())
      this._observer.observe(t);
  }
  dispose() {
    this._observer.disconnect(), super.dispose();
  }
  _configAfterMerge(t) {
    return (
      (t.target = xt(t.target) || document.body),
      (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin),
      typeof t.threshold == "string" &&
        (t.threshold = t.threshold.split(",").map((e) => Number.parseFloat(e))),
      t
    );
  }
  _maybeEnableSmoothScroll() {
    !this._config.smoothScroll ||
      (_.off(this._config.target, Sn),
      _.on(this._config.target, Sn, dr, (t) => {
        const e = this._observableSections.get(t.target.hash);
        if (e) {
          t.preventDefault();
          const i = this._rootElement || window,
            n = e.offsetTop - this._element.offsetTop;
          if (i.scrollTo) {
            i.scrollTo({ top: n, behavior: "smooth" });
            return;
          }
          i.scrollTop = n;
        }
      }));
  }
  _getNewObserver() {
    const t = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin,
    };
    return new IntersectionObserver((e) => this._observerCallback(e), t);
  }
  _observerCallback(t) {
    const e = (r) => this._targetLinks.get(`#${r.target.id}`),
      i = (r) => {
        (this._previousScrollData.visibleEntryTop = r.target.offsetTop),
          this._process(e(r));
      },
      n = (this._rootElement || document.documentElement).scrollTop,
      a = n >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = n;
    for (const r of t) {
      if (!r.isIntersecting) {
        (this._activeTarget = null), this._clearActiveClass(e(r));
        continue;
      }
      const s = r.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (a && s) {
        if ((i(r), !n)) return;
        continue;
      }
      !a && !s && i(r);
    }
  }
  _initializeTargetsAndObservables() {
    (this._targetLinks = new Map()), (this._observableSections = new Map());
    const t = $.find(dr, this._config.target);
    for (const e of t) {
      if (!e.hash || It(e)) continue;
      const i = $.findOne(decodeURI(e.hash), this._element);
      ie(i) &&
        (this._targetLinks.set(decodeURI(e.hash), e),
        this._observableSections.set(e.hash, i));
    }
  }
  _process(t) {
    this._activeTarget !== t &&
      (this._clearActiveClass(this._config.target),
      (this._activeTarget = t),
      t.classList.add(Yt),
      this._activateParents(t),
      _.trigger(this._element, el, { relatedTarget: t }));
  }
  _activateParents(t) {
    if (t.classList.contains(nl)) {
      $.findOne(ul, t.closest(ll)).classList.add(Yt);
      return;
    }
    for (const e of $.parents(t, sl))
      for (const i of $.prev(e, cl)) i.classList.add(Yt);
  }
  _clearActiveClass(t) {
    t.classList.remove(Yt);
    const e = $.find(`${dr}.${Yt}`, t);
    for (const i of e) i.classList.remove(Yt);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Qe.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
_.on(window, rl, () => {
  for (const o of $.find(ol)) Qe.getOrCreateInstance(o);
});
vt(Qe);
const pl = "tab",
  hl = "bs.tab",
  Ht = `.${hl}`,
  vl = `hide${Ht}`,
  ml = `hidden${Ht}`,
  gl = `show${Ht}`,
  yl = `shown${Ht}`,
  El = `click${Ht}`,
  bl = `keydown${Ht}`,
  Tl = `load${Ht}`,
  Sl = "ArrowLeft",
  An = "ArrowRight",
  Ol = "ArrowUp",
  _n = "ArrowDown",
  jt = "active",
  Cn = "fade",
  pr = "show",
  Al = "dropdown",
  _l = ".dropdown-toggle",
  Cl = ".dropdown-menu",
  hr = ":not(.dropdown-toggle)",
  wl = '.list-group, .nav, [role="tablist"]',
  Nl = ".nav-item, .list-group-item",
  xl = `.nav-link${hr}, .list-group-item${hr}, [role="tab"]${hr}`,
  Mo =
    '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
  vr = `${xl}, ${Mo}`,
  Il = `.${jt}[data-bs-toggle="tab"], .${jt}[data-bs-toggle="pill"], .${jt}[data-bs-toggle="list"]`;
class oe extends mt {
  constructor(t) {
    super(t),
      (this._parent = this._element.closest(wl)),
      this._parent &&
        (this._setInitialAttributes(this._parent, this._getChildren()),
        _.on(this._element, bl, (e) => this._keydown(e)));
  }
  static get NAME() {
    return pl;
  }
  show() {
    const t = this._element;
    if (this._elemIsActive(t)) return;
    const e = this._getActiveElem(),
      i = e ? _.trigger(e, vl, { relatedTarget: t }) : null;
    _.trigger(t, gl, { relatedTarget: e }).defaultPrevented ||
      (i && i.defaultPrevented) ||
      (this._deactivate(e, t), this._activate(t, e));
  }
  _activate(t, e) {
    if (!t) return;
    t.classList.add(jt), this._activate($.getElementFromSelector(t));
    const i = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(pr);
        return;
      }
      t.removeAttribute("tabindex"),
        t.setAttribute("aria-selected", !0),
        this._toggleDropDown(t, !0),
        _.trigger(t, yl, { relatedTarget: e });
    };
    this._queueCallback(i, t, t.classList.contains(Cn));
  }
  _deactivate(t, e) {
    if (!t) return;
    t.classList.remove(jt),
      t.blur(),
      this._deactivate($.getElementFromSelector(t));
    const i = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(pr);
        return;
      }
      t.setAttribute("aria-selected", !1),
        t.setAttribute("tabindex", "-1"),
        this._toggleDropDown(t, !1),
        _.trigger(t, ml, { relatedTarget: e });
    };
    this._queueCallback(i, t, t.classList.contains(Cn));
  }
  _keydown(t) {
    if (![Sl, An, Ol, _n].includes(t.key)) return;
    t.stopPropagation(), t.preventDefault();
    const e = [An, _n].includes(t.key),
      i = Vr(
        this._getChildren().filter((n) => !It(n)),
        t.target,
        e,
        !0
      );
    i && (i.focus({ preventScroll: !0 }), oe.getOrCreateInstance(i).show());
  }
  _getChildren() {
    return $.find(vr, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((t) => this._elemIsActive(t)) || null;
  }
  _setInitialAttributes(t, e) {
    this._setAttributeIfNotExists(t, "role", "tablist");
    for (const i of e) this._setInitialAttributesOnChild(i);
  }
  _setInitialAttributesOnChild(t) {
    t = this._getInnerElement(t);
    const e = this._elemIsActive(t),
      i = this._getOuterElement(t);
    t.setAttribute("aria-selected", e),
      i !== t && this._setAttributeIfNotExists(i, "role", "presentation"),
      e || t.setAttribute("tabindex", "-1"),
      this._setAttributeIfNotExists(t, "role", "tab"),
      this._setInitialAttributesOnTargetPanel(t);
  }
  _setInitialAttributesOnTargetPanel(t) {
    const e = $.getElementFromSelector(t);
    !e ||
      (this._setAttributeIfNotExists(e, "role", "tabpanel"),
      t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`));
  }
  _toggleDropDown(t, e) {
    const i = this._getOuterElement(t);
    if (!i.classList.contains(Al)) return;
    const n = (a, r) => {
      const s = $.findOne(a, i);
      s && s.classList.toggle(r, e);
    };
    n(_l, jt), n(Cl, pr), i.setAttribute("aria-expanded", e);
  }
  _setAttributeIfNotExists(t, e, i) {
    t.hasAttribute(e) || t.setAttribute(e, i);
  }
  _elemIsActive(t) {
    return t.classList.contains(jt);
  }
  _getInnerElement(t) {
    return t.matches(vr) ? t : $.findOne(vr, t);
  }
  _getOuterElement(t) {
    return t.closest(Nl) || t;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = oe.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
_.on(document, El, Mo, function (o) {
  ["A", "AREA"].includes(this.tagName) && o.preventDefault(),
    !It(this) && oe.getOrCreateInstance(this).show();
});
_.on(window, Tl, () => {
  for (const o of $.find(Il)) oe.getOrCreateInstance(o);
});
vt(oe);
const Dl = "toast",
  Ll = "bs.toast",
  Rt = `.${Ll}`,
  Pl = `mouseover${Rt}`,
  Rl = `mouseout${Rt}`,
  $l = `focusin${Rt}`,
  Ml = `focusout${Rt}`,
  jl = `hide${Rt}`,
  kl = `hidden${Rt}`,
  Vl = `show${Rt}`,
  Fl = `shown${Rt}`,
  Bl = "fade",
  wn = "hide",
  Le = "show",
  Pe = "showing",
  Hl = { animation: "boolean", autohide: "boolean", delay: "number" },
  Wl = { animation: !0, autohide: !0, delay: 5e3 };
class Je extends mt {
  constructor(t, e) {
    super(t, e),
      (this._timeout = null),
      (this._hasMouseInteraction = !1),
      (this._hasKeyboardInteraction = !1),
      this._setListeners();
  }
  static get Default() {
    return Wl;
  }
  static get DefaultType() {
    return Hl;
  }
  static get NAME() {
    return Dl;
  }
  show() {
    if (_.trigger(this._element, Vl).defaultPrevented) return;
    this._clearTimeout(),
      this._config.animation && this._element.classList.add(Bl);
    const e = () => {
      this._element.classList.remove(Pe),
        _.trigger(this._element, Fl),
        this._maybeScheduleHide();
    };
    this._element.classList.remove(wn),
      be(this._element),
      this._element.classList.add(Le, Pe),
      this._queueCallback(e, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || _.trigger(this._element, jl).defaultPrevented)
      return;
    const e = () => {
      this._element.classList.add(wn),
        this._element.classList.remove(Pe, Le),
        _.trigger(this._element, kl);
    };
    this._element.classList.add(Pe),
      this._queueCallback(e, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(),
      this.isShown() && this._element.classList.remove(Le),
      super.dispose();
  }
  isShown() {
    return this._element.classList.contains(Le);
  }
  _maybeScheduleHide() {
    !this._config.autohide ||
      this._hasMouseInteraction ||
      this._hasKeyboardInteraction ||
      (this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay));
  }
  _onInteraction(t, e) {
    switch (t.type) {
      case "mouseover":
      case "mouseout": {
        this._hasMouseInteraction = e;
        break;
      }
      case "focusin":
      case "focusout": {
        this._hasKeyboardInteraction = e;
        break;
      }
    }
    if (e) {
      this._clearTimeout();
      return;
    }
    const i = t.relatedTarget;
    this._element === i ||
      this._element.contains(i) ||
      this._maybeScheduleHide();
  }
  _setListeners() {
    _.on(this._element, Pl, (t) => this._onInteraction(t, !0)),
      _.on(this._element, Rl, (t) => this._onInteraction(t, !1)),
      _.on(this._element, $l, (t) => this._onInteraction(t, !0)),
      _.on(this._element, Ml, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), (this._timeout = null);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Je.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] == "undefined")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
Ye(Je);
vt(Je);
document.querySelectorAll(".nav-link").forEach((o) =>
  o.addEventListener("click", () => {
    const t = document.querySelector(".navbar-toggler");
    t.classList.add("collapsed"),
      t.setAttribute("aria-expanded", "false"),
      document.querySelector("#toggleMobileMenu").classList.remove("show");
  })
);
let Nn = window.pageYOffset;
const xn = document.querySelector(".sticky-top");
window.onscroll = function () {
  let o = window.pageYOffset;
  Nn > o ? xn.classList.add("sticky-top") : xn.classList.remove("sticky-top"),
    (Nn = o);
};
const Kl = document.querySelector("#theme-btn"),
  In = document.querySelector(".bi-moon-fill"),
  Dn = document.querySelector(".bi-brightness-high-fill"),
  Ln = {
    light: {
      primary: "#ffffff",
      secondary: "#444f5a",
      accent: "#05aeaa",
      primaryRGB: "255, 255, 255",
      secondaryRGB: "68, 79, 90",
    },
    dark: {
      primary: "#101010",
      secondary: "#f0f0f0",
      accent: "#e07900",
      primaryRGB: "34, 34, 43",
      secondaryRGB: "162,161,166",
    },
  };
let mr = !0;
Kl.addEventListener("click", Ul);
function Pn(o) {
  document.documentElement.style.setProperty("--bs-primary", o.primary),
    document.documentElement.style.setProperty("--bs-secondary", o.secondary),
    document.documentElement.style.setProperty("--bs-accent", o.accent),
    document.documentElement.style.setProperty(
      "--bs-primary-rgb",
      o.primaryRGB
    ),
    document.documentElement.style.setProperty(
      "--bs-secondary-rgb",
      o.secondaryRGB
    );
}
function Ul() {
  mr
    ? (Pn(Ln.dark),
      (In.style.display = "none"),
      (Dn.style.display = "block"),
      (mr = !1))
    : (Pn(Ln.light),
      (In.style.display = "block"),
      (Dn.style.display = "none"),
      (mr = !0));
}
function Ar() {
  return (
    (Ar = Object.assign
      ? Object.assign.bind()
      : function (o) {
          for (var t = 1; t < arguments.length; t++) {
            var e = arguments[t];
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (o[i] = e[i]);
          }
          return o;
        }),
    Ar.apply(this, arguments)
  );
}
var Gl = {
    strings: [
      "These are the default values...",
      "You know what you should do?",
      "Use your own!",
      "Have a great day!",
    ],
    stringsElement: null,
    typeSpeed: 0,
    startDelay: 0,
    backSpeed: 0,
    smartBackspace: !0,
    shuffle: !1,
    backDelay: 700,
    fadeOut: !1,
    fadeOutClass: "typed-fade-out",
    fadeOutDelay: 500,
    loop: !1,
    loopCount: 1 / 0,
    showCursor: !0,
    cursorChar: "|",
    autoInsertCss: !0,
    attr: null,
    bindInputFocusEvents: !1,
    contentType: "html",
    onBegin: function (o) {},
    onComplete: function (o) {},
    preStringTyped: function (o, t) {},
    onStringTyped: function (o, t) {},
    onLastStringBackspaced: function (o) {},
    onTypingPaused: function (o, t) {},
    onTypingResumed: function (o, t) {},
    onReset: function (o) {},
    onStop: function (o, t) {},
    onStart: function (o, t) {},
    onDestroy: function (o) {},
  },
  Yl = new ((function () {
    function o() {}
    var t = o.prototype;
    return (
      (t.load = function (e, i, n) {
        if (
          ((e.el = typeof n == "string" ? document.querySelector(n) : n),
          (e.options = Ar({}, Gl, i)),
          (e.isInput = e.el.tagName.toLowerCase() === "input"),
          (e.attr = e.options.attr),
          (e.bindInputFocusEvents = e.options.bindInputFocusEvents),
          (e.showCursor = !e.isInput && e.options.showCursor),
          (e.cursorChar = e.options.cursorChar),
          (e.cursorBlinking = !0),
          (e.elContent = e.attr ? e.el.getAttribute(e.attr) : e.el.textContent),
          (e.contentType = e.options.contentType),
          (e.typeSpeed = e.options.typeSpeed),
          (e.startDelay = e.options.startDelay),
          (e.backSpeed = e.options.backSpeed),
          (e.smartBackspace = e.options.smartBackspace),
          (e.backDelay = e.options.backDelay),
          (e.fadeOut = e.options.fadeOut),
          (e.fadeOutClass = e.options.fadeOutClass),
          (e.fadeOutDelay = e.options.fadeOutDelay),
          (e.isPaused = !1),
          (e.strings = e.options.strings.map(function (l) {
            return l.trim();
          })),
          (e.stringsElement =
            typeof e.options.stringsElement == "string"
              ? document.querySelector(e.options.stringsElement)
              : e.options.stringsElement),
          e.stringsElement)
        ) {
          (e.strings = []),
            (e.stringsElement.style.cssText =
              "clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;");
          var a = Array.prototype.slice.apply(e.stringsElement.children),
            r = a.length;
          if (r)
            for (var s = 0; s < r; s += 1)
              e.strings.push(a[s].innerHTML.trim());
        }
        for (var c in ((e.strPos = 0),
        (e.currentElContent = this.getCurrentElContent(e)),
        e.currentElContent &&
          e.currentElContent.length > 0 &&
          ((e.strPos = e.currentElContent.length - 1),
          e.strings.unshift(e.currentElContent)),
        (e.sequence = []),
        e.strings))
          e.sequence[c] = c;
        (e.arrayPos = 0),
          (e.stopNum = 0),
          (e.loop = e.options.loop),
          (e.loopCount = e.options.loopCount),
          (e.curLoop = 0),
          (e.shuffle = e.options.shuffle),
          (e.pause = {
            status: !1,
            typewrite: !0,
            curString: "",
            curStrPos: 0,
          }),
          (e.typingComplete = !1),
          (e.autoInsertCss = e.options.autoInsertCss),
          e.autoInsertCss &&
            (this.appendCursorAnimationCss(e),
            this.appendFadeOutAnimationCss(e));
      }),
      (t.getCurrentElContent = function (e) {
        return e.attr
          ? e.el.getAttribute(e.attr)
          : e.isInput
          ? e.el.value
          : e.contentType === "html"
          ? e.el.innerHTML
          : e.el.textContent;
      }),
      (t.appendCursorAnimationCss = function (e) {
        var i = "data-typed-js-cursor-css";
        if (e.showCursor && !document.querySelector("[" + i + "]")) {
          var n = document.createElement("style");
          n.setAttribute(i, "true"),
            (n.innerHTML = `
        .typed-cursor{
          opacity: 1;
        }
        .typed-cursor.typed-cursor--blink{
          animation: typedjsBlink 0.7s infinite;
          -webkit-animation: typedjsBlink 0.7s infinite;
                  animation: typedjsBlink 0.7s infinite;
        }
        @keyframes typedjsBlink{
          50% { opacity: 0.0; }
        }
        @-webkit-keyframes typedjsBlink{
          0% { opacity: 1; }
          50% { opacity: 0.0; }
          100% { opacity: 1; }
        }
      `),
            document.body.appendChild(n);
        }
      }),
      (t.appendFadeOutAnimationCss = function (e) {
        var i = "data-typed-fadeout-js-css";
        if (e.fadeOut && !document.querySelector("[" + i + "]")) {
          var n = document.createElement("style");
          n.setAttribute(i, "true"),
            (n.innerHTML = `
        .typed-fade-out{
          opacity: 0;
          transition: opacity .25s;
        }
        .typed-cursor.typed-cursor--blink.typed-fade-out{
          -webkit-animation: 0;
          animation: 0;
        }
      `),
            document.body.appendChild(n);
        }
      }),
      o
    );
  })())(),
  Rn = new ((function () {
    function o() {}
    var t = o.prototype;
    return (
      (t.typeHtmlChars = function (e, i, n) {
        if (n.contentType !== "html") return i;
        var a = e.substring(i).charAt(0);
        if (a === "<" || a === "&") {
          var r;
          for (
            r = a === "<" ? ">" : ";";
            e.substring(i + 1).charAt(0) !== r && !(1 + ++i > e.length);

          );
          i++;
        }
        return i;
      }),
      (t.backSpaceHtmlChars = function (e, i, n) {
        if (n.contentType !== "html") return i;
        var a = e.substring(i).charAt(0);
        if (a === ">" || a === ";") {
          var r;
          for (
            r = a === ">" ? "<" : "&";
            e.substring(i - 1).charAt(0) !== r && !(--i < 0);

          );
          i--;
        }
        return i;
      }),
      o
    );
  })())(),
  zl = (function () {
    function o(e, i) {
      Yl.load(this, i, e), this.begin();
    }
    var t = o.prototype;
    return (
      (t.toggle = function () {
        this.pause.status ? this.start() : this.stop();
      }),
      (t.stop = function () {
        this.typingComplete ||
          this.pause.status ||
          (this.toggleBlinking(!0),
          (this.pause.status = !0),
          this.options.onStop(this.arrayPos, this));
      }),
      (t.start = function () {
        this.typingComplete ||
          (this.pause.status &&
            ((this.pause.status = !1),
            this.pause.typewrite
              ? this.typewrite(this.pause.curString, this.pause.curStrPos)
              : this.backspace(this.pause.curString, this.pause.curStrPos),
            this.options.onStart(this.arrayPos, this)));
      }),
      (t.destroy = function () {
        this.reset(!1), this.options.onDestroy(this);
      }),
      (t.reset = function (e) {
        e === void 0 && (e = !0),
          clearInterval(this.timeout),
          this.replaceText(""),
          this.cursor &&
            this.cursor.parentNode &&
            (this.cursor.parentNode.removeChild(this.cursor),
            (this.cursor = null)),
          (this.strPos = 0),
          (this.arrayPos = 0),
          (this.curLoop = 0),
          e && (this.insertCursor(), this.options.onReset(this), this.begin());
      }),
      (t.begin = function () {
        var e = this;
        this.options.onBegin(this),
          (this.typingComplete = !1),
          this.shuffleStringsIfNeeded(this),
          this.insertCursor(),
          this.bindInputFocusEvents && this.bindFocusEvents(),
          (this.timeout = setTimeout(function () {
            e.strPos === 0
              ? e.typewrite(e.strings[e.sequence[e.arrayPos]], e.strPos)
              : e.backspace(e.strings[e.sequence[e.arrayPos]], e.strPos);
          }, this.startDelay));
      }),
      (t.typewrite = function (e, i) {
        var n = this;
        this.fadeOut &&
          this.el.classList.contains(this.fadeOutClass) &&
          (this.el.classList.remove(this.fadeOutClass),
          this.cursor && this.cursor.classList.remove(this.fadeOutClass));
        var a = this.humanizer(this.typeSpeed),
          r = 1;
        this.pause.status !== !0
          ? (this.timeout = setTimeout(function () {
              i = Rn.typeHtmlChars(e, i, n);
              var s = 0,
                c = e.substring(i);
              if (c.charAt(0) === "^" && /^\^\d+/.test(c)) {
                var l = 1;
                (l += (c = /\d+/.exec(c)[0]).length),
                  (s = parseInt(c)),
                  (n.temporaryPause = !0),
                  n.options.onTypingPaused(n.arrayPos, n),
                  (e = e.substring(0, i) + e.substring(i + l)),
                  n.toggleBlinking(!0);
              }
              if (c.charAt(0) === "`") {
                for (
                  ;
                  e.substring(i + r).charAt(0) !== "`" &&
                  (r++, !(i + r > e.length));

                );
                var u = e.substring(0, i),
                  f = e.substring(u.length + 1, i + r),
                  p = e.substring(i + r + 1);
                (e = u + f + p), r--;
              }
              n.timeout = setTimeout(function () {
                n.toggleBlinking(!1),
                  i >= e.length ? n.doneTyping(e, i) : n.keepTyping(e, i, r),
                  n.temporaryPause &&
                    ((n.temporaryPause = !1),
                    n.options.onTypingResumed(n.arrayPos, n));
              }, s);
            }, a))
          : this.setPauseStatus(e, i, !0);
      }),
      (t.keepTyping = function (e, i, n) {
        i === 0 &&
          (this.toggleBlinking(!1),
          this.options.preStringTyped(this.arrayPos, this));
        var a = e.substring(0, (i += n));
        this.replaceText(a), this.typewrite(e, i);
      }),
      (t.doneTyping = function (e, i) {
        var n = this;
        this.options.onStringTyped(this.arrayPos, this),
          this.toggleBlinking(!0),
          (this.arrayPos === this.strings.length - 1 &&
            (this.complete(),
            this.loop === !1 || this.curLoop === this.loopCount)) ||
            (this.timeout = setTimeout(function () {
              n.backspace(e, i);
            }, this.backDelay));
      }),
      (t.backspace = function (e, i) {
        var n = this;
        if (this.pause.status !== !0) {
          if (this.fadeOut) return this.initFadeOut();
          this.toggleBlinking(!1);
          var a = this.humanizer(this.backSpeed);
          this.timeout = setTimeout(function () {
            i = Rn.backSpaceHtmlChars(e, i, n);
            var r = e.substring(0, i);
            if ((n.replaceText(r), n.smartBackspace)) {
              var s = n.strings[n.arrayPos + 1];
              n.stopNum = s && r === s.substring(0, i) ? i : 0;
            }
            i > n.stopNum
              ? (i--, n.backspace(e, i))
              : i <= n.stopNum &&
                (n.arrayPos++,
                n.arrayPos === n.strings.length
                  ? ((n.arrayPos = 0),
                    n.options.onLastStringBackspaced(),
                    n.shuffleStringsIfNeeded(),
                    n.begin())
                  : n.typewrite(n.strings[n.sequence[n.arrayPos]], i));
          }, a);
        } else this.setPauseStatus(e, i, !1);
      }),
      (t.complete = function () {
        this.options.onComplete(this),
          this.loop ? this.curLoop++ : (this.typingComplete = !0);
      }),
      (t.setPauseStatus = function (e, i, n) {
        (this.pause.typewrite = n),
          (this.pause.curString = e),
          (this.pause.curStrPos = i);
      }),
      (t.toggleBlinking = function (e) {
        this.cursor &&
          (this.pause.status ||
            (this.cursorBlinking !== e &&
              ((this.cursorBlinking = e),
              e
                ? this.cursor.classList.add("typed-cursor--blink")
                : this.cursor.classList.remove("typed-cursor--blink"))));
      }),
      (t.humanizer = function (e) {
        return Math.round((Math.random() * e) / 2) + e;
      }),
      (t.shuffleStringsIfNeeded = function () {
        this.shuffle &&
          (this.sequence = this.sequence.sort(function () {
            return Math.random() - 0.5;
          }));
      }),
      (t.initFadeOut = function () {
        var e = this;
        return (
          (this.el.className += " " + this.fadeOutClass),
          this.cursor && (this.cursor.className += " " + this.fadeOutClass),
          setTimeout(function () {
            e.arrayPos++,
              e.replaceText(""),
              e.strings.length > e.arrayPos
                ? e.typewrite(e.strings[e.sequence[e.arrayPos]], 0)
                : (e.typewrite(e.strings[0], 0), (e.arrayPos = 0));
          }, this.fadeOutDelay)
        );
      }),
      (t.replaceText = function (e) {
        this.attr
          ? this.el.setAttribute(this.attr, e)
          : this.isInput
          ? (this.el.value = e)
          : this.contentType === "html"
          ? (this.el.innerHTML = e)
          : (this.el.textContent = e);
      }),
      (t.bindFocusEvents = function () {
        var e = this;
        this.isInput &&
          (this.el.addEventListener("focus", function (i) {
            e.stop();
          }),
          this.el.addEventListener("blur", function (i) {
            (e.el.value && e.el.value.length !== 0) || e.start();
          }));
      }),
      (t.insertCursor = function () {
        this.showCursor &&
          (this.cursor ||
            ((this.cursor = document.createElement("span")),
            (this.cursor.className = "typed-cursor"),
            this.cursor.setAttribute("aria-hidden", !0),
            (this.cursor.innerHTML = this.cursorChar),
            this.el.parentNode &&
              this.el.parentNode.insertBefore(
                this.cursor,
                this.el.nextSibling
              )));
      }),
      o
    );
  })(),
  Xl = {
    strings: [
      "Sou um desenvolvedor Back-End",
      "Eu programo software",
      "Gosto de problemas dif\xEDceis",
      "Vai Brasil! \u{1F1E7}\u{1F1F7}\u{1F1E7}\u{1F1F7}\u{1F1E7}\u{1F1F7}",
      "Vulgo psicopata do Assembly",
      "Back-End? Dev-Ops? Ciberseguran\xE7a? Sei l\xE1, gosto de todos.",
      "Viva o C\xF3digo Livre!",
      "i use arch btw",
    ],
    typeSpeed: 120,
    backSpeed: 50,
    backDelay: 1500,
    loop: !0,
  };
new zl("#headline", Xl);
(() => {
  var o = {
      9662: (n, a, r) => {
        var s = r(614),
          c = r(6330),
          l = TypeError;
        n.exports = function (u) {
          if (s(u)) return u;
          throw l(c(u) + " is not a function");
        };
      },
      9483: (n, a, r) => {
        var s = r(4411),
          c = r(6330),
          l = TypeError;
        n.exports = function (u) {
          if (s(u)) return u;
          throw l(c(u) + " is not a constructor");
        };
      },
      6077: (n, a, r) => {
        var s = r(614),
          c = String,
          l = TypeError;
        n.exports = function (u) {
          if (typeof u == "object" || s(u)) return u;
          throw l("Can't set " + c(u) + " as a prototype");
        };
      },
      5787: (n, a, r) => {
        var s = r(7976),
          c = TypeError;
        n.exports = function (l, u) {
          if (s(u, l)) return l;
          throw c("Incorrect invocation");
        };
      },
      9670: (n, a, r) => {
        var s = r(111),
          c = String,
          l = TypeError;
        n.exports = function (u) {
          if (s(u)) return u;
          throw l(c(u) + " is not an object");
        };
      },
      8533: (n, a, r) => {
        var s = r(2092).forEach,
          c = r(9341),
          l = c("forEach");
        n.exports = l
          ? [].forEach
          : function (f) {
              return s(this, f, arguments.length > 1 ? arguments[1] : void 0);
            };
      },
      1318: (n, a, r) => {
        var s = r(5656),
          c = r(1400),
          l = r(6244),
          u = function (f) {
            return function (p, d, h) {
              var m = s(p),
                v = l(m),
                g = c(h, v),
                y;
              if (f && d != d) {
                for (; v > g; ) if (((y = m[g++]), y != y)) return !0;
              } else
                for (; v > g; g++)
                  if ((f || g in m) && m[g] === d) return f || g || 0;
              return !f && -1;
            };
          };
        n.exports = { includes: u(!0), indexOf: u(!1) };
      },
      2092: (n, a, r) => {
        var s = r(9974),
          c = r(1702),
          l = r(8361),
          u = r(7908),
          f = r(6244),
          p = r(5417),
          d = c([].push),
          h = function (m) {
            var v = m == 1,
              g = m == 2,
              y = m == 3,
              S = m == 4,
              b = m == 6,
              A = m == 7,
              E = m == 5 || b;
            return function (w, x, C, D) {
              for (
                var T = u(w),
                  O = l(T),
                  N = s(x, C),
                  I = f(O),
                  P = 0,
                  R = D || p,
                  M = v ? R(w, I) : g || A ? R(w, 0) : void 0,
                  F,
                  k;
                I > P;
                P++
              )
                if ((E || P in O) && ((F = O[P]), (k = N(F, P, T)), m))
                  if (v) M[P] = k;
                  else if (k)
                    switch (m) {
                      case 3:
                        return !0;
                      case 5:
                        return F;
                      case 6:
                        return P;
                      case 2:
                        d(M, F);
                    }
                  else
                    switch (m) {
                      case 4:
                        return !1;
                      case 7:
                        d(M, F);
                    }
              return b ? -1 : y || S ? S : M;
            };
          };
        n.exports = {
          forEach: h(0),
          map: h(1),
          filter: h(2),
          some: h(3),
          every: h(4),
          find: h(5),
          findIndex: h(6),
          filterReject: h(7),
        };
      },
      9341: (n, a, r) => {
        var s = r(7293);
        n.exports = function (c, l) {
          var u = [][c];
          return (
            !!u &&
            s(function () {
              u.call(
                null,
                l ||
                  function () {
                    return 1;
                  },
                1
              );
            })
          );
        };
      },
      206: (n, a, r) => {
        var s = r(1702);
        n.exports = s([].slice);
      },
      7475: (n, a, r) => {
        var s = r(3157),
          c = r(4411),
          l = r(111),
          u = r(5112),
          f = u("species"),
          p = Array;
        n.exports = function (d) {
          var h;
          return (
            s(d) &&
              ((h = d.constructor),
              c(h) && (h === p || s(h.prototype))
                ? (h = void 0)
                : l(h) && ((h = h[f]), h === null && (h = void 0))),
            h === void 0 ? p : h
          );
        };
      },
      5417: (n, a, r) => {
        var s = r(7475);
        n.exports = function (c, l) {
          return new (s(c))(l === 0 ? 0 : l);
        };
      },
      7072: (n, a, r) => {
        var s = r(5112),
          c = s("iterator"),
          l = !1;
        try {
          var u = 0,
            f = {
              next: function () {
                return { done: !!u++ };
              },
              return: function () {
                l = !0;
              },
            };
          (f[c] = function () {
            return this;
          }),
            Array.from(f, function () {
              throw 2;
            });
        } catch {}
        n.exports = function (p, d) {
          if (!d && !l) return !1;
          var h = !1;
          try {
            var m = {};
            (m[c] = function () {
              return {
                next: function () {
                  return { done: (h = !0) };
                },
              };
            }),
              p(m);
          } catch {}
          return h;
        };
      },
      4326: (n, a, r) => {
        var s = r(1702),
          c = s({}.toString),
          l = s("".slice);
        n.exports = function (u) {
          return l(c(u), 8, -1);
        };
      },
      648: (n, a, r) => {
        var s = r(1694),
          c = r(614),
          l = r(4326),
          u = r(5112),
          f = u("toStringTag"),
          p = Object,
          d =
            l(
              (function () {
                return arguments;
              })()
            ) == "Arguments",
          h = function (m, v) {
            try {
              return m[v];
            } catch {}
          };
        n.exports = s
          ? l
          : function (m) {
              var v, g, y;
              return m === void 0
                ? "Undefined"
                : m === null
                ? "Null"
                : typeof (g = h((v = p(m)), f)) == "string"
                ? g
                : d
                ? l(v)
                : (y = l(v)) == "Object" && c(v.callee)
                ? "Arguments"
                : y;
            };
      },
      9920: (n, a, r) => {
        var s = r(2597),
          c = r(3887),
          l = r(1236),
          u = r(3070);
        n.exports = function (f, p, d) {
          for (var h = c(p), m = u.f, v = l.f, g = 0; g < h.length; g++) {
            var y = h[g];
            !s(f, y) && !(d && s(d, y)) && m(f, y, v(p, y));
          }
        };
      },
      8880: (n, a, r) => {
        var s = r(9781),
          c = r(3070),
          l = r(9114);
        n.exports = s
          ? function (u, f, p) {
              return c.f(u, f, l(1, p));
            }
          : function (u, f, p) {
              return (u[f] = p), u;
            };
      },
      9114: (n) => {
        n.exports = function (a, r) {
          return {
            enumerable: !(a & 1),
            configurable: !(a & 2),
            writable: !(a & 4),
            value: r,
          };
        };
      },
      7045: (n, a, r) => {
        var s = r(6339),
          c = r(3070);
        n.exports = function (l, u, f) {
          return (
            f.get && s(f.get, u, { getter: !0 }),
            f.set && s(f.set, u, { setter: !0 }),
            c.f(l, u, f)
          );
        };
      },
      8052: (n, a, r) => {
        var s = r(614),
          c = r(3070),
          l = r(6339),
          u = r(3072);
        n.exports = function (f, p, d, h) {
          h || (h = {});
          var m = h.enumerable,
            v = h.name !== void 0 ? h.name : p;
          if ((s(d) && l(d, v, h), h.global)) m ? (f[p] = d) : u(p, d);
          else {
            try {
              h.unsafe ? f[p] && (m = !0) : delete f[p];
            } catch {}
            m
              ? (f[p] = d)
              : c.f(f, p, {
                  value: d,
                  enumerable: !1,
                  configurable: !h.nonConfigurable,
                  writable: !h.nonWritable,
                });
          }
          return f;
        };
      },
      3072: (n, a, r) => {
        var s = r(7854),
          c = Object.defineProperty;
        n.exports = function (l, u) {
          try {
            c(s, l, { value: u, configurable: !0, writable: !0 });
          } catch {
            s[l] = u;
          }
          return u;
        };
      },
      9781: (n, a, r) => {
        var s = r(7293);
        n.exports = !s(function () {
          return (
            Object.defineProperty({}, 1, {
              get: function () {
                return 7;
              },
            })[1] != 7
          );
        });
      },
      4154: (n) => {
        var a = typeof document == "object" && document.all,
          r = typeof a == "undefined" && a !== void 0;
        n.exports = { all: a, IS_HTMLDDA: r };
      },
      317: (n, a, r) => {
        var s = r(7854),
          c = r(111),
          l = s.document,
          u = c(l) && c(l.createElement);
        n.exports = function (f) {
          return u ? l.createElement(f) : {};
        };
      },
      8324: (n) => {
        n.exports = {
          CSSRuleList: 0,
          CSSStyleDeclaration: 0,
          CSSValueList: 0,
          ClientRectList: 0,
          DOMRectList: 0,
          DOMStringList: 0,
          DOMTokenList: 1,
          DataTransferItemList: 0,
          FileList: 0,
          HTMLAllCollection: 0,
          HTMLCollection: 0,
          HTMLFormElement: 0,
          HTMLSelectElement: 0,
          MediaList: 0,
          MimeTypeArray: 0,
          NamedNodeMap: 0,
          NodeList: 1,
          PaintRequestList: 0,
          Plugin: 0,
          PluginArray: 0,
          SVGLengthList: 0,
          SVGNumberList: 0,
          SVGPathSegList: 0,
          SVGPointList: 0,
          SVGStringList: 0,
          SVGTransformList: 0,
          SourceBufferList: 0,
          StyleSheetList: 0,
          TextTrackCueList: 0,
          TextTrackList: 0,
          TouchList: 0,
        };
      },
      8509: (n, a, r) => {
        var s = r(317),
          c = s("span").classList,
          l = c && c.constructor && c.constructor.prototype;
        n.exports = l === Object.prototype ? void 0 : l;
      },
      7871: (n, a, r) => {
        var s = r(3823),
          c = r(5268);
        n.exports =
          !s && !c && typeof window == "object" && typeof document == "object";
      },
      3823: (n) => {
        n.exports =
          typeof Deno == "object" && Deno && typeof Deno.version == "object";
      },
      1528: (n, a, r) => {
        var s = r(8113);
        n.exports = /ipad|iphone|ipod/i.test(s) && typeof Pebble != "undefined";
      },
      6833: (n, a, r) => {
        var s = r(8113);
        n.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(s);
      },
      5268: (n, a, r) => {
        var s = r(4326);
        n.exports = typeof process != "undefined" && s(process) == "process";
      },
      1036: (n, a, r) => {
        var s = r(8113);
        n.exports = /web0s(?!.*chrome)/i.test(s);
      },
      8113: (n) => {
        n.exports =
          (typeof navigator != "undefined" && String(navigator.userAgent)) ||
          "";
      },
      7392: (n, a, r) => {
        var s = r(7854),
          c = r(8113),
          l = s.process,
          u = s.Deno,
          f = (l && l.versions) || (u && u.version),
          p = f && f.v8,
          d,
          h;
        p &&
          ((d = p.split(".")), (h = d[0] > 0 && d[0] < 4 ? 1 : +(d[0] + d[1]))),
          !h &&
            c &&
            ((d = c.match(/Edge\/(\d+)/)),
            (!d || d[1] >= 74) &&
              ((d = c.match(/Chrome\/(\d+)/)), d && (h = +d[1]))),
          (n.exports = h);
      },
      748: (n) => {
        n.exports = [
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf",
        ];
      },
      1060: (n, a, r) => {
        var s = r(1702),
          c = Error,
          l = s("".replace),
          u = (function (d) {
            return String(c(d).stack);
          })("zxcasd"),
          f = /\n\s*at [^:]*:[^\n]*/,
          p = f.test(u);
        n.exports = function (d, h) {
          if (p && typeof d == "string" && !c.prepareStackTrace)
            for (; h--; ) d = l(d, f, "");
          return d;
        };
      },
      5392: (n, a, r) => {
        var s = r(8880),
          c = r(1060),
          l = r(2914),
          u = Error.captureStackTrace;
        n.exports = function (f, p, d, h) {
          l && (u ? u(f, p) : s(f, "stack", c(d, h)));
        };
      },
      2914: (n, a, r) => {
        var s = r(7293),
          c = r(9114);
        n.exports = !s(function () {
          var l = Error("a");
          return "stack" in l
            ? (Object.defineProperty(l, "stack", c(1, 7)), l.stack !== 7)
            : !0;
        });
      },
      2109: (n, a, r) => {
        var s = r(7854),
          c = r(1236).f,
          l = r(8880),
          u = r(8052),
          f = r(3072),
          p = r(9920),
          d = r(4705);
        n.exports = function (h, m) {
          var v = h.target,
            g = h.global,
            y = h.stat,
            S,
            b,
            A,
            E,
            w,
            x;
          if (
            (g
              ? (b = s)
              : y
              ? (b = s[v] || f(v, {}))
              : (b = (s[v] || {}).prototype),
            b)
          )
            for (A in m) {
              if (
                ((w = m[A]),
                h.dontCallGetSet
                  ? ((x = c(b, A)), (E = x && x.value))
                  : (E = b[A]),
                (S = d(g ? A : v + (y ? "." : "#") + A, h.forced)),
                !S && E !== void 0)
              ) {
                if (typeof w == typeof E) continue;
                p(w, E);
              }
              (h.sham || (E && E.sham)) && l(w, "sham", !0), u(b, A, w, h);
            }
        };
      },
      7293: (n) => {
        n.exports = function (a) {
          try {
            return !!a();
          } catch {
            return !0;
          }
        };
      },
      2104: (n, a, r) => {
        var s = r(4374),
          c = Function.prototype,
          l = c.apply,
          u = c.call;
        n.exports =
          (typeof Reflect == "object" && Reflect.apply) ||
          (s
            ? u.bind(l)
            : function () {
                return u.apply(l, arguments);
              });
      },
      9974: (n, a, r) => {
        var s = r(1470),
          c = r(9662),
          l = r(4374),
          u = s(s.bind);
        n.exports = function (f, p) {
          return (
            c(f),
            p === void 0
              ? f
              : l
              ? u(f, p)
              : function () {
                  return f.apply(p, arguments);
                }
          );
        };
      },
      4374: (n, a, r) => {
        var s = r(7293);
        n.exports = !s(function () {
          var c = function () {}.bind();
          return typeof c != "function" || c.hasOwnProperty("prototype");
        });
      },
      6916: (n, a, r) => {
        var s = r(4374),
          c = Function.prototype.call;
        n.exports = s
          ? c.bind(c)
          : function () {
              return c.apply(c, arguments);
            };
      },
      6530: (n, a, r) => {
        var s = r(9781),
          c = r(2597),
          l = Function.prototype,
          u = s && Object.getOwnPropertyDescriptor,
          f = c(l, "name"),
          p = f && function () {}.name === "something",
          d = f && (!s || (s && u(l, "name").configurable));
        n.exports = { EXISTS: f, PROPER: p, CONFIGURABLE: d };
      },
      5668: (n, a, r) => {
        var s = r(1702),
          c = r(9662);
        n.exports = function (l, u, f) {
          try {
            return s(c(Object.getOwnPropertyDescriptor(l, u)[f]));
          } catch {}
        };
      },
      1470: (n, a, r) => {
        var s = r(4326),
          c = r(1702);
        n.exports = function (l) {
          if (s(l) === "Function") return c(l);
        };
      },
      1702: (n, a, r) => {
        var s = r(4374),
          c = Function.prototype,
          l = c.call,
          u = s && c.bind.bind(l, l);
        n.exports = s
          ? u
          : function (f) {
              return function () {
                return l.apply(f, arguments);
              };
            };
      },
      5005: (n, a, r) => {
        var s = r(7854),
          c = r(614),
          l = function (u) {
            return c(u) ? u : void 0;
          };
        n.exports = function (u, f) {
          return arguments.length < 2 ? l(s[u]) : s[u] && s[u][f];
        };
      },
      1246: (n, a, r) => {
        var s = r(648),
          c = r(8173),
          l = r(8554),
          u = r(7497),
          f = r(5112),
          p = f("iterator");
        n.exports = function (d) {
          if (!l(d)) return c(d, p) || c(d, "@@iterator") || u[s(d)];
        };
      },
      4121: (n, a, r) => {
        var s = r(6916),
          c = r(9662),
          l = r(9670),
          u = r(6330),
          f = r(1246),
          p = TypeError;
        n.exports = function (d, h) {
          var m = arguments.length < 2 ? f(d) : h;
          if (c(m)) return l(s(m, d));
          throw p(u(d) + " is not iterable");
        };
      },
      8044: (n, a, r) => {
        var s = r(1702),
          c = r(3157),
          l = r(614),
          u = r(4326),
          f = r(1340),
          p = s([].push);
        n.exports = function (d) {
          if (l(d)) return d;
          if (!!c(d)) {
            for (var h = d.length, m = [], v = 0; v < h; v++) {
              var g = d[v];
              typeof g == "string"
                ? p(m, g)
                : (typeof g == "number" ||
                    u(g) == "Number" ||
                    u(g) == "String") &&
                  p(m, f(g));
            }
            var y = m.length,
              S = !0;
            return function (b, A) {
              if (S) return (S = !1), A;
              if (c(this)) return A;
              for (var E = 0; E < y; E++) if (m[E] === b) return A;
            };
          }
        };
      },
      8173: (n, a, r) => {
        var s = r(9662),
          c = r(8554);
        n.exports = function (l, u) {
          var f = l[u];
          return c(f) ? void 0 : s(f);
        };
      },
      7854: (n, a, r) => {
        var s = function (c) {
          return c && c.Math == Math && c;
        };
        n.exports =
          s(typeof globalThis == "object" && globalThis) ||
          s(typeof window == "object" && window) ||
          s(typeof self == "object" && self) ||
          s(typeof r.g == "object" && r.g) ||
          (function () {
            return this;
          })() ||
          Function("return this")();
      },
      2597: (n, a, r) => {
        var s = r(1702),
          c = r(7908),
          l = s({}.hasOwnProperty);
        n.exports =
          Object.hasOwn ||
          function (f, p) {
            return l(c(f), p);
          };
      },
      3501: (n) => {
        n.exports = {};
      },
      842: (n) => {
        n.exports = function (a, r) {
          try {
            arguments.length == 1 ? console.error(a) : console.error(a, r);
          } catch {}
        };
      },
      490: (n, a, r) => {
        var s = r(5005);
        n.exports = s("document", "documentElement");
      },
      4664: (n, a, r) => {
        var s = r(9781),
          c = r(7293),
          l = r(317);
        n.exports =
          !s &&
          !c(function () {
            return (
              Object.defineProperty(l("div"), "a", {
                get: function () {
                  return 7;
                },
              }).a != 7
            );
          });
      },
      8361: (n, a, r) => {
        var s = r(1702),
          c = r(7293),
          l = r(4326),
          u = Object,
          f = s("".split);
        n.exports = c(function () {
          return !u("z").propertyIsEnumerable(0);
        })
          ? function (p) {
              return l(p) == "String" ? f(p, "") : u(p);
            }
          : u;
      },
      9587: (n, a, r) => {
        var s = r(614),
          c = r(111),
          l = r(7674);
        n.exports = function (u, f, p) {
          var d, h;
          return (
            l &&
              s((d = f.constructor)) &&
              d !== p &&
              c((h = d.prototype)) &&
              h !== p.prototype &&
              l(u, h),
            u
          );
        };
      },
      2788: (n, a, r) => {
        var s = r(1702),
          c = r(614),
          l = r(5465),
          u = s(Function.toString);
        c(l.inspectSource) ||
          (l.inspectSource = function (f) {
            return u(f);
          }),
          (n.exports = l.inspectSource);
      },
      8340: (n, a, r) => {
        var s = r(111),
          c = r(8880);
        n.exports = function (l, u) {
          s(u) && "cause" in u && c(l, "cause", u.cause);
        };
      },
      9909: (n, a, r) => {
        var s = r(4811),
          c = r(7854),
          l = r(111),
          u = r(8880),
          f = r(2597),
          p = r(5465),
          d = r(6200),
          h = r(3501),
          m = "Object already initialized",
          v = c.TypeError,
          g = c.WeakMap,
          y,
          S,
          b,
          A = function (C) {
            return b(C) ? S(C) : y(C, {});
          },
          E = function (C) {
            return function (D) {
              var T;
              if (!l(D) || (T = S(D)).type !== C)
                throw v("Incompatible receiver, " + C + " required");
              return T;
            };
          };
        if (s || p.state) {
          var w = p.state || (p.state = new g());
          (w.get = w.get),
            (w.has = w.has),
            (w.set = w.set),
            (y = function (C, D) {
              if (w.has(C)) throw v(m);
              return (D.facade = C), w.set(C, D), D;
            }),
            (S = function (C) {
              return w.get(C) || {};
            }),
            (b = function (C) {
              return w.has(C);
            });
        } else {
          var x = d("state");
          (h[x] = !0),
            (y = function (C, D) {
              if (f(C, x)) throw v(m);
              return (D.facade = C), u(C, x, D), D;
            }),
            (S = function (C) {
              return f(C, x) ? C[x] : {};
            }),
            (b = function (C) {
              return f(C, x);
            });
        }
        n.exports = { set: y, get: S, has: b, enforce: A, getterFor: E };
      },
      7659: (n, a, r) => {
        var s = r(5112),
          c = r(7497),
          l = s("iterator"),
          u = Array.prototype;
        n.exports = function (f) {
          return f !== void 0 && (c.Array === f || u[l] === f);
        };
      },
      3157: (n, a, r) => {
        var s = r(4326);
        n.exports =
          Array.isArray ||
          function (l) {
            return s(l) == "Array";
          };
      },
      614: (n, a, r) => {
        var s = r(4154),
          c = s.all;
        n.exports = s.IS_HTMLDDA
          ? function (l) {
              return typeof l == "function" || l === c;
            }
          : function (l) {
              return typeof l == "function";
            };
      },
      4411: (n, a, r) => {
        var s = r(1702),
          c = r(7293),
          l = r(614),
          u = r(648),
          f = r(5005),
          p = r(2788),
          d = function () {},
          h = [],
          m = f("Reflect", "construct"),
          v = /^\s*(?:class|function)\b/,
          g = s(v.exec),
          y = !v.exec(d),
          S = function (E) {
            if (!l(E)) return !1;
            try {
              return m(d, h, E), !0;
            } catch {
              return !1;
            }
          },
          b = function (E) {
            if (!l(E)) return !1;
            switch (u(E)) {
              case "AsyncFunction":
              case "GeneratorFunction":
              case "AsyncGeneratorFunction":
                return !1;
            }
            try {
              return y || !!g(v, p(E));
            } catch {
              return !0;
            }
          };
        (b.sham = !0),
          (n.exports =
            !m ||
            c(function () {
              var A;
              return (
                S(S.call) ||
                !S(Object) ||
                !S(function () {
                  A = !0;
                }) ||
                A
              );
            })
              ? b
              : S);
      },
      4705: (n, a, r) => {
        var s = r(7293),
          c = r(614),
          l = /#|\.prototype\./,
          u = function (m, v) {
            var g = p[f(m)];
            return g == h ? !0 : g == d ? !1 : c(v) ? s(v) : !!v;
          },
          f = (u.normalize = function (m) {
            return String(m).replace(l, ".").toLowerCase();
          }),
          p = (u.data = {}),
          d = (u.NATIVE = "N"),
          h = (u.POLYFILL = "P");
        n.exports = u;
      },
      8554: (n) => {
        n.exports = function (a) {
          return a == null;
        };
      },
      111: (n, a, r) => {
        var s = r(614),
          c = r(4154),
          l = c.all;
        n.exports = c.IS_HTMLDDA
          ? function (u) {
              return typeof u == "object" ? u !== null : s(u) || u === l;
            }
          : function (u) {
              return typeof u == "object" ? u !== null : s(u);
            };
      },
      1913: (n) => {
        n.exports = !1;
      },
      2190: (n, a, r) => {
        var s = r(5005),
          c = r(614),
          l = r(7976),
          u = r(3307),
          f = Object;
        n.exports = u
          ? function (p) {
              return typeof p == "symbol";
            }
          : function (p) {
              var d = s("Symbol");
              return c(d) && l(d.prototype, f(p));
            };
      },
      408: (n, a, r) => {
        var s = r(9974),
          c = r(6916),
          l = r(9670),
          u = r(6330),
          f = r(7659),
          p = r(6244),
          d = r(7976),
          h = r(4121),
          m = r(1246),
          v = r(9212),
          g = TypeError,
          y = function (b, A) {
            (this.stopped = b), (this.result = A);
          },
          S = y.prototype;
        n.exports = function (b, A, E) {
          var w = E && E.that,
            x = !!(E && E.AS_ENTRIES),
            C = !!(E && E.IS_RECORD),
            D = !!(E && E.IS_ITERATOR),
            T = !!(E && E.INTERRUPTED),
            O = s(A, w),
            N,
            I,
            P,
            R,
            M,
            F,
            k,
            G = function (B) {
              return N && v(N, "normal", B), new y(!0, B);
            },
            j = function (B) {
              return x
                ? (l(B), T ? O(B[0], B[1], G) : O(B[0], B[1]))
                : T
                ? O(B, G)
                : O(B);
            };
          if (C) N = b.iterator;
          else if (D) N = b;
          else {
            if (((I = m(b)), !I)) throw g(u(b) + " is not iterable");
            if (f(I)) {
              for (P = 0, R = p(b); R > P; P++)
                if (((M = j(b[P])), M && d(S, M))) return M;
              return new y(!1);
            }
            N = h(b, I);
          }
          for (F = C ? b.next : N.next; !(k = c(F, N)).done; ) {
            try {
              M = j(k.value);
            } catch (B) {
              v(N, "throw", B);
            }
            if (typeof M == "object" && M && d(S, M)) return M;
          }
          return new y(!1);
        };
      },
      9212: (n, a, r) => {
        var s = r(6916),
          c = r(9670),
          l = r(8173);
        n.exports = function (u, f, p) {
          var d, h;
          c(u);
          try {
            if (((d = l(u, "return")), !d)) {
              if (f === "throw") throw p;
              return p;
            }
            d = s(d, u);
          } catch (m) {
            (h = !0), (d = m);
          }
          if (f === "throw") throw p;
          if (h) throw d;
          return c(d), p;
        };
      },
      7497: (n) => {
        n.exports = {};
      },
      6244: (n, a, r) => {
        var s = r(7466);
        n.exports = function (c) {
          return s(c.length);
        };
      },
      6339: (n, a, r) => {
        var s = r(1702),
          c = r(7293),
          l = r(614),
          u = r(2597),
          f = r(9781),
          p = r(6530).CONFIGURABLE,
          d = r(2788),
          h = r(9909),
          m = h.enforce,
          v = h.get,
          g = String,
          y = Object.defineProperty,
          S = s("".slice),
          b = s("".replace),
          A = s([].join),
          E =
            f &&
            !c(function () {
              return y(function () {}, "length", { value: 8 }).length !== 8;
            }),
          w = String(String).split("String"),
          x = (n.exports = function (C, D, T) {
            S(g(D), 0, 7) === "Symbol(" &&
              (D = "[" + b(g(D), /^Symbol\(([^)]*)\)/, "$1") + "]"),
              T && T.getter && (D = "get " + D),
              T && T.setter && (D = "set " + D),
              (!u(C, "name") || (p && C.name !== D)) &&
                (f
                  ? y(C, "name", { value: D, configurable: !0 })
                  : (C.name = D)),
              E &&
                T &&
                u(T, "arity") &&
                C.length !== T.arity &&
                y(C, "length", { value: T.arity });
            try {
              T && u(T, "constructor") && T.constructor
                ? f && y(C, "prototype", { writable: !1 })
                : C.prototype && (C.prototype = void 0);
            } catch {}
            var O = m(C);
            return (
              u(O, "source") ||
                (O.source = A(w, typeof D == "string" ? D : "")),
              C
            );
          });
        Function.prototype.toString = x(function () {
          return (l(this) && v(this).source) || d(this);
        }, "toString");
      },
      4758: (n) => {
        var a = Math.ceil,
          r = Math.floor;
        n.exports =
          Math.trunc ||
          function (c) {
            var l = +c;
            return (l > 0 ? r : a)(l);
          };
      },
      5948: (n, a, r) => {
        var s = r(7854),
          c = r(9974),
          l = r(1236).f,
          u = r(261).set,
          f = r(8572),
          p = r(6833),
          d = r(1528),
          h = r(1036),
          m = r(5268),
          v = s.MutationObserver || s.WebKitMutationObserver,
          g = s.document,
          y = s.process,
          S = s.Promise,
          b = l(s, "queueMicrotask"),
          A = b && b.value,
          E,
          w,
          x,
          C,
          D;
        if (!A) {
          var T = new f(),
            O = function () {
              var N, I;
              for (m && (N = y.domain) && N.exit(); (I = T.get()); )
                try {
                  I();
                } catch (P) {
                  throw (T.head && E(), P);
                }
              N && N.enter();
            };
          !p && !m && !h && v && g
            ? ((w = !0),
              (x = g.createTextNode("")),
              new v(O).observe(x, { characterData: !0 }),
              (E = function () {
                x.data = w = !w;
              }))
            : !d && S && S.resolve
            ? ((C = S.resolve(void 0)),
              (C.constructor = S),
              (D = c(C.then, C)),
              (E = function () {
                D(O);
              }))
            : m
            ? (E = function () {
                y.nextTick(O);
              })
            : ((u = c(u, s)),
              (E = function () {
                u(O);
              })),
            (A = function (N) {
              T.head || E(), T.add(N);
            });
        }
        n.exports = A;
      },
      8523: (n, a, r) => {
        var s = r(9662),
          c = TypeError,
          l = function (u) {
            var f, p;
            (this.promise = new u(function (d, h) {
              if (f !== void 0 || p !== void 0)
                throw c("Bad Promise constructor");
              (f = d), (p = h);
            })),
              (this.resolve = s(f)),
              (this.reject = s(p));
          };
        n.exports.f = function (u) {
          return new l(u);
        };
      },
      6277: (n, a, r) => {
        var s = r(1340);
        n.exports = function (c, l) {
          return c === void 0 ? (arguments.length < 2 ? "" : l) : s(c);
        };
      },
      3070: (n, a, r) => {
        var s = r(9781),
          c = r(4664),
          l = r(3353),
          u = r(9670),
          f = r(4948),
          p = TypeError,
          d = Object.defineProperty,
          h = Object.getOwnPropertyDescriptor,
          m = "enumerable",
          v = "configurable",
          g = "writable";
        a.f = s
          ? l
            ? function (S, b, A) {
                if (
                  (u(S),
                  (b = f(b)),
                  u(A),
                  typeof S == "function" &&
                    b === "prototype" &&
                    "value" in A &&
                    g in A &&
                    !A[g])
                ) {
                  var E = h(S, b);
                  E &&
                    E[g] &&
                    ((S[b] = A.value),
                    (A = {
                      configurable: v in A ? A[v] : E[v],
                      enumerable: m in A ? A[m] : E[m],
                      writable: !1,
                    }));
                }
                return d(S, b, A);
              }
            : d
          : function (S, b, A) {
              if ((u(S), (b = f(b)), u(A), c))
                try {
                  return d(S, b, A);
                } catch {}
              if ("get" in A || "set" in A) throw p("Accessors not supported");
              return "value" in A && (S[b] = A.value), S;
            };
      },
      1236: (n, a, r) => {
        var s = r(9781),
          c = r(6916),
          l = r(5296),
          u = r(9114),
          f = r(5656),
          p = r(4948),
          d = r(2597),
          h = r(4664),
          m = Object.getOwnPropertyDescriptor;
        a.f = s
          ? m
          : function (g, y) {
              if (((g = f(g)), (y = p(y)), h))
                try {
                  return m(g, y);
                } catch {}
              if (d(g, y)) return u(!c(l.f, g, y), g[y]);
            };
      },
      8006: (n, a, r) => {
        var s = r(6324),
          c = r(748),
          l = c.concat("length", "prototype");
        a.f =
          Object.getOwnPropertyNames ||
          function (f) {
            return s(f, l);
          };
      },
      5181: (n, a) => {
        a.f = Object.getOwnPropertySymbols;
      },
      7976: (n, a, r) => {
        var s = r(1702);
        n.exports = s({}.isPrototypeOf);
      },
      6324: (n, a, r) => {
        var s = r(1702),
          c = r(2597),
          l = r(5656),
          u = r(1318).indexOf,
          f = r(3501),
          p = s([].push);
        n.exports = function (d, h) {
          var m = l(d),
            v = 0,
            g = [],
            y;
          for (y in m) !c(f, y) && c(m, y) && p(g, y);
          for (; h.length > v; ) c(m, (y = h[v++])) && (~u(g, y) || p(g, y));
          return g;
        };
      },
      1956: (n, a, r) => {
        var s = r(6324),
          c = r(748);
        n.exports =
          Object.keys ||
          function (u) {
            return s(u, c);
          };
      },
      5296: (n, a) => {
        var r = {}.propertyIsEnumerable,
          s = Object.getOwnPropertyDescriptor,
          c = s && !r.call({ 1: 2 }, 1);
        a.f = c
          ? function (u) {
              var f = s(this, u);
              return !!f && f.enumerable;
            }
          : r;
      },
      7674: (n, a, r) => {
        var s = r(5668),
          c = r(9670),
          l = r(6077);
        n.exports =
          Object.setPrototypeOf ||
          ("__proto__" in {}
            ? (function () {
                var u = !1,
                  f = {},
                  p;
                try {
                  (p = s(Object.prototype, "__proto__", "set")),
                    p(f, []),
                    (u = f instanceof Array);
                } catch {}
                return function (h, m) {
                  return c(h), l(m), u ? p(h, m) : (h.__proto__ = m), h;
                };
              })()
            : void 0);
      },
      288: (n, a, r) => {
        var s = r(1694),
          c = r(648);
        n.exports = s
          ? {}.toString
          : function () {
              return "[object " + c(this) + "]";
            };
      },
      2140: (n, a, r) => {
        var s = r(6916),
          c = r(614),
          l = r(111),
          u = TypeError;
        n.exports = function (f, p) {
          var d, h;
          if (
            (p === "string" && c((d = f.toString)) && !l((h = s(d, f)))) ||
            (c((d = f.valueOf)) && !l((h = s(d, f)))) ||
            (p !== "string" && c((d = f.toString)) && !l((h = s(d, f))))
          )
            return h;
          throw u("Can't convert object to primitive value");
        };
      },
      3887: (n, a, r) => {
        var s = r(5005),
          c = r(1702),
          l = r(8006),
          u = r(5181),
          f = r(9670),
          p = c([].concat);
        n.exports =
          s("Reflect", "ownKeys") ||
          function (h) {
            var m = l.f(f(h)),
              v = u.f;
            return v ? p(m, v(h)) : m;
          };
      },
      2534: (n) => {
        n.exports = function (a) {
          try {
            return { error: !1, value: a() };
          } catch (r) {
            return { error: !0, value: r };
          }
        };
      },
      3702: (n, a, r) => {
        var s = r(7854),
          c = r(2492),
          l = r(614),
          u = r(4705),
          f = r(2788),
          p = r(5112),
          d = r(7871),
          h = r(3823),
          m = r(1913),
          v = r(7392),
          g = c && c.prototype,
          y = p("species"),
          S = !1,
          b = l(s.PromiseRejectionEvent),
          A = u("Promise", function () {
            var E = f(c),
              w = E !== String(c);
            if ((!w && v === 66) || (m && !(g.catch && g.finally))) return !0;
            if (!v || v < 51 || !/native code/.test(E)) {
              var x = new c(function (T) {
                  T(1);
                }),
                C = function (T) {
                  T(
                    function () {},
                    function () {}
                  );
                },
                D = (x.constructor = {});
              if (((D[y] = C), (S = x.then(function () {}) instanceof C), !S))
                return !0;
            }
            return !w && (d || h) && !b;
          });
        n.exports = { CONSTRUCTOR: A, REJECTION_EVENT: b, SUBCLASSING: S };
      },
      2492: (n, a, r) => {
        var s = r(7854);
        n.exports = s.Promise;
      },
      9478: (n, a, r) => {
        var s = r(9670),
          c = r(111),
          l = r(8523);
        n.exports = function (u, f) {
          if ((s(u), c(f) && f.constructor === u)) return f;
          var p = l.f(u),
            d = p.resolve;
          return d(f), p.promise;
        };
      },
      612: (n, a, r) => {
        var s = r(2492),
          c = r(7072),
          l = r(3702).CONSTRUCTOR;
        n.exports =
          l ||
          !c(function (u) {
            s.all(u).then(void 0, function () {});
          });
      },
      2626: (n, a, r) => {
        var s = r(3070).f;
        n.exports = function (c, l, u) {
          u in c ||
            s(c, u, {
              configurable: !0,
              get: function () {
                return l[u];
              },
              set: function (f) {
                l[u] = f;
              },
            });
        };
      },
      8572: (n) => {
        var a = function () {
          (this.head = null), (this.tail = null);
        };
        (a.prototype = {
          add: function (r) {
            var s = { item: r, next: null },
              c = this.tail;
            c ? (c.next = s) : (this.head = s), (this.tail = s);
          },
          get: function () {
            var r = this.head;
            if (r) {
              var s = (this.head = r.next);
              return s === null && (this.tail = null), r.item;
            }
          },
        }),
          (n.exports = a);
      },
      4488: (n, a, r) => {
        var s = r(8554),
          c = TypeError;
        n.exports = function (l) {
          if (s(l)) throw c("Can't call method on " + l);
          return l;
        };
      },
      6340: (n, a, r) => {
        var s = r(5005),
          c = r(7045),
          l = r(5112),
          u = r(9781),
          f = l("species");
        n.exports = function (p) {
          var d = s(p);
          u &&
            d &&
            !d[f] &&
            c(d, f, {
              configurable: !0,
              get: function () {
                return this;
              },
            });
        };
      },
      8003: (n, a, r) => {
        var s = r(3070).f,
          c = r(2597),
          l = r(5112),
          u = l("toStringTag");
        n.exports = function (f, p, d) {
          f && !d && (f = f.prototype),
            f && !c(f, u) && s(f, u, { configurable: !0, value: p });
        };
      },
      6200: (n, a, r) => {
        var s = r(2309),
          c = r(9711),
          l = s("keys");
        n.exports = function (u) {
          return l[u] || (l[u] = c(u));
        };
      },
      5465: (n, a, r) => {
        var s = r(7854),
          c = r(3072),
          l = "__core-js_shared__",
          u = s[l] || c(l, {});
        n.exports = u;
      },
      2309: (n, a, r) => {
        var s = r(1913),
          c = r(5465);
        (n.exports = function (l, u) {
          return c[l] || (c[l] = u !== void 0 ? u : {});
        })("versions", []).push({
          version: "3.30.0",
          mode: s ? "pure" : "global",
          copyright: "\xA9 2014-2023 Denis Pushkarev (zloirock.ru)",
          license: "https://github.com/zloirock/core-js/blob/v3.30.0/LICENSE",
          source: "https://github.com/zloirock/core-js",
        });
      },
      6707: (n, a, r) => {
        var s = r(9670),
          c = r(9483),
          l = r(8554),
          u = r(5112),
          f = u("species");
        n.exports = function (p, d) {
          var h = s(p).constructor,
            m;
          return h === void 0 || l((m = s(h)[f])) ? d : c(m);
        };
      },
      6293: (n, a, r) => {
        var s = r(7392),
          c = r(7293);
        n.exports =
          !!Object.getOwnPropertySymbols &&
          !c(function () {
            var l = Symbol();
            return (
              !String(l) ||
              !(Object(l) instanceof Symbol) ||
              (!Symbol.sham && s && s < 41)
            );
          });
      },
      261: (n, a, r) => {
        var s = r(7854),
          c = r(2104),
          l = r(9974),
          u = r(614),
          f = r(2597),
          p = r(7293),
          d = r(490),
          h = r(206),
          m = r(317),
          v = r(8053),
          g = r(6833),
          y = r(5268),
          S = s.setImmediate,
          b = s.clearImmediate,
          A = s.process,
          E = s.Dispatch,
          w = s.Function,
          x = s.MessageChannel,
          C = s.String,
          D = 0,
          T = {},
          O = "onreadystatechange",
          N,
          I,
          P,
          R;
        p(function () {
          N = s.location;
        });
        var M = function (j) {
            if (f(T, j)) {
              var B = T[j];
              delete T[j], B();
            }
          },
          F = function (j) {
            return function () {
              M(j);
            };
          },
          k = function (j) {
            M(j.data);
          },
          G = function (j) {
            s.postMessage(C(j), N.protocol + "//" + N.host);
          };
        (!S || !b) &&
          ((S = function (B) {
            v(arguments.length, 1);
            var Z = u(B) ? B : w(B),
              z = h(arguments, 1);
            return (
              (T[++D] = function () {
                c(Z, void 0, z);
              }),
              I(D),
              D
            );
          }),
          (b = function (B) {
            delete T[B];
          }),
          y
            ? (I = function (j) {
                A.nextTick(F(j));
              })
            : E && E.now
            ? (I = function (j) {
                E.now(F(j));
              })
            : x && !g
            ? ((P = new x()),
              (R = P.port2),
              (P.port1.onmessage = k),
              (I = l(R.postMessage, R)))
            : s.addEventListener &&
              u(s.postMessage) &&
              !s.importScripts &&
              N &&
              N.protocol !== "file:" &&
              !p(G)
            ? ((I = G), s.addEventListener("message", k, !1))
            : O in m("script")
            ? (I = function (j) {
                d.appendChild(m("script"))[O] = function () {
                  d.removeChild(this), M(j);
                };
              })
            : (I = function (j) {
                setTimeout(F(j), 0);
              })),
          (n.exports = { set: S, clear: b });
      },
      1400: (n, a, r) => {
        var s = r(9303),
          c = Math.max,
          l = Math.min;
        n.exports = function (u, f) {
          var p = s(u);
          return p < 0 ? c(p + f, 0) : l(p, f);
        };
      },
      5656: (n, a, r) => {
        var s = r(8361),
          c = r(4488);
        n.exports = function (l) {
          return s(c(l));
        };
      },
      9303: (n, a, r) => {
        var s = r(4758);
        n.exports = function (c) {
          var l = +c;
          return l !== l || l === 0 ? 0 : s(l);
        };
      },
      7466: (n, a, r) => {
        var s = r(9303),
          c = Math.min;
        n.exports = function (l) {
          return l > 0 ? c(s(l), 9007199254740991) : 0;
        };
      },
      7908: (n, a, r) => {
        var s = r(4488),
          c = Object;
        n.exports = function (l) {
          return c(s(l));
        };
      },
      7593: (n, a, r) => {
        var s = r(6916),
          c = r(111),
          l = r(2190),
          u = r(8173),
          f = r(2140),
          p = r(5112),
          d = TypeError,
          h = p("toPrimitive");
        n.exports = function (m, v) {
          if (!c(m) || l(m)) return m;
          var g = u(m, h),
            y;
          if (g) {
            if (
              (v === void 0 && (v = "default"), (y = s(g, m, v)), !c(y) || l(y))
            )
              return y;
            throw d("Can't convert object to primitive value");
          }
          return v === void 0 && (v = "number"), f(m, v);
        };
      },
      4948: (n, a, r) => {
        var s = r(7593),
          c = r(2190);
        n.exports = function (l) {
          var u = s(l, "string");
          return c(u) ? u : u + "";
        };
      },
      1694: (n, a, r) => {
        var s = r(5112),
          c = s("toStringTag"),
          l = {};
        (l[c] = "z"), (n.exports = String(l) === "[object z]");
      },
      1340: (n, a, r) => {
        var s = r(648),
          c = String;
        n.exports = function (l) {
          if (s(l) === "Symbol")
            throw TypeError("Cannot convert a Symbol value to a string");
          return c(l);
        };
      },
      6330: (n) => {
        var a = String;
        n.exports = function (r) {
          try {
            return a(r);
          } catch {
            return "Object";
          }
        };
      },
      9711: (n, a, r) => {
        var s = r(1702),
          c = 0,
          l = Math.random(),
          u = s((1).toString);
        n.exports = function (f) {
          return "Symbol(" + (f === void 0 ? "" : f) + ")_" + u(++c + l, 36);
        };
      },
      3307: (n, a, r) => {
        var s = r(6293);
        n.exports = s && !Symbol.sham && typeof Symbol.iterator == "symbol";
      },
      3353: (n, a, r) => {
        var s = r(9781),
          c = r(7293);
        n.exports =
          s &&
          c(function () {
            return (
              Object.defineProperty(function () {}, "prototype", {
                value: 42,
                writable: !1,
              }).prototype != 42
            );
          });
      },
      8053: (n) => {
        var a = TypeError;
        n.exports = function (r, s) {
          if (r < s) throw a("Not enough arguments");
          return r;
        };
      },
      4811: (n, a, r) => {
        var s = r(7854),
          c = r(614),
          l = s.WeakMap;
        n.exports = c(l) && /native code/.test(String(l));
      },
      5112: (n, a, r) => {
        var s = r(7854),
          c = r(2309),
          l = r(2597),
          u = r(9711),
          f = r(6293),
          p = r(3307),
          d = s.Symbol,
          h = c("wks"),
          m = p ? d.for || d : (d && d.withoutSetter) || u;
        n.exports = function (v) {
          return (
            l(h, v) || (h[v] = f && l(d, v) ? d[v] : m("Symbol." + v)), h[v]
          );
        };
      },
      9191: (n, a, r) => {
        var s = r(5005),
          c = r(2597),
          l = r(8880),
          u = r(7976),
          f = r(7674),
          p = r(9920),
          d = r(2626),
          h = r(9587),
          m = r(6277),
          v = r(8340),
          g = r(5392),
          y = r(9781),
          S = r(1913);
        n.exports = function (b, A, E, w) {
          var x = "stackTraceLimit",
            C = w ? 2 : 1,
            D = b.split("."),
            T = D[D.length - 1],
            O = s.apply(null, D);
          if (!!O) {
            var N = O.prototype;
            if ((!S && c(N, "cause") && delete N.cause, !E)) return O;
            var I = s("Error"),
              P = A(function (R, M) {
                var F = m(w ? M : R, void 0),
                  k = w ? new O(R) : new O();
                return (
                  F !== void 0 && l(k, "message", F),
                  g(k, P, k.stack, 2),
                  this && u(N, this) && h(k, this, P),
                  arguments.length > C && v(k, arguments[C]),
                  k
                );
              });
            if (
              ((P.prototype = N),
              T !== "Error"
                ? f
                  ? f(P, I)
                  : p(P, I, { name: !0 })
                : y && x in O && (d(P, O, x), d(P, O, "prepareStackTrace")),
              p(P, O),
              !S)
            )
              try {
                N.name !== T && l(N, "name", T), (N.constructor = P);
              } catch {}
            return P;
          }
        };
      },
      1703: (n, a, r) => {
        var s = r(2109),
          c = r(7854),
          l = r(2104),
          u = r(9191),
          f = "WebAssembly",
          p = c[f],
          d = Error("e", { cause: 7 }).cause !== 7,
          h = function (v, g) {
            var y = {};
            (y[v] = u(v, g, d)),
              s({ global: !0, constructor: !0, arity: 1, forced: d }, y);
          },
          m = function (v, g) {
            if (p && p[v]) {
              var y = {};
              (y[v] = u(f + "." + v, g, d)),
                s(
                  { target: f, stat: !0, constructor: !0, arity: 1, forced: d },
                  y
                );
            }
          };
        h("Error", function (v) {
          return function (y) {
            return l(v, this, arguments);
          };
        }),
          h("EvalError", function (v) {
            return function (y) {
              return l(v, this, arguments);
            };
          }),
          h("RangeError", function (v) {
            return function (y) {
              return l(v, this, arguments);
            };
          }),
          h("ReferenceError", function (v) {
            return function (y) {
              return l(v, this, arguments);
            };
          }),
          h("SyntaxError", function (v) {
            return function (y) {
              return l(v, this, arguments);
            };
          }),
          h("TypeError", function (v) {
            return function (y) {
              return l(v, this, arguments);
            };
          }),
          h("URIError", function (v) {
            return function (y) {
              return l(v, this, arguments);
            };
          }),
          m("CompileError", function (v) {
            return function (y) {
              return l(v, this, arguments);
            };
          }),
          m("LinkError", function (v) {
            return function (y) {
              return l(v, this, arguments);
            };
          }),
          m("RuntimeError", function (v) {
            return function (y) {
              return l(v, this, arguments);
            };
          });
      },
      8862: (n, a, r) => {
        var s = r(2109),
          c = r(5005),
          l = r(2104),
          u = r(6916),
          f = r(1702),
          p = r(7293),
          d = r(614),
          h = r(2190),
          m = r(206),
          v = r(8044),
          g = r(6293),
          y = String,
          S = c("JSON", "stringify"),
          b = f(/./.exec),
          A = f("".charAt),
          E = f("".charCodeAt),
          w = f("".replace),
          x = f((1).toString),
          C = /[\uD800-\uDFFF]/g,
          D = /^[\uD800-\uDBFF]$/,
          T = /^[\uDC00-\uDFFF]$/,
          O =
            !g ||
            p(function () {
              var R = c("Symbol")();
              return (
                S([R]) != "[null]" ||
                S({ a: R }) != "{}" ||
                S(Object(R)) != "{}"
              );
            }),
          N = p(function () {
            return (
              S("\uDF06\uD834") !== '"\\udf06\\ud834"' ||
              S("\uDEAD") !== '"\\udead"'
            );
          }),
          I = function (R, M) {
            var F = m(arguments),
              k = v(M);
            if (!(!d(k) && (R === void 0 || h(R))))
              return (
                (F[1] = function (G, j) {
                  if ((d(k) && (j = u(k, this, y(G), j)), !h(j))) return j;
                }),
                l(S, null, F)
              );
          },
          P = function (R, M, F) {
            var k = A(F, M - 1),
              G = A(F, M + 1);
            return (b(D, R) && !b(T, G)) || (b(T, R) && !b(D, k))
              ? "\\u" + x(E(R, 0), 16)
              : R;
          };
        S &&
          s(
            { target: "JSON", stat: !0, arity: 3, forced: O || N },
            {
              stringify: function (M, F, k) {
                var G = m(arguments),
                  j = l(O ? I : S, null, G);
                return N && typeof j == "string" ? w(j, C, P) : j;
              },
            }
          );
      },
      9070: (n, a, r) => {
        var s = r(2109),
          c = r(9781),
          l = r(3070).f;
        s(
          {
            target: "Object",
            stat: !0,
            forced: Object.defineProperty !== l,
            sham: !c,
          },
          { defineProperty: l }
        );
      },
      7941: (n, a, r) => {
        var s = r(2109),
          c = r(7908),
          l = r(1956),
          u = r(7293),
          f = u(function () {
            l(1);
          });
        s(
          { target: "Object", stat: !0, forced: f },
          {
            keys: function (d) {
              return l(c(d));
            },
          }
        );
      },
      1539: (n, a, r) => {
        var s = r(1694),
          c = r(8052),
          l = r(288);
        s || c(Object.prototype, "toString", l, { unsafe: !0 });
      },
      821: (n, a, r) => {
        var s = r(2109),
          c = r(6916),
          l = r(9662),
          u = r(8523),
          f = r(2534),
          p = r(408),
          d = r(612);
        s(
          { target: "Promise", stat: !0, forced: d },
          {
            all: function (m) {
              var v = this,
                g = u.f(v),
                y = g.resolve,
                S = g.reject,
                b = f(function () {
                  var A = l(v.resolve),
                    E = [],
                    w = 0,
                    x = 1;
                  p(m, function (C) {
                    var D = w++,
                      T = !1;
                    x++,
                      c(A, v, C).then(function (O) {
                        T || ((T = !0), (E[D] = O), --x || y(E));
                      }, S);
                  }),
                    --x || y(E);
                });
              return b.error && S(b.value), g.promise;
            },
          }
        );
      },
      4164: (n, a, r) => {
        var s = r(2109),
          c = r(1913),
          l = r(3702).CONSTRUCTOR,
          u = r(2492),
          f = r(5005),
          p = r(614),
          d = r(8052),
          h = u && u.prototype;
        if (
          (s(
            { target: "Promise", proto: !0, forced: l, real: !0 },
            {
              catch: function (v) {
                return this.then(void 0, v);
              },
            }
          ),
          !c && p(u))
        ) {
          var m = f("Promise").prototype.catch;
          h.catch !== m && d(h, "catch", m, { unsafe: !0 });
        }
      },
      3401: (n, a, r) => {
        var s = r(2109),
          c = r(1913),
          l = r(5268),
          u = r(7854),
          f = r(6916),
          p = r(8052),
          d = r(7674),
          h = r(8003),
          m = r(6340),
          v = r(9662),
          g = r(614),
          y = r(111),
          S = r(5787),
          b = r(6707),
          A = r(261).set,
          E = r(5948),
          w = r(842),
          x = r(2534),
          C = r(8572),
          D = r(9909),
          T = r(2492),
          O = r(3702),
          N = r(8523),
          I = "Promise",
          P = O.CONSTRUCTOR,
          R = O.REJECTION_EVENT,
          M = O.SUBCLASSING,
          F = D.getterFor(I),
          k = D.set,
          G = T && T.prototype,
          j = T,
          B = G,
          Z = u.TypeError,
          z = u.document,
          J = u.process,
          q = N.f,
          Q = q,
          W = !!(z && z.createEvent && u.dispatchEvent),
          tt = "unhandledrejection",
          ft = "rejectionhandled",
          nt = 0,
          it = 1,
          Y = 2,
          H = 1,
          et = 2,
          rt,
          wt,
          tr,
          Ae,
          gt = function (L) {
            var V;
            return y(L) && g((V = L.then)) ? V : !1;
          },
          $t = function (L, V) {
            var K = V.value,
              U = V.state == it,
              X = U ? L.ok : L.fail,
              Wt = L.resolve,
              Ce = L.reject,
              Kt = L.domain,
              Ut,
              Kr,
              Ur;
            try {
              X
                ? (U || (V.rejection === et && _e(V), (V.rejection = H)),
                  X === !0
                    ? (Ut = K)
                    : (Kt && Kt.enter(),
                      (Ut = X(K)),
                      Kt && (Kt.exit(), (Ur = !0))),
                  Ut === L.promise
                    ? Ce(Z("Promise-chain cycle"))
                    : (Kr = gt(Ut))
                    ? f(Kr, Ut, Wt, Ce)
                    : Wt(Ut))
                : Ce(K);
            } catch (Bo) {
              Kt && !Ur && Kt.exit(), Ce(Bo);
            }
          },
          le = function (L, V) {
            L.notified ||
              ((L.notified = !0),
              E(function () {
                for (var K = L.reactions, U; (U = K.get()); ) $t(U, L);
                (L.notified = !1), V && !L.rejection && fe(L);
              }));
          },
          ue = function (L, V, K) {
            var U, X;
            W
              ? ((U = z.createEvent("Event")),
                (U.promise = V),
                (U.reason = K),
                U.initEvent(L, !1, !0),
                u.dispatchEvent(U))
              : (U = { promise: V, reason: K }),
              !R && (X = u["on" + L])
                ? X(U)
                : L === tt && w("Unhandled promise rejection", K);
          },
          fe = function (L) {
            f(A, u, function () {
              var V = L.facade,
                K = L.value,
                U = de(L),
                X;
              if (
                U &&
                ((X = x(function () {
                  l ? J.emit("unhandledRejection", K, V) : ue(tt, V, K);
                })),
                (L.rejection = l || de(L) ? et : H),
                X.error)
              )
                throw X.value;
            });
          },
          de = function (L) {
            return L.rejection !== H && !L.parent;
          },
          _e = function (L) {
            f(A, u, function () {
              var V = L.facade;
              l ? J.emit("rejectionHandled", V) : ue(ft, V, L.value);
            });
          },
          Tt = function (L, V, K) {
            return function (U) {
              L(V, U, K);
            };
          },
          St = function (L, V, K) {
            L.done ||
              ((L.done = !0),
              K && (L = K),
              (L.value = V),
              (L.state = Y),
              le(L, !0));
          },
          er = function (L, V, K) {
            if (!L.done) {
              (L.done = !0), K && (L = K);
              try {
                if (L.facade === V) throw Z("Promise can't be resolved itself");
                var U = gt(V);
                U
                  ? E(function () {
                      var X = { done: !1 };
                      try {
                        f(U, V, Tt(er, X, L), Tt(St, X, L));
                      } catch (Wt) {
                        St(X, Wt, L);
                      }
                    })
                  : ((L.value = V), (L.state = it), le(L, !1));
              } catch (X) {
                St({ done: !1 }, X, L);
              }
            }
          };
        if (
          P &&
          ((j = function (V) {
            S(this, B), v(V), f(rt, this);
            var K = F(this);
            try {
              V(Tt(er, K), Tt(St, K));
            } catch (U) {
              St(K, U);
            }
          }),
          (B = j.prototype),
          (rt = function (V) {
            k(this, {
              type: I,
              done: !1,
              notified: !1,
              parent: !1,
              reactions: new C(),
              rejection: !1,
              state: nt,
              value: void 0,
            });
          }),
          (rt.prototype = p(B, "then", function (V, K) {
            var U = F(this),
              X = q(b(this, j));
            return (
              (U.parent = !0),
              (X.ok = g(V) ? V : !0),
              (X.fail = g(K) && K),
              (X.domain = l ? J.domain : void 0),
              U.state == nt
                ? U.reactions.add(X)
                : E(function () {
                    $t(X, U);
                  }),
              X.promise
            );
          })),
          (wt = function () {
            var L = new rt(),
              V = F(L);
            (this.promise = L),
              (this.resolve = Tt(er, V)),
              (this.reject = Tt(St, V));
          }),
          (N.f = q =
            function (L) {
              return L === j || L === tr ? new wt(L) : Q(L);
            }),
          !c && g(T) && G !== Object.prototype)
        ) {
          (Ae = G.then),
            M ||
              p(
                G,
                "then",
                function (V, K) {
                  var U = this;
                  return new j(function (X, Wt) {
                    f(Ae, U, X, Wt);
                  }).then(V, K);
                },
                { unsafe: !0 }
              );
          try {
            delete G.constructor;
          } catch {}
          d && d(G, B);
        }
        s({ global: !0, constructor: !0, wrap: !0, forced: P }, { Promise: j }),
          h(j, I, !1, !0),
          m(I);
      },
      8674: (n, a, r) => {
        r(3401), r(821), r(4164), r(6027), r(683), r(6294);
      },
      6027: (n, a, r) => {
        var s = r(2109),
          c = r(6916),
          l = r(9662),
          u = r(8523),
          f = r(2534),
          p = r(408),
          d = r(612);
        s(
          { target: "Promise", stat: !0, forced: d },
          {
            race: function (m) {
              var v = this,
                g = u.f(v),
                y = g.reject,
                S = f(function () {
                  var b = l(v.resolve);
                  p(m, function (A) {
                    c(b, v, A).then(g.resolve, y);
                  });
                });
              return S.error && y(S.value), g.promise;
            },
          }
        );
      },
      683: (n, a, r) => {
        var s = r(2109),
          c = r(6916),
          l = r(8523),
          u = r(3702).CONSTRUCTOR;
        s(
          { target: "Promise", stat: !0, forced: u },
          {
            reject: function (p) {
              var d = l.f(this);
              return c(d.reject, void 0, p), d.promise;
            },
          }
        );
      },
      6294: (n, a, r) => {
        var s = r(2109),
          c = r(5005),
          l = r(1913),
          u = r(2492),
          f = r(3702).CONSTRUCTOR,
          p = r(9478),
          d = c("Promise"),
          h = l && !f;
        s(
          { target: "Promise", stat: !0, forced: l || f },
          {
            resolve: function (v) {
              return p(h && this === d ? u : this, v);
            },
          }
        );
      },
      4747: (n, a, r) => {
        var s = r(7854),
          c = r(8324),
          l = r(8509),
          u = r(8533),
          f = r(8880),
          p = function (h) {
            if (h && h.forEach !== u)
              try {
                f(h, "forEach", u);
              } catch {
                h.forEach = u;
              }
          };
        for (var d in c) c[d] && p(s[d] && s[d].prototype);
        p(l);
      },
    },
    t = {};
  function e(n) {
    var a = t[n];
    if (a !== void 0) return a.exports;
    var r = (t[n] = { exports: {} });
    return o[n](r, r.exports, e), r.exports;
  }
  (e.d = (n, a) => {
    for (var r in a)
      e.o(a, r) &&
        !e.o(n, r) &&
        Object.defineProperty(n, r, { enumerable: !0, get: a[r] });
  }),
    (e.g = (function () {
      if (typeof globalThis == "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch {
        if (typeof window == "object") return window;
      }
    })()),
    (e.o = (n, a) => Object.prototype.hasOwnProperty.call(n, a)),
    (e.r = (n) => {
      typeof Symbol != "undefined" &&
        Symbol.toStringTag &&
        Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(n, "__esModule", { value: !0 });
    });
  var i = {};
  (() => {
    e.r(i),
      e.d(i, {
        default: () => m,
        init: () => a,
        send: () => p,
        sendForm: () => h,
      });
    var n = { _origin: "https://api.emailjs.com" },
      a = function (g) {
        var y =
          arguments.length > 1 && arguments[1] !== void 0
            ? arguments[1]
            : "https://api.emailjs.com";
        (n._userID = g), (n._origin = y);
      };
    e(8862);
    var r = function (g, y, S) {
      if (!g)
        throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
      if (!y)
        throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
      if (!S)
        throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
      return !0;
    };
    e(1539), e(8674), e(4747), e(7941), e(1703), e(9070);
    function s(v, g) {
      for (var y = 0; y < g.length; y++) {
        var S = g[y];
        (S.enumerable = S.enumerable || !1),
          (S.configurable = !0),
          "value" in S && (S.writable = !0),
          Object.defineProperty(v, S.key, S);
      }
    }
    function c(v, g, y) {
      return g && s(v.prototype, g), y && s(v, y), v;
    }
    function l(v, g) {
      if (!(v instanceof g))
        throw new TypeError("Cannot call a class as a function");
    }
    var u = c(function v(g) {
        l(this, v),
          (this.status = g ? g.status : 0),
          (this.text = g ? g.responseText : "Network Error");
      }),
      f = function (g, y) {
        var S =
          arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return new Promise(function (b, A) {
          var E = new XMLHttpRequest();
          E.addEventListener("load", function (w) {
            var x = w.target,
              C = new u(x);
            C.status === 200 || C.text === "OK" ? b(C) : A(C);
          }),
            E.addEventListener("error", function (w) {
              var x = w.target;
              A(new u(x));
            }),
            E.open("POST", n._origin + g, !0),
            Object.keys(S).forEach(function (w) {
              E.setRequestHeader(w, S[w]);
            }),
            E.send(y);
        });
      },
      p = function (g, y, S, b) {
        var A = b || n._userID;
        r(A, g, y);
        var E = {
          lib_version: "3.11.0",
          user_id: A,
          service_id: g,
          template_id: y,
          template_params: S,
        };
        return f("/api/v1.0/email/send", JSON.stringify(E), {
          "Content-type": "application/json",
        });
      },
      d = function (g) {
        var y;
        if (
          (typeof g == "string" ? (y = document.querySelector(g)) : (y = g),
          !y || y.nodeName !== "FORM")
        )
          throw "The 3rd parameter is expected to be the HTML form element or the style selector of form";
        return y;
      },
      h = function (g, y, S, b) {
        var A = b || n._userID,
          E = d(S);
        r(A, g, y);
        var w = new FormData(E);
        return (
          w.append("lib_version", "3.11.0"),
          w.append("service_id", g),
          w.append("template_id", y),
          w.append("user_id", A),
          f("/api/v1.0/email/send-form", w)
        );
      };
    const m = { init: a, send: p, sendForm: h };
  })(),
    (self.emailjs = i);
})();
const jo = document.querySelector("#contact_form"),
  Be = document.querySelector("#name"),
  He = document.querySelector("#email"),
  We = document.querySelector("#subject"),
  ye = document.querySelector("#message"),
  ko = document.querySelector("#send"),
  Ql = document.querySelector(".thanks"),
  $n = document.querySelector(".spinner-border"),
  Jl = document.querySelector(".valid-feedback"),
  Vo =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  Mn = "is-invalid",
  _r = "is-valid";
function Ze(o, t) {
  const e = o.target;
  t
    ? (e.classList.add(_r), e.classList.remove(Mn))
    : (e.classList.add(Mn), e.classList.remove(_r));
}
Be.addEventListener("keyup", (o) => {
  Ze(o, o.target.value.length > 1), qe();
});
He.addEventListener("keyup", (o) => {
  Ze(o, !!o.target.value.match(Vo)), qe();
});
We.addEventListener("keyup", (o) => {
  Ze(o, o.target.value.length > 2), qe();
});
ye.addEventListener("keyup", (o) => {
  Ze(o, o.target.value.split(" ").length > 5),
    qe(),
    (Jl.textContent = `${ye.value.length} / 400`);
});
function qe() {
  ko.disabled = !(
    Be.value.length > 1 &&
    He.value.match(Vo) &&
    We.value.length > 2 &&
    ye.value.split(" ").length > 5
  );
}
const Zl = {}.VITE_EMAILJS_ID,
  ql = {}.VITE_CONTACT_SERVICE,
  tu = {}.VITE_TEMPLATE_ID,
  eu = {}.VITE_IP_API_KEY,
  ru = `https://api.ipregistry.co/?key=${eu}`,
  nu = "https://api.emailjs.com/api/v1.0/email/send";
async function ou(o) {
  o.preventDefault(),
    (ko.style.display = "none"),
    ($n.style.display = "inline-block");
  let t;
  await fetch(ru)
    .then((i) => i.json())
    .then(
      (i) =>
        (t = `${i.location.country.flag.emoji} ${i.location.city}, ${i.location.latitude} ${i.location.longitude}`)
    );
  var e = {
    service_id: ql,
    template_id: tu,
    user_id: Zl,
    template_params: {
      location: String(t),
      name: Be.value,
      email: He.value,
      subject: We.value,
      message: ye.value,
    },
  };
  await fetch(nu, {
    method: "POST",
    body: JSON.stringify(e),
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then(function () {
      ($n.style.display = "none"),
        (Ql.style.display = "block"),
        o.target.reset(),
        [Be, He, We, ye].forEach((i) => {
          i.classList.remove(_r);
        });
    })
    .catch(function (i) {
      alert("Something went wrong!! Please try again.");
    });
}
jo.addEventListener("submit", ou);
jo.reset();
var su =
  typeof globalThis != "undefined"
    ? globalThis
    : typeof window != "undefined"
    ? window
    : typeof global != "undefined"
    ? global
    : typeof self != "undefined"
    ? self
    : {};
function iu(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default")
    ? o.default
    : o;
}
var Fo = { exports: {} };
(function (o, t) {
  (function (e, i) {
    o.exports = i();
  })(su, function () {
    return (function (e) {
      function i(a) {
        if (n[a]) return n[a].exports;
        var r = (n[a] = { exports: {}, id: a, loaded: !1 });
        return (
          e[a].call(r.exports, r, r.exports, i), (r.loaded = !0), r.exports
        );
      }
      var n = {};
      return (i.m = e), (i.c = n), (i.p = "dist/"), i(0);
    })([
      function (e, i, n) {
        function a(I) {
          return I && I.__esModule ? I : { default: I };
        }
        var r =
            Object.assign ||
            function (I) {
              for (var P = 1; P < arguments.length; P++) {
                var R = arguments[P];
                for (var M in R)
                  Object.prototype.hasOwnProperty.call(R, M) && (I[M] = R[M]);
              }
              return I;
            },
          s = n(1),
          c = (a(s), n(6)),
          l = a(c),
          u = n(7),
          f = a(u),
          p = n(8),
          d = a(p),
          h = n(9),
          m = a(h),
          v = n(10),
          g = a(v),
          y = n(11),
          S = a(y),
          b = n(14),
          A = a(b),
          E = [],
          w = !1,
          x = {
            offset: 120,
            delay: 0,
            easing: "ease",
            duration: 400,
            disable: !1,
            once: !1,
            startEvent: "DOMContentLoaded",
            throttleDelay: 99,
            debounceDelay: 50,
            disableMutationObserver: !1,
          },
          C = function () {
            var I =
              arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
            if ((I && (w = !0), w))
              return (E = (0, S.default)(E, x)), (0, g.default)(E, x.once), E;
          },
          D = function () {
            (E = (0, A.default)()), C();
          },
          T = function () {
            E.forEach(function (I, P) {
              I.node.removeAttribute("data-aos"),
                I.node.removeAttribute("data-aos-easing"),
                I.node.removeAttribute("data-aos-duration"),
                I.node.removeAttribute("data-aos-delay");
            });
          },
          O = function (I) {
            return (
              I === !0 ||
              (I === "mobile" && m.default.mobile()) ||
              (I === "phone" && m.default.phone()) ||
              (I === "tablet" && m.default.tablet()) ||
              (typeof I == "function" && I() === !0)
            );
          },
          N = function (I) {
            (x = r(x, I)), (E = (0, A.default)());
            var P = document.all && !window.atob;
            return O(x.disable) || P
              ? T()
              : (x.disableMutationObserver ||
                  d.default.isSupported() ||
                  (console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),
                  (x.disableMutationObserver = !0)),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-easing", x.easing),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-duration", x.duration),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-delay", x.delay),
                x.startEvent === "DOMContentLoaded" &&
                ["complete", "interactive"].indexOf(document.readyState) > -1
                  ? C(!0)
                  : x.startEvent === "load"
                  ? window.addEventListener(x.startEvent, function () {
                      C(!0);
                    })
                  : document.addEventListener(x.startEvent, function () {
                      C(!0);
                    }),
                window.addEventListener(
                  "resize",
                  (0, f.default)(C, x.debounceDelay, !0)
                ),
                window.addEventListener(
                  "orientationchange",
                  (0, f.default)(C, x.debounceDelay, !0)
                ),
                window.addEventListener(
                  "scroll",
                  (0, l.default)(function () {
                    (0, g.default)(E, x.once);
                  }, x.throttleDelay)
                ),
                x.disableMutationObserver || d.default.ready("[data-aos]", D),
                E);
          };
        e.exports = { init: N, refresh: C, refreshHard: D };
      },
      function (e, i) {},
      ,
      ,
      ,
      ,
      function (e, i) {
        (function (n) {
          function a(O, N, I) {
            function P(H) {
              var et = z,
                rt = J;
              return (z = J = void 0), (ft = H), (Q = O.apply(rt, et));
            }
            function R(H) {
              return (ft = H), (W = setTimeout(k, N)), nt ? P(H) : Q;
            }
            function M(H) {
              var et = H - tt,
                rt = H - ft,
                wt = N - et;
              return it ? D(wt, q - rt) : wt;
            }
            function F(H) {
              var et = H - tt,
                rt = H - ft;
              return tt === void 0 || et >= N || et < 0 || (it && rt >= q);
            }
            function k() {
              var H = T();
              return F(H) ? G(H) : void (W = setTimeout(k, M(H)));
            }
            function G(H) {
              return (W = void 0), Y && z ? P(H) : ((z = J = void 0), Q);
            }
            function j() {
              W !== void 0 && clearTimeout(W),
                (ft = 0),
                (z = tt = J = W = void 0);
            }
            function B() {
              return W === void 0 ? Q : G(T());
            }
            function Z() {
              var H = T(),
                et = F(H);
              if (((z = arguments), (J = this), (tt = H), et)) {
                if (W === void 0) return R(tt);
                if (it) return (W = setTimeout(k, N)), P(tt);
              }
              return W === void 0 && (W = setTimeout(k, N)), Q;
            }
            var z,
              J,
              q,
              Q,
              W,
              tt,
              ft = 0,
              nt = !1,
              it = !1,
              Y = !0;
            if (typeof O != "function") throw new TypeError(p);
            return (
              (N = u(N) || 0),
              s(I) &&
                ((nt = !!I.leading),
                (it = "maxWait" in I),
                (q = it ? C(u(I.maxWait) || 0, N) : q),
                (Y = "trailing" in I ? !!I.trailing : Y)),
              (Z.cancel = j),
              (Z.flush = B),
              Z
            );
          }
          function r(O, N, I) {
            var P = !0,
              R = !0;
            if (typeof O != "function") throw new TypeError(p);
            return (
              s(I) &&
                ((P = "leading" in I ? !!I.leading : P),
                (R = "trailing" in I ? !!I.trailing : R)),
              a(O, N, { leading: P, maxWait: N, trailing: R })
            );
          }
          function s(O) {
            var N = typeof O == "undefined" ? "undefined" : f(O);
            return !!O && (N == "object" || N == "function");
          }
          function c(O) {
            return (
              !!O && (typeof O == "undefined" ? "undefined" : f(O)) == "object"
            );
          }
          function l(O) {
            return (
              (typeof O == "undefined" ? "undefined" : f(O)) == "symbol" ||
              (c(O) && x.call(O) == h)
            );
          }
          function u(O) {
            if (typeof O == "number") return O;
            if (l(O)) return d;
            if (s(O)) {
              var N = typeof O.valueOf == "function" ? O.valueOf() : O;
              O = s(N) ? N + "" : N;
            }
            if (typeof O != "string") return O === 0 ? O : +O;
            O = O.replace(m, "");
            var I = g.test(O);
            return I || y.test(O)
              ? S(O.slice(2), I ? 2 : 8)
              : v.test(O)
              ? d
              : +O;
          }
          var f =
              typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                ? function (O) {
                    return typeof O;
                  }
                : function (O) {
                    return O &&
                      typeof Symbol == "function" &&
                      O.constructor === Symbol &&
                      O !== Symbol.prototype
                      ? "symbol"
                      : typeof O;
                  },
            p = "Expected a function",
            d = NaN,
            h = "[object Symbol]",
            m = /^\s+|\s+$/g,
            v = /^[-+]0x[0-9a-f]+$/i,
            g = /^0b[01]+$/i,
            y = /^0o[0-7]+$/i,
            S = parseInt,
            b =
              (typeof n == "undefined" ? "undefined" : f(n)) == "object" &&
              n &&
              n.Object === Object &&
              n,
            A =
              (typeof self == "undefined" ? "undefined" : f(self)) ==
                "object" &&
              self &&
              self.Object === Object &&
              self,
            E = b || A || Function("return this")(),
            w = Object.prototype,
            x = w.toString,
            C = Math.max,
            D = Math.min,
            T = function () {
              return E.Date.now();
            };
          e.exports = r;
        }).call(
          i,
          (function () {
            return this;
          })()
        );
      },
      function (e, i) {
        (function (n) {
          function a(T, O, N) {
            function I(Y) {
              var H = Z,
                et = z;
              return (Z = z = void 0), (tt = Y), (q = T.apply(et, H));
            }
            function P(Y) {
              return (tt = Y), (Q = setTimeout(F, O)), ft ? I(Y) : q;
            }
            function R(Y) {
              var H = Y - W,
                et = Y - tt,
                rt = O - H;
              return nt ? C(rt, J - et) : rt;
            }
            function M(Y) {
              var H = Y - W,
                et = Y - tt;
              return W === void 0 || H >= O || H < 0 || (nt && et >= J);
            }
            function F() {
              var Y = D();
              return M(Y) ? k(Y) : void (Q = setTimeout(F, R(Y)));
            }
            function k(Y) {
              return (Q = void 0), it && Z ? I(Y) : ((Z = z = void 0), q);
            }
            function G() {
              Q !== void 0 && clearTimeout(Q),
                (tt = 0),
                (Z = W = z = Q = void 0);
            }
            function j() {
              return Q === void 0 ? q : k(D());
            }
            function B() {
              var Y = D(),
                H = M(Y);
              if (((Z = arguments), (z = this), (W = Y), H)) {
                if (Q === void 0) return P(W);
                if (nt) return (Q = setTimeout(F, O)), I(W);
              }
              return Q === void 0 && (Q = setTimeout(F, O)), q;
            }
            var Z,
              z,
              J,
              q,
              Q,
              W,
              tt = 0,
              ft = !1,
              nt = !1,
              it = !0;
            if (typeof T != "function") throw new TypeError(f);
            return (
              (O = l(O) || 0),
              r(N) &&
                ((ft = !!N.leading),
                (nt = "maxWait" in N),
                (J = nt ? x(l(N.maxWait) || 0, O) : J),
                (it = "trailing" in N ? !!N.trailing : it)),
              (B.cancel = G),
              (B.flush = j),
              B
            );
          }
          function r(T) {
            var O = typeof T == "undefined" ? "undefined" : u(T);
            return !!T && (O == "object" || O == "function");
          }
          function s(T) {
            return (
              !!T && (typeof T == "undefined" ? "undefined" : u(T)) == "object"
            );
          }
          function c(T) {
            return (
              (typeof T == "undefined" ? "undefined" : u(T)) == "symbol" ||
              (s(T) && w.call(T) == d)
            );
          }
          function l(T) {
            if (typeof T == "number") return T;
            if (c(T)) return p;
            if (r(T)) {
              var O = typeof T.valueOf == "function" ? T.valueOf() : T;
              T = r(O) ? O + "" : O;
            }
            if (typeof T != "string") return T === 0 ? T : +T;
            T = T.replace(h, "");
            var N = v.test(T);
            return N || g.test(T)
              ? y(T.slice(2), N ? 2 : 8)
              : m.test(T)
              ? p
              : +T;
          }
          var u =
              typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                ? function (T) {
                    return typeof T;
                  }
                : function (T) {
                    return T &&
                      typeof Symbol == "function" &&
                      T.constructor === Symbol &&
                      T !== Symbol.prototype
                      ? "symbol"
                      : typeof T;
                  },
            f = "Expected a function",
            p = NaN,
            d = "[object Symbol]",
            h = /^\s+|\s+$/g,
            m = /^[-+]0x[0-9a-f]+$/i,
            v = /^0b[01]+$/i,
            g = /^0o[0-7]+$/i,
            y = parseInt,
            S =
              (typeof n == "undefined" ? "undefined" : u(n)) == "object" &&
              n &&
              n.Object === Object &&
              n,
            b =
              (typeof self == "undefined" ? "undefined" : u(self)) ==
                "object" &&
              self &&
              self.Object === Object &&
              self,
            A = S || b || Function("return this")(),
            E = Object.prototype,
            w = E.toString,
            x = Math.max,
            C = Math.min,
            D = function () {
              return A.Date.now();
            };
          e.exports = a;
        }).call(
          i,
          (function () {
            return this;
          })()
        );
      },
      function (e, i) {
        function n(u) {
          var f = void 0,
            p = void 0;
          for (f = 0; f < u.length; f += 1)
            if (
              ((p = u[f]),
              (p.dataset && p.dataset.aos) || (p.children && n(p.children)))
            )
              return !0;
          return !1;
        }
        function a() {
          return (
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver
          );
        }
        function r() {
          return !!a();
        }
        function s(u, f) {
          var p = window.document,
            d = a(),
            h = new d(c);
          (l = f),
            h.observe(p.documentElement, {
              childList: !0,
              subtree: !0,
              removedNodes: !0,
            });
        }
        function c(u) {
          u &&
            u.forEach(function (f) {
              var p = Array.prototype.slice.call(f.addedNodes),
                d = Array.prototype.slice.call(f.removedNodes),
                h = p.concat(d);
              if (n(h)) return l();
            });
        }
        Object.defineProperty(i, "__esModule", { value: !0 });
        var l = function () {};
        i.default = { isSupported: r, ready: s };
      },
      function (e, i) {
        function n(p, d) {
          if (!(p instanceof d))
            throw new TypeError("Cannot call a class as a function");
        }
        function a() {
          return navigator.userAgent || navigator.vendor || window.opera || "";
        }
        Object.defineProperty(i, "__esModule", { value: !0 });
        var r = (function () {
            function p(d, h) {
              for (var m = 0; m < h.length; m++) {
                var v = h[m];
                (v.enumerable = v.enumerable || !1),
                  (v.configurable = !0),
                  "value" in v && (v.writable = !0),
                  Object.defineProperty(d, v.key, v);
              }
            }
            return function (d, h, m) {
              return h && p(d.prototype, h), m && p(d, m), d;
            };
          })(),
          s =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
          c =
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
          l =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
          u =
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
          f = (function () {
            function p() {
              n(this, p);
            }
            return (
              r(p, [
                {
                  key: "phone",
                  value: function () {
                    var d = a();
                    return !(!s.test(d) && !c.test(d.substr(0, 4)));
                  },
                },
                {
                  key: "mobile",
                  value: function () {
                    var d = a();
                    return !(!l.test(d) && !u.test(d.substr(0, 4)));
                  },
                },
                {
                  key: "tablet",
                  value: function () {
                    return this.mobile() && !this.phone();
                  },
                },
              ]),
              p
            );
          })();
        i.default = new f();
      },
      function (e, i) {
        Object.defineProperty(i, "__esModule", { value: !0 });
        var n = function (r, s, c) {
            var l = r.node.getAttribute("data-aos-once");
            s > r.position
              ? r.node.classList.add("aos-animate")
              : typeof l != "undefined" &&
                (l === "false" || (!c && l !== "true")) &&
                r.node.classList.remove("aos-animate");
          },
          a = function (r, s) {
            var c = window.pageYOffset,
              l = window.innerHeight;
            r.forEach(function (u, f) {
              n(u, l + c, s);
            });
          };
        i.default = a;
      },
      function (e, i, n) {
        function a(l) {
          return l && l.__esModule ? l : { default: l };
        }
        Object.defineProperty(i, "__esModule", { value: !0 });
        var r = n(12),
          s = a(r),
          c = function (l, u) {
            return (
              l.forEach(function (f, p) {
                f.node.classList.add("aos-init"),
                  (f.position = (0, s.default)(f.node, u.offset));
              }),
              l
            );
          };
        i.default = c;
      },
      function (e, i, n) {
        function a(l) {
          return l && l.__esModule ? l : { default: l };
        }
        Object.defineProperty(i, "__esModule", { value: !0 });
        var r = n(13),
          s = a(r),
          c = function (l, u) {
            var f = 0,
              p = 0,
              d = window.innerHeight,
              h = {
                offset: l.getAttribute("data-aos-offset"),
                anchor: l.getAttribute("data-aos-anchor"),
                anchorPlacement: l.getAttribute("data-aos-anchor-placement"),
              };
            switch (
              (h.offset && !isNaN(h.offset) && (p = parseInt(h.offset)),
              h.anchor &&
                document.querySelectorAll(h.anchor) &&
                (l = document.querySelectorAll(h.anchor)[0]),
              (f = (0, s.default)(l).top),
              h.anchorPlacement)
            ) {
              case "top-bottom":
                break;
              case "center-bottom":
                f += l.offsetHeight / 2;
                break;
              case "bottom-bottom":
                f += l.offsetHeight;
                break;
              case "top-center":
                f += d / 2;
                break;
              case "bottom-center":
                f += d / 2 + l.offsetHeight;
                break;
              case "center-center":
                f += d / 2 + l.offsetHeight / 2;
                break;
              case "top-top":
                f += d;
                break;
              case "bottom-top":
                f += l.offsetHeight + d;
                break;
              case "center-top":
                f += l.offsetHeight / 2 + d;
            }
            return h.anchorPlacement || h.offset || isNaN(u) || (p = u), f + p;
          };
        i.default = c;
      },
      function (e, i) {
        Object.defineProperty(i, "__esModule", { value: !0 });
        var n = function (a) {
          for (
            var r = 0, s = 0;
            a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop);

          )
            (r += a.offsetLeft - (a.tagName != "BODY" ? a.scrollLeft : 0)),
              (s += a.offsetTop - (a.tagName != "BODY" ? a.scrollTop : 0)),
              (a = a.offsetParent);
          return { top: s, left: r };
        };
        i.default = n;
      },
      function (e, i) {
        Object.defineProperty(i, "__esModule", { value: !0 });
        var n = function (a) {
          return (
            (a = a || document.querySelectorAll("[data-aos]")),
            Array.prototype.map.call(a, function (r) {
              return { node: r };
            })
          );
        };
        i.default = n;
      },
    ]);
  });
})(Fo);
var au = iu(Fo.exports);
au.init({ once: !0 });

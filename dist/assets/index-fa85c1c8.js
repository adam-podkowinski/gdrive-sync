var We = Object.defineProperty;
var Le = (t, e, a) => (e in t ? We(t, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (t[e] = a));
var T = (t, e, a) => (Le(t, typeof e != "symbol" ? e + "" : e, a), a);
(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const s of i)
      if (s.type === "childList")
        for (const o of s.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(i) {
    const s = {};
    return (
      i.integrity && (s.integrity = i.integrity),
      i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const s = a(i);
    fetch(i.href, s);
  }
})();
function b() {}
function te(t) {
  return t();
}
function J() {
  return Object.create(null);
}
function D(t) {
  t.forEach(te);
}
function ae(t) {
  return typeof t == "function";
}
function xe(t, e) {
  return t != t ? e == e : t !== e || (t && typeof t == "object") || typeof t == "function";
}
function Ee(t) {
  return Object.keys(t).length === 0;
}
function y(t, e) {
  t.appendChild(e);
}
function Te(t, e, a) {
  t.insertBefore(e, a || null);
}
function ne(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function v(t) {
  return document.createElement(t);
}
function Ce(t) {
  return document.createTextNode(t);
}
function K() {
  return Ce(" ");
}
function Y(t, e, a, r) {
  return t.addEventListener(e, a, r), () => t.removeEventListener(e, a, r);
}
function Se(t) {
  return function (e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function f(t, e, a) {
  a == null ? t.removeAttribute(e) : t.getAttribute(e) !== a && t.setAttribute(e, a);
}
function Oe(t) {
  return Array.from(t.childNodes);
}
let k;
function P(t) {
  k = t;
}
const _ = [],
  Q = [];
let w = [];
const Z = [],
  ze = Promise.resolve();
let O = !1;
function Fe() {
  O || ((O = !0), ze.then(re));
}
function z(t) {
  w.push(t);
}
const C = new Set();
let g = 0;
function re() {
  if (g !== 0) return;
  const t = k;
  do {
    try {
      for (; g < _.length; ) {
        const e = _[g];
        g++, P(e), Ne(e.$$);
      }
    } catch (e) {
      throw ((_.length = 0), (g = 0), e);
    }
    for (P(null), _.length = 0, g = 0; Q.length; ) Q.pop()();
    for (let e = 0; e < w.length; e += 1) {
      const a = w[e];
      C.has(a) || (C.add(a), a());
    }
    w.length = 0;
  } while (_.length);
  for (; Z.length; ) Z.pop()();
  (O = !1), C.clear(), P(t);
}
function Ne(t) {
  if (t.fragment !== null) {
    t.update(), D(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(z);
  }
}
function ke(t) {
  const e = [],
    a = [];
  w.forEach((r) => (t.indexOf(r) === -1 ? e.push(r) : a.push(r))), a.forEach((r) => r()), (w = e);
}
const Re = new Set();
function Ie(t, e) {
  t && t.i && (Re.delete(t), t.i(e));
}
function Ue(t, e, a) {
  const { fragment: r, after_update: i } = t.$$;
  r && r.m(e, a),
    z(() => {
      const s = t.$$.on_mount.map(te).filter(ae);
      t.$$.on_destroy ? t.$$.on_destroy.push(...s) : D(s), (t.$$.on_mount = []);
    }),
    i.forEach(z);
}
function je(t, e) {
  const a = t.$$;
  a.fragment !== null &&
    (ke(a.after_update),
    D(a.on_destroy),
    a.fragment && a.fragment.d(e),
    (a.on_destroy = a.fragment = null),
    (a.ctx = []));
}
function qe(t, e) {
  t.$$.dirty[0] === -1 && (_.push(t), Fe(), t.$$.dirty.fill(0)), (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function Be(t, e, a, r, i, s, o, d = [-1]) {
  const m = k;
  P(t);
  const l = (t.$$ = {
    fragment: null,
    ctx: [],
    props: s,
    update: b,
    not_equal: i,
    bound: J(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (m ? m.$$.context : [])),
    callbacks: J(),
    dirty: d,
    skip_bound: !1,
    root: e.target || m.$$.root
  });
  o && o(l.root);
  let p = !1;
  if (
    ((l.ctx = a
      ? a(t, e.props || {}, (c, G, ...V) => {
          const H = V.length ? V[0] : G;
          return (
            l.ctx && i(l.ctx[c], (l.ctx[c] = H)) && (!l.skip_bound && l.bound[c] && l.bound[c](H), p && qe(t, c)), G
          );
        })
      : []),
    l.update(),
    (p = !0),
    D(l.before_update),
    (l.fragment = r ? r(l.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      const c = Oe(e.target);
      l.fragment && l.fragment.l(c), c.forEach(ne);
    } else l.fragment && l.fragment.c();
    e.intro && Ie(t.$$.fragment), Ue(t, e.target, e.anchor), re();
  }
  P(m);
}
class Ge {
  constructor() {
    T(this, "$$");
    T(this, "$$set");
  }
  $destroy() {
    je(this, 1), (this.$destroy = b);
  }
  $on(e, a) {
    if (!ae(a)) return b;
    const r = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      r.push(a),
      () => {
        const i = r.indexOf(a);
        i !== -1 && r.splice(i, 1);
      }
    );
  }
  $set(e) {
    this.$$set && !Ee(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
  }
}
const Ve = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: new Set() })).v.add(Ve);
var He = Object.defineProperty,
  u = (t, e) => {
    for (var a in e) He(t, a, { get: e[a], enumerable: !0 });
  },
  Je = {};
u(Je, { convertFileSrc: () => Ye, invoke: () => W, transformCallback: () => h });
function Ke() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0];
}
function h(t, e = !1) {
  let a = Ke(),
    r = `_${a}`;
  return (
    Object.defineProperty(window, r, {
      value: (i) => (e && Reflect.deleteProperty(window, r), t == null ? void 0 : t(i)),
      writable: !1,
      configurable: !0
    }),
    a
  );
}
async function W(t, e = {}) {
  return new Promise((a, r) => {
    let i = h((o) => {
        a(o), Reflect.deleteProperty(window, `_${s}`);
      }, !0),
      s = h((o) => {
        r(o), Reflect.deleteProperty(window, `_${i}`);
      }, !0);
    window.__TAURI_IPC__({ cmd: t, callback: i, error: s, ...e });
  });
}
function Ye(t, e = "asset") {
  let a = encodeURIComponent(t);
  return navigator.userAgent.includes("Windows") ? `https://${e}.localhost/${a}` : `${e}://localhost/${a}`;
}
async function n(t) {
  return W("tauri", t);
}
var Qe = {};
u(Qe, { TauriEvent: () => le, emit: () => U, listen: () => I, once: () => ue });
async function ie(t, e) {
  return n({ __tauriModule: "Event", message: { cmd: "unlisten", event: t, eventId: e } });
}
async function se(t, e, a) {
  await n({ __tauriModule: "Event", message: { cmd: "emit", event: t, windowLabel: e, payload: a } });
}
async function R(t, e, a) {
  return n({ __tauriModule: "Event", message: { cmd: "listen", event: t, windowLabel: e, handler: h(a) } }).then(
    (r) => async () => ie(t, r)
  );
}
async function oe(t, e, a) {
  return R(t, e, (r) => {
    a(r), ie(t, r.id).catch(() => {});
  });
}
var le = ((t) => (
  (t.WINDOW_RESIZED = "tauri://resize"),
  (t.WINDOW_MOVED = "tauri://move"),
  (t.WINDOW_CLOSE_REQUESTED = "tauri://close-requested"),
  (t.WINDOW_CREATED = "tauri://window-created"),
  (t.WINDOW_DESTROYED = "tauri://destroyed"),
  (t.WINDOW_FOCUS = "tauri://focus"),
  (t.WINDOW_BLUR = "tauri://blur"),
  (t.WINDOW_SCALE_FACTOR_CHANGED = "tauri://scale-change"),
  (t.WINDOW_THEME_CHANGED = "tauri://theme-changed"),
  (t.WINDOW_FILE_DROP = "tauri://file-drop"),
  (t.WINDOW_FILE_DROP_HOVER = "tauri://file-drop-hover"),
  (t.WINDOW_FILE_DROP_CANCELLED = "tauri://file-drop-cancelled"),
  (t.MENU = "tauri://menu"),
  (t.CHECK_UPDATE = "tauri://update"),
  (t.UPDATE_AVAILABLE = "tauri://update-available"),
  (t.INSTALL_UPDATE = "tauri://update-install"),
  (t.STATUS_UPDATE = "tauri://update-status"),
  (t.DOWNLOAD_PROGRESS = "tauri://update-download-progress"),
  t
))(le || {});
async function I(t, e) {
  return R(t, null, e);
}
async function ue(t, e) {
  return oe(t, null, e);
}
async function U(t, e) {
  return se(t, void 0, e);
}
var Ze = {};
u(Ze, { checkUpdate: () => et, installUpdate: () => Xe, onUpdaterEvent: () => j });
async function j(t) {
  return I("tauri://update-status", (e) => {
    t(e == null ? void 0 : e.payload);
  });
}
async function Xe() {
  let t;
  function e() {
    t && t(), (t = void 0);
  }
  return new Promise((a, r) => {
    function i(s) {
      if (s.error) {
        e(), r(s.error);
        return;
      }
      s.status === "DONE" && (e(), a());
    }
    j(i)
      .then((s) => {
        t = s;
      })
      .catch((s) => {
        throw (e(), s);
      }),
      U("tauri://update-install").catch((s) => {
        throw (e(), s);
      });
  });
}
async function et() {
  let t;
  function e() {
    t && t(), (t = void 0);
  }
  return new Promise((a, r) => {
    function i(o) {
      e(), a({ manifest: o, shouldUpdate: !0 });
    }
    function s(o) {
      if (o.error) {
        e(), r(o.error);
        return;
      }
      o.status === "UPTODATE" && (e(), a({ shouldUpdate: !1 }));
    }
    ue("tauri://update-available", (o) => {
      i(o == null ? void 0 : o.payload);
    }).catch((o) => {
      throw (e(), o);
    }),
      j(s)
        .then((o) => {
          t = o;
        })
        .catch((o) => {
          throw (e(), o);
        }),
      U("tauri://update").catch((o) => {
        throw (e(), o);
      });
  });
}
var tt = {};
u(tt, {
  CloseRequestedEvent: () => ye,
  LogicalPosition: () => de,
  LogicalSize: () => ce,
  PhysicalPosition: () => x,
  PhysicalSize: () => L,
  UserAttentionType: () => me,
  WebviewWindow: () => M,
  WebviewWindowHandle: () => he,
  WindowManager: () => pe,
  appWindow: () => N,
  availableMonitors: () => it,
  currentMonitor: () => nt,
  getAll: () => F,
  getCurrent: () => at,
  primaryMonitor: () => rt
});
var ce = class {
    constructor(e, a) {
      (this.type = "Logical"), (this.width = e), (this.height = a);
    }
  },
  L = class {
    constructor(e, a) {
      (this.type = "Physical"), (this.width = e), (this.height = a);
    }
    toLogical(e) {
      return new ce(this.width / e, this.height / e);
    }
  },
  de = class {
    constructor(e, a) {
      (this.type = "Logical"), (this.x = e), (this.y = a);
    }
  },
  x = class {
    constructor(e, a) {
      (this.type = "Physical"), (this.x = e), (this.y = a);
    }
    toLogical(e) {
      return new de(this.x / e, this.y / e);
    }
  },
  me = ((t) => ((t[(t.Critical = 1)] = "Critical"), (t[(t.Informational = 2)] = "Informational"), t))(me || {});
function at() {
  return new M(window.__TAURI_METADATA__.__currentWindow.label, { skip: !0 });
}
function F() {
  return window.__TAURI_METADATA__.__windows.map((t) => new M(t.label, { skip: !0 }));
}
var X = ["tauri://created", "tauri://error"],
  he = class {
    constructor(e) {
      (this.label = e), (this.listeners = Object.create(null));
    }
    async listen(e, a) {
      return this._handleTauriEvent(e, a)
        ? Promise.resolve(() => {
            let r = this.listeners[e];
            r.splice(r.indexOf(a), 1);
          })
        : R(e, this.label, a);
    }
    async once(e, a) {
      return this._handleTauriEvent(e, a)
        ? Promise.resolve(() => {
            let r = this.listeners[e];
            r.splice(r.indexOf(a), 1);
          })
        : oe(e, this.label, a);
    }
    async emit(e, a) {
      if (X.includes(e)) {
        for (let r of this.listeners[e] || []) r({ event: e, id: -1, windowLabel: this.label, payload: a });
        return Promise.resolve();
      }
      return se(e, this.label, a);
    }
    _handleTauriEvent(e, a) {
      return X.includes(e) ? (e in this.listeners ? this.listeners[e].push(a) : (this.listeners[e] = [a]), !0) : !1;
    }
  },
  pe = class extends he {
    async scaleFactor() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "scaleFactor" } } }
      });
    }
    async innerPosition() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "innerPosition" } } }
      }).then(({ x: e, y: a }) => new x(e, a));
    }
    async outerPosition() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "outerPosition" } } }
      }).then(({ x: e, y: a }) => new x(e, a));
    }
    async innerSize() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "innerSize" } } }
      }).then(({ width: e, height: a }) => new L(e, a));
    }
    async outerSize() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "outerSize" } } }
      }).then(({ width: e, height: a }) => new L(e, a));
    }
    async isFullscreen() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "isFullscreen" } } }
      });
    }
    async isMinimized() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "isMinimized" } } }
      });
    }
    async isMaximized() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "isMaximized" } } }
      });
    }
    async isFocused() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "isFocused" } } }
      });
    }
    async isDecorated() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "isDecorated" } } }
      });
    }
    async isResizable() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "isResizable" } } }
      });
    }
    async isMaximizable() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "isMaximizable" } } }
      });
    }
    async isMinimizable() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "isMinimizable" } } }
      });
    }
    async isClosable() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "isClosable" } } }
      });
    }
    async isVisible() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "isVisible" } } }
      });
    }
    async title() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "title" } } }
      });
    }
    async theme() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "theme" } } }
      });
    }
    async center() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "center" } } }
      });
    }
    async requestUserAttention(e) {
      let a = null;
      return (
        e && (e === 1 ? (a = { type: "Critical" }) : (a = { type: "Informational" })),
        n({
          __tauriModule: "Window",
          message: { cmd: "manage", data: { label: this.label, cmd: { type: "requestUserAttention", payload: a } } }
        })
      );
    }
    async setResizable(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setResizable", payload: e } } }
      });
    }
    async setMaximizable(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setMaximizable", payload: e } } }
      });
    }
    async setMinimizable(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setMinimizable", payload: e } } }
      });
    }
    async setClosable(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setClosable", payload: e } } }
      });
    }
    async setTitle(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setTitle", payload: e } } }
      });
    }
    async maximize() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "maximize" } } }
      });
    }
    async unmaximize() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "unmaximize" } } }
      });
    }
    async toggleMaximize() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "toggleMaximize" } } }
      });
    }
    async minimize() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "minimize" } } }
      });
    }
    async unminimize() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "unminimize" } } }
      });
    }
    async show() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "show" } } }
      });
    }
    async hide() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "hide" } } }
      });
    }
    async close() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "close" } } }
      });
    }
    async setDecorations(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setDecorations", payload: e } } }
      });
    }
    async setAlwaysOnTop(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setAlwaysOnTop", payload: e } } }
      });
    }
    async setContentProtected(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setContentProtected", payload: e } } }
      });
    }
    async setSize(e) {
      if (!e || (e.type !== "Logical" && e.type !== "Physical"))
        throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");
      return n({
        __tauriModule: "Window",
        message: {
          cmd: "manage",
          data: {
            label: this.label,
            cmd: { type: "setSize", payload: { type: e.type, data: { width: e.width, height: e.height } } }
          }
        }
      });
    }
    async setMinSize(e) {
      if (e && e.type !== "Logical" && e.type !== "Physical")
        throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");
      return n({
        __tauriModule: "Window",
        message: {
          cmd: "manage",
          data: {
            label: this.label,
            cmd: {
              type: "setMinSize",
              payload: e ? { type: e.type, data: { width: e.width, height: e.height } } : null
            }
          }
        }
      });
    }
    async setMaxSize(e) {
      if (e && e.type !== "Logical" && e.type !== "Physical")
        throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");
      return n({
        __tauriModule: "Window",
        message: {
          cmd: "manage",
          data: {
            label: this.label,
            cmd: {
              type: "setMaxSize",
              payload: e ? { type: e.type, data: { width: e.width, height: e.height } } : null
            }
          }
        }
      });
    }
    async setPosition(e) {
      if (!e || (e.type !== "Logical" && e.type !== "Physical"))
        throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");
      return n({
        __tauriModule: "Window",
        message: {
          cmd: "manage",
          data: { label: this.label, cmd: { type: "setPosition", payload: { type: e.type, data: { x: e.x, y: e.y } } } }
        }
      });
    }
    async setFullscreen(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setFullscreen", payload: e } } }
      });
    }
    async setFocus() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setFocus" } } }
      });
    }
    async setIcon(e) {
      return n({
        __tauriModule: "Window",
        message: {
          cmd: "manage",
          data: {
            label: this.label,
            cmd: { type: "setIcon", payload: { icon: typeof e == "string" ? e : Array.from(e) } }
          }
        }
      });
    }
    async setSkipTaskbar(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setSkipTaskbar", payload: e } } }
      });
    }
    async setCursorGrab(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setCursorGrab", payload: e } } }
      });
    }
    async setCursorVisible(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setCursorVisible", payload: e } } }
      });
    }
    async setCursorIcon(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setCursorIcon", payload: e } } }
      });
    }
    async setCursorPosition(e) {
      if (!e || (e.type !== "Logical" && e.type !== "Physical"))
        throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");
      return n({
        __tauriModule: "Window",
        message: {
          cmd: "manage",
          data: {
            label: this.label,
            cmd: { type: "setCursorPosition", payload: { type: e.type, data: { x: e.x, y: e.y } } }
          }
        }
      });
    }
    async setIgnoreCursorEvents(e) {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "setIgnoreCursorEvents", payload: e } } }
      });
    }
    async startDragging() {
      return n({
        __tauriModule: "Window",
        message: { cmd: "manage", data: { label: this.label, cmd: { type: "startDragging" } } }
      });
    }
    async onResized(e) {
      return this.listen("tauri://resize", (a) => {
        (a.payload = ge(a.payload)), e(a);
      });
    }
    async onMoved(e) {
      return this.listen("tauri://move", (a) => {
        (a.payload = fe(a.payload)), e(a);
      });
    }
    async onCloseRequested(e) {
      return this.listen("tauri://close-requested", (a) => {
        let r = new ye(a);
        Promise.resolve(e(r)).then(() => {
          if (!r.isPreventDefault()) return this.close();
        });
      });
    }
    async onFocusChanged(e) {
      let a = await this.listen("tauri://focus", (i) => {
          e({ ...i, payload: !0 });
        }),
        r = await this.listen("tauri://blur", (i) => {
          e({ ...i, payload: !1 });
        });
      return () => {
        a(), r();
      };
    }
    async onScaleChanged(e) {
      return this.listen("tauri://scale-change", e);
    }
    async onMenuClicked(e) {
      return this.listen("tauri://menu", e);
    }
    async onFileDropEvent(e) {
      let a = await this.listen("tauri://file-drop", (s) => {
          e({ ...s, payload: { type: "drop", paths: s.payload } });
        }),
        r = await this.listen("tauri://file-drop-hover", (s) => {
          e({ ...s, payload: { type: "hover", paths: s.payload } });
        }),
        i = await this.listen("tauri://file-drop-cancelled", (s) => {
          e({ ...s, payload: { type: "cancel" } });
        });
      return () => {
        a(), r(), i();
      };
    }
    async onThemeChanged(e) {
      return this.listen("tauri://theme-changed", e);
    }
  },
  ye = class {
    constructor(e) {
      (this._preventDefault = !1), (this.event = e.event), (this.windowLabel = e.windowLabel), (this.id = e.id);
    }
    preventDefault() {
      this._preventDefault = !0;
    }
    isPreventDefault() {
      return this._preventDefault;
    }
  },
  M = class extends pe {
    constructor(e, a = {}) {
      super(e),
        (a != null && a.skip) ||
          n({ __tauriModule: "Window", message: { cmd: "createWebview", data: { options: { label: e, ...a } } } })
            .then(async () => this.emit("tauri://created"))
            .catch(async (r) => this.emit("tauri://error", r));
    }
    static getByLabel(e) {
      return F().some((a) => a.label === e) ? new M(e, { skip: !0 }) : null;
    }
    static async getFocusedWindow() {
      for (let e of F()) if (await e.isFocused()) return e;
      return null;
    }
  },
  N;
"__TAURI_METADATA__" in window
  ? (N = new M(window.__TAURI_METADATA__.__currentWindow.label, { skip: !0 }))
  : (console.warn(`Could not find "window.__TAURI_METADATA__". The "appWindow" value will reference the "main" window label.
Note that this is not an issue if running this frontend on a browser instead of a Tauri window.`),
    (N = new M("main", { skip: !0 })));
function q(t) {
  return t === null ? null : { name: t.name, scaleFactor: t.scaleFactor, position: fe(t.position), size: ge(t.size) };
}
function fe(t) {
  return new x(t.x, t.y);
}
function ge(t) {
  return new L(t.width, t.height);
}
async function nt() {
  return n({ __tauriModule: "Window", message: { cmd: "manage", data: { cmd: { type: "currentMonitor" } } } }).then(q);
}
async function rt() {
  return n({ __tauriModule: "Window", message: { cmd: "manage", data: { cmd: { type: "primaryMonitor" } } } }).then(q);
}
async function it() {
  return n({ __tauriModule: "Window", message: { cmd: "manage", data: { cmd: { type: "availableMonitors" } } } }).then(
    (t) => t.map(q)
  );
}
var st = {};
u(st, { isPermissionGranted: () => ot, requestPermission: () => lt, sendNotification: () => ut });
async function ot() {
  return window.Notification.permission !== "default"
    ? Promise.resolve(window.Notification.permission === "granted")
    : n({ __tauriModule: "Notification", message: { cmd: "isNotificationPermissionGranted" } });
}
async function lt() {
  return window.Notification.requestPermission();
}
function ut(t) {
  typeof t == "string" ? new window.Notification(t) : new window.Notification(t.title, t);
}
function B() {
  return navigator.appVersion.includes("Win");
}
var ct = {};
u(ct, {
  EOL: () => dt,
  arch: () => yt,
  locale: () => gt,
  platform: () => mt,
  tempdir: () => ft,
  type: () => pt,
  version: () => ht
});
var dt = B()
  ? `\r
`
  : `
`;
async function mt() {
  return n({ __tauriModule: "Os", message: { cmd: "platform" } });
}
async function ht() {
  return n({ __tauriModule: "Os", message: { cmd: "version" } });
}
async function pt() {
  return n({ __tauriModule: "Os", message: { cmd: "osType" } });
}
async function yt() {
  return n({ __tauriModule: "Os", message: { cmd: "arch" } });
}
async function ft() {
  return n({ __tauriModule: "Os", message: { cmd: "tempdir" } });
}
async function gt() {
  return n({ __tauriModule: "Os", message: { cmd: "locale" } });
}
var _t = {};
u(_t, {
  BaseDirectory: () => E,
  Dir: () => E,
  copyFile: () => Dt,
  createDir: () => $t,
  exists: () => Lt,
  readBinaryFile: () => wt,
  readDir: () => vt,
  readTextFile: () => bt,
  removeDir: () => Pt,
  removeFile: () => At,
  renameFile: () => Wt,
  writeBinaryFile: () => Mt,
  writeFile: () => ee,
  writeTextFile: () => ee
});
var E = ((t) => (
  (t[(t.Audio = 1)] = "Audio"),
  (t[(t.Cache = 2)] = "Cache"),
  (t[(t.Config = 3)] = "Config"),
  (t[(t.Data = 4)] = "Data"),
  (t[(t.LocalData = 5)] = "LocalData"),
  (t[(t.Desktop = 6)] = "Desktop"),
  (t[(t.Document = 7)] = "Document"),
  (t[(t.Download = 8)] = "Download"),
  (t[(t.Executable = 9)] = "Executable"),
  (t[(t.Font = 10)] = "Font"),
  (t[(t.Home = 11)] = "Home"),
  (t[(t.Picture = 12)] = "Picture"),
  (t[(t.Public = 13)] = "Public"),
  (t[(t.Runtime = 14)] = "Runtime"),
  (t[(t.Template = 15)] = "Template"),
  (t[(t.Video = 16)] = "Video"),
  (t[(t.Resource = 17)] = "Resource"),
  (t[(t.App = 18)] = "App"),
  (t[(t.Log = 19)] = "Log"),
  (t[(t.Temp = 20)] = "Temp"),
  (t[(t.AppConfig = 21)] = "AppConfig"),
  (t[(t.AppData = 22)] = "AppData"),
  (t[(t.AppLocalData = 23)] = "AppLocalData"),
  (t[(t.AppCache = 24)] = "AppCache"),
  (t[(t.AppLog = 25)] = "AppLog"),
  t
))(E || {});
async function bt(t, e = {}) {
  return n({ __tauriModule: "Fs", message: { cmd: "readTextFile", path: t, options: e } });
}
async function wt(t, e = {}) {
  let a = await n({ __tauriModule: "Fs", message: { cmd: "readFile", path: t, options: e } });
  return Uint8Array.from(a);
}
async function ee(t, e, a) {
  typeof a == "object" && Object.freeze(a), typeof t == "object" && Object.freeze(t);
  let r = { path: "", contents: "" },
    i = a;
  return (
    typeof t == "string" ? (r.path = t) : ((r.path = t.path), (r.contents = t.contents)),
    typeof e == "string" ? (r.contents = e ?? "") : (i = e),
    n({
      __tauriModule: "Fs",
      message: {
        cmd: "writeFile",
        path: r.path,
        contents: Array.from(new TextEncoder().encode(r.contents)),
        options: i
      }
    })
  );
}
async function Mt(t, e, a) {
  typeof a == "object" && Object.freeze(a), typeof t == "object" && Object.freeze(t);
  let r = { path: "", contents: [] },
    i = a;
  return (
    typeof t == "string" ? (r.path = t) : ((r.path = t.path), (r.contents = t.contents)),
    e && "dir" in e ? (i = e) : typeof t == "string" && (r.contents = e ?? []),
    n({
      __tauriModule: "Fs",
      message: {
        cmd: "writeFile",
        path: r.path,
        contents: Array.from(r.contents instanceof ArrayBuffer ? new Uint8Array(r.contents) : r.contents),
        options: i
      }
    })
  );
}
async function vt(t, e = {}) {
  return n({ __tauriModule: "Fs", message: { cmd: "readDir", path: t, options: e } });
}
async function $t(t, e = {}) {
  return n({ __tauriModule: "Fs", message: { cmd: "createDir", path: t, options: e } });
}
async function Pt(t, e = {}) {
  return n({ __tauriModule: "Fs", message: { cmd: "removeDir", path: t, options: e } });
}
async function Dt(t, e, a = {}) {
  return n({ __tauriModule: "Fs", message: { cmd: "copyFile", source: t, destination: e, options: a } });
}
async function At(t, e = {}) {
  return n({ __tauriModule: "Fs", message: { cmd: "removeFile", path: t, options: e } });
}
async function Wt(t, e, a = {}) {
  return n({ __tauriModule: "Fs", message: { cmd: "renameFile", oldPath: t, newPath: e, options: a } });
}
async function Lt(t, e = {}) {
  return n({ __tauriModule: "Fs", message: { cmd: "exists", path: t, options: e } });
}
var xt = {};
u(xt, {
  BaseDirectory: () => E,
  appCacheDir: () => St,
  appConfigDir: () => _e,
  appDataDir: () => Tt,
  appDir: () => Et,
  appLocalDataDir: () => Ct,
  appLogDir: () => be,
  audioDir: () => Ot,
  basename: () => sa,
  cacheDir: () => zt,
  configDir: () => Ft,
  dataDir: () => Nt,
  delimiter: () => ea,
  desktopDir: () => kt,
  dirname: () => ra,
  documentDir: () => Rt,
  downloadDir: () => It,
  executableDir: () => Ut,
  extname: () => ia,
  fontDir: () => jt,
  homeDir: () => qt,
  isAbsolute: () => oa,
  join: () => na,
  localDataDir: () => Bt,
  logDir: () => Zt,
  normalize: () => aa,
  pictureDir: () => Gt,
  publicDir: () => Vt,
  resolve: () => ta,
  resolveResource: () => Jt,
  resourceDir: () => Ht,
  runtimeDir: () => Kt,
  sep: () => Xt,
  templateDir: () => Yt,
  videoDir: () => Qt
});
async function Et() {
  return _e();
}
async function _e() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 21 } });
}
async function Tt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 22 } });
}
async function Ct() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 23 } });
}
async function St() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 24 } });
}
async function Ot() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 1 } });
}
async function zt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 2 } });
}
async function Ft() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 3 } });
}
async function Nt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 4 } });
}
async function kt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 6 } });
}
async function Rt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 7 } });
}
async function It() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 8 } });
}
async function Ut() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 9 } });
}
async function jt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 10 } });
}
async function qt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 11 } });
}
async function Bt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 5 } });
}
async function Gt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 12 } });
}
async function Vt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 13 } });
}
async function Ht() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 17 } });
}
async function Jt(t) {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: t, directory: 17 } });
}
async function Kt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 14 } });
}
async function Yt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 15 } });
}
async function Qt() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 16 } });
}
async function Zt() {
  return be();
}
async function be() {
  return n({ __tauriModule: "Path", message: { cmd: "resolvePath", path: "", directory: 25 } });
}
var Xt = B() ? "\\" : "/",
  ea = B() ? ";" : ":";
async function ta(...t) {
  return n({ __tauriModule: "Path", message: { cmd: "resolve", paths: t } });
}
async function aa(t) {
  return n({ __tauriModule: "Path", message: { cmd: "normalize", path: t } });
}
async function na(...t) {
  return n({ __tauriModule: "Path", message: { cmd: "join", paths: t } });
}
async function ra(t) {
  return n({ __tauriModule: "Path", message: { cmd: "dirname", path: t } });
}
async function ia(t) {
  return n({ __tauriModule: "Path", message: { cmd: "extname", path: t } });
}
async function sa(t, e) {
  return n({ __tauriModule: "Path", message: { cmd: "basename", path: t, ext: e } });
}
async function oa(t) {
  return n({ __tauriModule: "Path", message: { cmd: "isAbsolute", path: t } });
}
var la = {};
u(la, { exit: () => ua, relaunch: () => ca });
async function ua(t = 0) {
  return n({ __tauriModule: "Process", message: { cmd: "exit", exitCode: t } });
}
async function ca() {
  return n({ __tauriModule: "Process", message: { cmd: "relaunch" } });
}
var we = {};
u(we, { Child: () => Me, Command: () => ve, EventEmitter: () => A, open: () => ma });
async function da(t, e, a = [], r) {
  return (
    typeof a == "object" && Object.freeze(a),
    n({ __tauriModule: "Shell", message: { cmd: "execute", program: e, args: a, options: r, onEventFn: h(t) } })
  );
}
var A = class {
    constructor() {
      this.eventListeners = Object.create(null);
    }
    addListener(e, a) {
      return this.on(e, a);
    }
    removeListener(e, a) {
      return this.off(e, a);
    }
    on(e, a) {
      return e in this.eventListeners ? this.eventListeners[e].push(a) : (this.eventListeners[e] = [a]), this;
    }
    once(e, a) {
      let r = (...i) => {
        this.removeListener(e, r), a(...i);
      };
      return this.addListener(e, r);
    }
    off(e, a) {
      return e in this.eventListeners && (this.eventListeners[e] = this.eventListeners[e].filter((r) => r !== a)), this;
    }
    removeAllListeners(e) {
      return e ? delete this.eventListeners[e] : (this.eventListeners = Object.create(null)), this;
    }
    emit(e, ...a) {
      if (e in this.eventListeners) {
        let r = this.eventListeners[e];
        for (let i of r) i(...a);
        return !0;
      }
      return !1;
    }
    listenerCount(e) {
      return e in this.eventListeners ? this.eventListeners[e].length : 0;
    }
    prependListener(e, a) {
      return e in this.eventListeners ? this.eventListeners[e].unshift(a) : (this.eventListeners[e] = [a]), this;
    }
    prependOnceListener(e, a) {
      let r = (...i) => {
        this.removeListener(e, r), a(...i);
      };
      return this.prependListener(e, r);
    }
  },
  Me = class {
    constructor(e) {
      this.pid = e;
    }
    async write(e) {
      return n({
        __tauriModule: "Shell",
        message: { cmd: "stdinWrite", pid: this.pid, buffer: typeof e == "string" ? e : Array.from(e) }
      });
    }
    async kill() {
      return n({ __tauriModule: "Shell", message: { cmd: "killChild", pid: this.pid } });
    }
  },
  ve = class extends A {
    constructor(e, a = [], r) {
      super(),
        (this.stdout = new A()),
        (this.stderr = new A()),
        (this.program = e),
        (this.args = typeof a == "string" ? [a] : a),
        (this.options = r ?? {});
    }
    static sidecar(e, a = [], r) {
      let i = new ve(e, a, r);
      return (i.options.sidecar = !0), i;
    }
    async spawn() {
      return da(
        (e) => {
          switch (e.event) {
            case "Error":
              this.emit("error", e.payload);
              break;
            case "Terminated":
              this.emit("close", e.payload);
              break;
            case "Stdout":
              this.stdout.emit("data", e.payload);
              break;
            case "Stderr":
              this.stderr.emit("data", e.payload);
              break;
          }
        },
        this.program,
        this.args,
        this.options
      ).then((e) => new Me(e));
    }
    async execute() {
      return new Promise((e, a) => {
        this.on("error", a);
        let r = [],
          i = [];
        this.stdout.on("data", (s) => {
          r.push(s);
        }),
          this.stderr.on("data", (s) => {
            i.push(s);
          }),
          this.on("close", (s) => {
            e({
              code: s.code,
              signal: s.signal,
              stdout: r.join(`
`),
              stderr: i.join(`
`)
            });
          }),
          this.spawn().catch(a);
      });
    }
  };
async function ma(t, e) {
  return n({ __tauriModule: "Shell", message: { cmd: "open", path: t, with: e } });
}
var ha = {};
u(ha, { getName: () => ya, getTauriVersion: () => fa, getVersion: () => pa, hide: () => _a, show: () => ga });
async function pa() {
  return n({ __tauriModule: "App", message: { cmd: "getAppVersion" } });
}
async function ya() {
  return n({ __tauriModule: "App", message: { cmd: "getAppName" } });
}
async function fa() {
  return n({ __tauriModule: "App", message: { cmd: "getTauriVersion" } });
}
async function ga() {
  return n({ __tauriModule: "App", message: { cmd: "show" } });
}
async function _a() {
  return n({ __tauriModule: "App", message: { cmd: "hide" } });
}
var ba = {};
u(ba, { getMatches: () => wa });
async function wa() {
  return n({ __tauriModule: "Cli", message: { cmd: "cliMatches" } });
}
var Ma = {};
u(Ma, { readText: () => $a, writeText: () => va });
async function va(t) {
  return n({ __tauriModule: "Clipboard", message: { cmd: "writeText", data: t } });
}
async function $a() {
  return n({ __tauriModule: "Clipboard", message: { cmd: "readText", data: null } });
}
var Pa = {};
u(Pa, { ask: () => La, confirm: () => xa, message: () => Wa, open: () => Da, save: () => Aa });
async function Da(t = {}) {
  return (
    typeof t == "object" && Object.freeze(t), n({ __tauriModule: "Dialog", message: { cmd: "openDialog", options: t } })
  );
}
async function Aa(t = {}) {
  return (
    typeof t == "object" && Object.freeze(t), n({ __tauriModule: "Dialog", message: { cmd: "saveDialog", options: t } })
  );
}
async function Wa(t, e) {
  var r, i;
  let a = typeof e == "string" ? { title: e } : e;
  return n({
    __tauriModule: "Dialog",
    message: {
      cmd: "messageDialog",
      message: t.toString(),
      title: (r = a == null ? void 0 : a.title) == null ? void 0 : r.toString(),
      type: a == null ? void 0 : a.type,
      buttonLabel: (i = a == null ? void 0 : a.okLabel) == null ? void 0 : i.toString()
    }
  });
}
async function La(t, e) {
  var r, i, s;
  let a = typeof e == "string" ? { title: e } : e;
  return n({
    __tauriModule: "Dialog",
    message: {
      cmd: "askDialog",
      message: t.toString(),
      title: (r = a == null ? void 0 : a.title) == null ? void 0 : r.toString(),
      type: a == null ? void 0 : a.type,
      buttonLabels: [
        ((i = a == null ? void 0 : a.okLabel) == null ? void 0 : i.toString()) ?? "Yes",
        ((s = a == null ? void 0 : a.cancelLabel) == null ? void 0 : s.toString()) ?? "No"
      ]
    }
  });
}
async function xa(t, e) {
  var r, i, s;
  let a = typeof e == "string" ? { title: e } : e;
  return n({
    __tauriModule: "Dialog",
    message: {
      cmd: "confirmDialog",
      message: t.toString(),
      title: (r = a == null ? void 0 : a.title) == null ? void 0 : r.toString(),
      type: a == null ? void 0 : a.type,
      buttonLabels: [
        ((i = a == null ? void 0 : a.okLabel) == null ? void 0 : i.toString()) ?? "Ok",
        ((s = a == null ? void 0 : a.cancelLabel) == null ? void 0 : s.toString()) ?? "Cancel"
      ]
    }
  });
}
var Ea = {};
u(Ea, {
  isRegistered: () => Sa,
  register: () => Ta,
  registerAll: () => Ca,
  unregister: () => Oa,
  unregisterAll: () => za
});
async function Ta(t, e) {
  return n({ __tauriModule: "GlobalShortcut", message: { cmd: "register", shortcut: t, handler: h(e) } });
}
async function Ca(t, e) {
  return n({ __tauriModule: "GlobalShortcut", message: { cmd: "registerAll", shortcuts: t, handler: h(e) } });
}
async function Sa(t) {
  return n({ __tauriModule: "GlobalShortcut", message: { cmd: "isRegistered", shortcut: t } });
}
async function Oa(t) {
  return n({ __tauriModule: "GlobalShortcut", message: { cmd: "unregister", shortcut: t } });
}
async function za() {
  return n({ __tauriModule: "GlobalShortcut", message: { cmd: "unregisterAll" } });
}
var Fa = {};
u(Fa, {
  Body: () => $,
  Client: () => De,
  Response: () => Pe,
  ResponseType: () => $e,
  fetch: () => Na,
  getClient: () => Ae
});
var $e = ((t) => ((t[(t.JSON = 1)] = "JSON"), (t[(t.Text = 2)] = "Text"), (t[(t.Binary = 3)] = "Binary"), t))($e || {}),
  $ = class {
    constructor(t, e) {
      (this.type = t), (this.payload = e);
    }
    static form(t) {
      let e = {},
        a = (r, i) => {
          if (i !== null) {
            let s;
            typeof i == "string"
              ? (s = i)
              : i instanceof Uint8Array || Array.isArray(i)
              ? (s = Array.from(i))
              : i instanceof File
              ? (s = { file: i.name, mime: i.type, fileName: i.name })
              : typeof i.file == "string"
              ? (s = { file: i.file, mime: i.mime, fileName: i.fileName })
              : (s = { file: Array.from(i.file), mime: i.mime, fileName: i.fileName }),
              (e[String(r)] = s);
          }
        };
      if (t instanceof FormData) for (let [r, i] of t) a(r, i);
      else for (let [r, i] of Object.entries(t)) a(r, i);
      return new $("Form", e);
    }
    static json(t) {
      return new $("Json", t);
    }
    static text(t) {
      return new $("Text", t);
    }
    static bytes(t) {
      return new $("Bytes", Array.from(t instanceof ArrayBuffer ? new Uint8Array(t) : t));
    }
  },
  Pe = class {
    constructor(t) {
      (this.url = t.url),
        (this.status = t.status),
        (this.ok = this.status >= 200 && this.status < 300),
        (this.headers = t.headers),
        (this.rawHeaders = t.rawHeaders),
        (this.data = t.data);
    }
  },
  De = class {
    constructor(t) {
      this.id = t;
    }
    async drop() {
      return n({ __tauriModule: "Http", message: { cmd: "dropClient", client: this.id } });
    }
    async request(t) {
      let e = !t.responseType || t.responseType === 1;
      return (
        e && (t.responseType = 2),
        n({ __tauriModule: "Http", message: { cmd: "httpRequest", client: this.id, options: t } }).then((a) => {
          let r = new Pe(a);
          if (e) {
            try {
              r.data = JSON.parse(r.data);
            } catch (i) {
              if (r.ok && r.data === "") r.data = {};
              else if (r.ok)
                throw Error(`Failed to parse response \`${r.data}\` as JSON: ${i};
              try setting the \`responseType\` option to \`ResponseType.Text\` or \`ResponseType.Binary\` if the API does not return a JSON response.`);
            }
            return r;
          }
          return r;
        })
      );
    }
    async get(t, e) {
      return this.request({ method: "GET", url: t, ...e });
    }
    async post(t, e, a) {
      return this.request({ method: "POST", url: t, body: e, ...a });
    }
    async put(t, e, a) {
      return this.request({ method: "PUT", url: t, body: e, ...a });
    }
    async patch(t, e) {
      return this.request({ method: "PATCH", url: t, ...e });
    }
    async delete(t, e) {
      return this.request({ method: "DELETE", url: t, ...e });
    }
  };
async function Ae(t) {
  return n({ __tauriModule: "Http", message: { cmd: "createClient", options: t } }).then((e) => new De(e));
}
var S = null;
async function Na(t, e) {
  return S === null && (S = await Ae()), S.request({ url: t, method: (e == null ? void 0 : e.method) ?? "GET", ...e });
}
function ka(t) {
  let e, a, r, i, s, o, d, m, l;
  return {
    c() {
      (e = v("main")),
        (a = v("h1")),
        (a.textContent = "Welcome to GDrive Sync!"),
        (r = K()),
        (i = v("form")),
        (s = v("button")),
        (s.textContent = "Submit"),
        (o = K()),
        (d = v("button")),
        (d.textContent = "Get About"),
        f(a, "class", "text-5xl font-extrabold text-center mb-12"),
        f(s, "type", "submit"),
        f(s, "class", "px-3 py-2 bg-green-400 text-black rounded-xl"),
        f(d, "type", "button"),
        f(d, "class", "px-3 py-2 bg-green-400 text-black rounded-xl"),
        f(e, "class", "bg-green-950 min-h-screen text-green-200 p-12");
    },
    m(p, c) {
      Te(p, e, c),
        y(e, a),
        y(e, r),
        y(e, i),
        y(i, s),
        y(i, o),
        y(i, d),
        m || ((l = [Y(d, "click", t[0]), Y(i, "submit", Se(t[1]))]), (m = !0));
    },
    p: b,
    i: b,
    o: b,
    d(p) {
      p && ne(e), (m = !1), D(l);
    }
  };
}
function Ra(t) {
  return (
    I("openGoogleAuth", async (r) => {
      await we.open(r.payload);
    }),
    [
      async () => {
        const r = await W("info");
        console.log(r);
      },
      async () => {
        await W("init_gdrive");
      }
    ]
  );
}
class Ia extends Ge {
  constructor(e) {
    super(), Be(this, e, Ra, ka, xe, {});
  }
}
new Ia({ target: document.getElementById("app") });

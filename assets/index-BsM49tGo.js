function N(d, w) {
  for (var i = 0; i < w.length; i++) {
    const g = w[i];
    if (typeof g != "string" && !Array.isArray(g)) {
      for (const h in g) if (h !== "default" && !(h in d)) {
        const x = Object.getOwnPropertyDescriptor(g, h);
        x && Object.defineProperty(d, h, x.get ? x : { enumerable: true, get: () => g[h] });
      }
    }
  }
  return Object.freeze(Object.defineProperty(d, Symbol.toStringTag, { value: "Module" }));
}
var y = {}, O;
function P() {
  if (O) return y;
  O = 1, Object.defineProperty(y, "__esModule", { value: true }), y.bech32m = y.bech32 = void 0;
  const d = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", w = {};
  for (let t = 0; t < d.length; t++) {
    const e = d.charAt(t);
    w[e] = t;
  }
  function i(t) {
    const e = t >> 25;
    return (t & 33554431) << 5 ^ -(e >> 0 & 1) & 996825010 ^ -(e >> 1 & 1) & 642813549 ^ -(e >> 2 & 1) & 513874426 ^ -(e >> 3 & 1) & 1027748829 ^ -(e >> 4 & 1) & 705979059;
  }
  function g(t) {
    let e = 1;
    for (let o = 0; o < t.length; ++o) {
      const s = t.charCodeAt(o);
      if (s < 33 || s > 126) return "Invalid prefix (" + t + ")";
      e = i(e) ^ s >> 5;
    }
    e = i(e);
    for (let o = 0; o < t.length; ++o) {
      const s = t.charCodeAt(o);
      e = i(e) ^ s & 31;
    }
    return e;
  }
  function h(t, e, o, s) {
    let p = 0, l = 0;
    const r = (1 << o) - 1, c = [];
    for (let n = 0; n < t.length; ++n) for (p = p << e | t[n], l += e; l >= o; ) l -= o, c.push(p >> l & r);
    if (s) l > 0 && c.push(p << o - l & r);
    else {
      if (l >= e) return "Excess padding";
      if (p << o - l & r) return "Non-zero padding";
    }
    return c;
  }
  function x(t) {
    return h(t, 8, 5, true);
  }
  function j(t) {
    const e = h(t, 5, 8, false);
    if (Array.isArray(e)) return e;
  }
  function k(t) {
    const e = h(t, 5, 8, false);
    if (Array.isArray(e)) return e;
    throw new Error(e);
  }
  function E(t) {
    let e;
    t === "bech32" ? e = 1 : e = 734539939;
    function o(r, c, n) {
      if (n = n || 90, r.length + 7 + c.length > n) throw new TypeError("Exceeds length limit");
      r = r.toLowerCase();
      let u = g(r);
      if (typeof u == "string") throw new Error(u);
      let b = r + "1";
      for (let f = 0; f < c.length; ++f) {
        const a = c[f];
        if (a >> 5 !== 0) throw new Error("Non 5-bit word");
        u = i(u) ^ a, b += d.charAt(a);
      }
      for (let f = 0; f < 6; ++f) u = i(u);
      u ^= e;
      for (let f = 0; f < 6; ++f) {
        const a = u >> (5 - f) * 5 & 31;
        b += d.charAt(a);
      }
      return b;
    }
    function s(r, c) {
      if (c = c || 90, r.length < 8) return r + " too short";
      if (r.length > c) return "Exceeds length limit";
      const n = r.toLowerCase(), u = r.toUpperCase();
      if (r !== n && r !== u) return "Mixed-case string " + r;
      r = n;
      const b = r.lastIndexOf("1");
      if (b === -1) return "No separator character for " + r;
      if (b === 0) return "Missing prefix for " + r;
      const f = r.slice(0, b), a = r.slice(b + 1);
      if (a.length < 6) return "Data too short";
      let A = g(f);
      if (typeof A == "string") return A;
      const _ = [];
      for (let m = 0; m < a.length; ++m) {
        const C = a.charAt(m), v = w[C];
        if (v === void 0) return "Unknown character " + C;
        A = i(A) ^ v, !(m + 6 >= a.length) && _.push(v);
      }
      return A !== e ? "Invalid checksum for " + r : { prefix: f, words: _ };
    }
    function p(r, c) {
      const n = s(r, c);
      if (typeof n == "object") return n;
    }
    function l(r, c) {
      const n = s(r, c);
      if (typeof n == "object") return n;
      throw new Error(n);
    }
    return { decodeUnsafe: p, decode: l, encode: o, toWords: x, fromWordsUnsafe: j, fromWords: k };
  }
  return y.bech32 = E("bech32"), y.bech32m = E("bech32m"), y;
}
var D = P();
const z = N({ __proto__: null }, [D]);
export {
  z as i
};

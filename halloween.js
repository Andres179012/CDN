// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t3, e4, o4) {
    if (this._$cssResult$ = true, o4 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e4;
  }
  get styleSheet() {
    let t3 = this.o;
    const s3 = this.t;
    if (e && void 0 === t3) {
      const e4 = void 0 !== s3 && 1 === s3.length;
      e4 && (t3 = o.get(s3)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && o.set(s3, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t3) => new n("string" == typeof t3 ? t3 : t3 + "", void 0, s);
var S = (s3, o4) => {
  if (e) s3.adoptedStyleSheets = o4.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
  else for (const e4 of o4) {
    const o5 = document.createElement("style"), n4 = t.litNonce;
    void 0 !== n4 && o5.setAttribute("nonce", n4), o5.textContent = e4.cssText, s3.appendChild(o5);
  }
};
var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const s3 of t4.cssRules) e4 += s3.cssText;
  return r(e4);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t3, s3) => t3;
var u = { toAttribute(t3, s3) {
  switch (s3) {
    case Boolean:
      t3 = t3 ? l : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, s3) {
  let i5 = t3;
  switch (s3) {
    case Boolean:
      i5 = null !== t3;
      break;
    case Number:
      i5 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        i5 = JSON.parse(t3);
      } catch (t4) {
        i5 = null;
      }
  }
  return i5;
} };
var f = (t3, s3) => !i2(t3, s3);
var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b = class extends HTMLElement {
  static addInitializer(t3) {
    this._$Ei(), (this.l ??= []).push(t3);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t3, s3 = y) {
    if (s3.state && (s3.attribute = false), this._$Ei(), this.elementProperties.set(t3, s3), !s3.noAccessor) {
      const i5 = Symbol(), r5 = this.getPropertyDescriptor(t3, i5, s3);
      void 0 !== r5 && e2(this.prototype, t3, r5);
    }
  }
  static getPropertyDescriptor(t3, s3, i5) {
    const { get: e4, set: h3 } = r2(this.prototype, t3) ?? { get() {
      return this[s3];
    }, set(t4) {
      this[s3] = t4;
    } };
    return { get() {
      return e4?.call(this);
    }, set(s4) {
      const r5 = e4?.call(this);
      h3.call(this, s4), this.requestUpdate(t3, r5, i5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t3 = n2(this);
    t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t4 = this.properties, s3 = [...h(t4), ...o2(t4)];
      for (const i5 of s3) this.createProperty(i5, t4[i5]);
    }
    const t3 = this[Symbol.metadata];
    if (null !== t3) {
      const s3 = litPropertyMetadata.get(t3);
      if (void 0 !== s3) for (const [t4, i5] of s3) this.elementProperties.set(t4, i5);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t4, s3] of this.elementProperties) {
      const i5 = this._$Eu(t4, s3);
      void 0 !== i5 && this._$Eh.set(i5, t4);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s3) {
    const i5 = [];
    if (Array.isArray(s3)) {
      const e4 = new Set(s3.flat(1 / 0).reverse());
      for (const s4 of e4) i5.unshift(c(s4));
    } else void 0 !== s3 && i5.push(c(s3));
    return i5;
  }
  static _$Eu(t3, s3) {
    const i5 = s3.attribute;
    return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t3) => t3(this));
  }
  addController(t3) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t3), void 0 !== this.renderRoot && this.isConnected && t3.hostConnected?.();
  }
  removeController(t3) {
    this._$EO?.delete(t3);
  }
  _$E_() {
    const t3 = /* @__PURE__ */ new Map(), s3 = this.constructor.elementProperties;
    for (const i5 of s3.keys()) this.hasOwnProperty(i5) && (t3.set(i5, this[i5]), delete this[i5]);
    t3.size > 0 && (this._$Ep = t3);
  }
  createRenderRoot() {
    const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t3, this.constructor.elementStyles), t3;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t3) => t3.hostConnected?.());
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t3) => t3.hostDisconnected?.());
  }
  attributeChangedCallback(t3, s3, i5) {
    this._$AK(t3, i5);
  }
  _$EC(t3, s3) {
    const i5 = this.constructor.elementProperties.get(t3), e4 = this.constructor._$Eu(t3, i5);
    if (void 0 !== e4 && true === i5.reflect) {
      const r5 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s3, i5.type);
      this._$Em = t3, null == r5 ? this.removeAttribute(e4) : this.setAttribute(e4, r5), this._$Em = null;
    }
  }
  _$AK(t3, s3) {
    const i5 = this.constructor, e4 = i5._$Eh.get(t3);
    if (void 0 !== e4 && this._$Em !== e4) {
      const t4 = i5.getPropertyOptions(e4), r5 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== t4.converter?.fromAttribute ? t4.converter : u;
      this._$Em = e4, this[e4] = r5.fromAttribute(s3, t4.type), this._$Em = null;
    }
  }
  requestUpdate(t3, s3, i5) {
    if (void 0 !== t3) {
      if (i5 ??= this.constructor.getPropertyOptions(t3), !(i5.hasChanged ?? f)(this[t3], s3)) return;
      this.P(t3, s3, i5);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t3, s3, i5) {
    this._$AL.has(t3) || this._$AL.set(t3, s3), true === i5.reflect && this._$Em !== t3 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t3);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t5, s4] of this._$Ep) this[t5] = s4;
        this._$Ep = void 0;
      }
      const t4 = this.constructor.elementProperties;
      if (t4.size > 0) for (const [s4, i5] of t4) true !== i5.wrapped || this._$AL.has(s4) || void 0 === this[s4] || this.P(s4, this[s4], i5);
    }
    let t3 = false;
    const s3 = this._$AL;
    try {
      t3 = this.shouldUpdate(s3), t3 ? (this.willUpdate(s3), this._$EO?.forEach((t4) => t4.hostUpdate?.()), this.update(s3)) : this._$EU();
    } catch (s4) {
      throw t3 = false, this._$EU(), s4;
    }
    t3 && this._$AE(s3);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    this._$EO?.forEach((t4) => t4.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$Ej &&= this._$Ej.forEach((t4) => this._$EC(t4, this[t4])), this._$EU();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = t2.trustedTypes;
var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var e3 = "$lit$";
var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var o3 = "?" + h2;
var n3 = `<${o3}>`;
var r3 = document;
var l2 = () => r3.createComment("");
var c3 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
var a2 = Array.isArray;
var u2 = (t3) => a2(t3) || "function" == typeof t3?.[Symbol.iterator];
var d2 = "[ 	\n\f\r]";
var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var _ = />/g;
var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p2 = /'/g;
var g = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var y2 = (t3) => (i5, ...s3) => ({ _$litType$: t3, strings: i5, values: s3 });
var x = y2(1);
var b2 = y2(2);
var w = y2(3);
var T = Symbol.for("lit-noChange");
var E = Symbol.for("lit-nothing");
var A = /* @__PURE__ */ new WeakMap();
var C = r3.createTreeWalker(r3, 129);
function P(t3, i5) {
  if (!a2(t3) || !t3.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s2 ? s2.createHTML(i5) : i5;
}
var V = (t3, i5) => {
  const s3 = t3.length - 1, o4 = [];
  let r5, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = f2;
  for (let i6 = 0; i6 < s3; i6++) {
    const s4 = t3[i6];
    let a3, u3, d3 = -1, y3 = 0;
    for (; y3 < s4.length && (c4.lastIndex = y3, u3 = c4.exec(s4), null !== u3); ) y3 = c4.lastIndex, c4 === f2 ? "!--" === u3[1] ? c4 = v : void 0 !== u3[1] ? c4 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r5 = RegExp("</" + u3[2], "g")), c4 = m) : void 0 !== u3[3] && (c4 = m) : c4 === m ? ">" === u3[0] ? (c4 = r5 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? m : '"' === u3[3] ? g : p2) : c4 === g || c4 === p2 ? c4 = m : c4 === v || c4 === _ ? c4 = f2 : (c4 = m, r5 = void 0);
    const x2 = c4 === m && t3[i6 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === f2 ? s4 + n3 : d3 >= 0 ? (o4.push(a3), s4.slice(0, d3) + e3 + s4.slice(d3) + h2 + x2) : s4 + h2 + (-2 === d3 ? i6 : x2);
  }
  return [P(t3, l3 + (t3[s3] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), o4];
};
var N = class _N {
  constructor({ strings: t3, _$litType$: s3 }, n4) {
    let r5;
    this.parts = [];
    let c4 = 0, a3 = 0;
    const u3 = t3.length - 1, d3 = this.parts, [f3, v2] = V(t3, s3);
    if (this.el = _N.createElement(f3, n4), C.currentNode = this.el.content, 2 === s3 || 3 === s3) {
      const t4 = this.el.content.firstChild;
      t4.replaceWith(...t4.childNodes);
    }
    for (; null !== (r5 = C.nextNode()) && d3.length < u3; ) {
      if (1 === r5.nodeType) {
        if (r5.hasAttributes()) for (const t4 of r5.getAttributeNames()) if (t4.endsWith(e3)) {
          const i5 = v2[a3++], s4 = r5.getAttribute(t4).split(h2), e4 = /([.?@])?(.*)/.exec(i5);
          d3.push({ type: 1, index: c4, name: e4[2], strings: s4, ctor: "." === e4[1] ? H : "?" === e4[1] ? I : "@" === e4[1] ? L : k }), r5.removeAttribute(t4);
        } else t4.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r5.removeAttribute(t4));
        if ($.test(r5.tagName)) {
          const t4 = r5.textContent.split(h2), s4 = t4.length - 1;
          if (s4 > 0) {
            r5.textContent = i3 ? i3.emptyScript : "";
            for (let i5 = 0; i5 < s4; i5++) r5.append(t4[i5], l2()), C.nextNode(), d3.push({ type: 2, index: ++c4 });
            r5.append(t4[s4], l2());
          }
        }
      } else if (8 === r5.nodeType) if (r5.data === o3) d3.push({ type: 2, index: c4 });
      else {
        let t4 = -1;
        for (; -1 !== (t4 = r5.data.indexOf(h2, t4 + 1)); ) d3.push({ type: 7, index: c4 }), t4 += h2.length - 1;
      }
      c4++;
    }
  }
  static createElement(t3, i5) {
    const s3 = r3.createElement("template");
    return s3.innerHTML = t3, s3;
  }
};
function S2(t3, i5, s3 = t3, e4) {
  if (i5 === T) return i5;
  let h3 = void 0 !== e4 ? s3._$Co?.[e4] : s3._$Cl;
  const o4 = c3(i5) ? void 0 : i5._$litDirective$;
  return h3?.constructor !== o4 && (h3?._$AO?.(false), void 0 === o4 ? h3 = void 0 : (h3 = new o4(t3), h3._$AT(t3, s3, e4)), void 0 !== e4 ? (s3._$Co ??= [])[e4] = h3 : s3._$Cl = h3), void 0 !== h3 && (i5 = S2(t3, h3._$AS(t3, i5.values), h3, e4)), i5;
}
var M = class {
  constructor(t3, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t3) {
    const { el: { content: i5 }, parts: s3 } = this._$AD, e4 = (t3?.creationScope ?? r3).importNode(i5, true);
    C.currentNode = e4;
    let h3 = C.nextNode(), o4 = 0, n4 = 0, l3 = s3[0];
    for (; void 0 !== l3; ) {
      if (o4 === l3.index) {
        let i6;
        2 === l3.type ? i6 = new R(h3, h3.nextSibling, this, t3) : 1 === l3.type ? i6 = new l3.ctor(h3, l3.name, l3.strings, this, t3) : 6 === l3.type && (i6 = new z(h3, this, t3)), this._$AV.push(i6), l3 = s3[++n4];
      }
      o4 !== l3?.index && (h3 = C.nextNode(), o4++);
    }
    return C.currentNode = r3, e4;
  }
  p(t3) {
    let i5 = 0;
    for (const s3 of this._$AV) void 0 !== s3 && (void 0 !== s3.strings ? (s3._$AI(t3, s3, i5), i5 += s3.strings.length - 2) : s3._$AI(t3[i5])), i5++;
  }
};
var R = class _R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t3, i5, s3, e4) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t3, this._$AB = i5, this._$AM = s3, this.options = e4, this._$Cv = e4?.isConnected ?? true;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === t3?.nodeType && (t3 = i5.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i5 = this) {
    t3 = S2(this, t3, i5), c3(t3) ? t3 === E || null == t3 || "" === t3 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t3 !== this._$AH && t3 !== T && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : u2(t3) ? this.k(t3) : this._(t3);
  }
  O(t3) {
    return this._$AA.parentNode.insertBefore(t3, this._$AB);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
  }
  _(t3) {
    this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(r3.createTextNode(t3)), this._$AH = t3;
  }
  $(t3) {
    const { values: i5, _$litType$: s3 } = t3, e4 = "number" == typeof s3 ? this._$AC(t3) : (void 0 === s3.el && (s3.el = N.createElement(P(s3.h, s3.h[0]), this.options)), s3);
    if (this._$AH?._$AD === e4) this._$AH.p(i5);
    else {
      const t4 = new M(e4, this), s4 = t4.u(this.options);
      t4.p(i5), this.T(s4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i5 = A.get(t3.strings);
    return void 0 === i5 && A.set(t3.strings, i5 = new N(t3)), i5;
  }
  k(t3) {
    a2(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s3, e4 = 0;
    for (const h3 of t3) e4 === i5.length ? i5.push(s3 = new _R(this.O(l2()), this.O(l2()), this, this.options)) : s3 = i5[e4], s3._$AI(h3), e4++;
    e4 < i5.length && (this._$AR(s3 && s3._$AB.nextSibling, e4), i5.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, i5) {
    for (this._$AP?.(false, true, i5); t3 && t3 !== this._$AB; ) {
      const i6 = t3.nextSibling;
      t3.remove(), t3 = i6;
    }
  }
  setConnected(t3) {
    void 0 === this._$AM && (this._$Cv = t3, this._$AP?.(t3));
  }
};
var k = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t3, i5, s3, e4, h3) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t3, this.name = i5, this._$AM = e4, this.options = h3, s3.length > 2 || "" !== s3[0] || "" !== s3[1] ? (this._$AH = Array(s3.length - 1).fill(new String()), this.strings = s3) : this._$AH = E;
  }
  _$AI(t3, i5 = this, s3, e4) {
    const h3 = this.strings;
    let o4 = false;
    if (void 0 === h3) t3 = S2(this, t3, i5, 0), o4 = !c3(t3) || t3 !== this._$AH && t3 !== T, o4 && (this._$AH = t3);
    else {
      const e5 = t3;
      let n4, r5;
      for (t3 = h3[0], n4 = 0; n4 < h3.length - 1; n4++) r5 = S2(this, e5[s3 + n4], i5, n4), r5 === T && (r5 = this._$AH[n4]), o4 ||= !c3(r5) || r5 !== this._$AH[n4], r5 === E ? t3 = E : t3 !== E && (t3 += (r5 ?? "") + h3[n4 + 1]), this._$AH[n4] = r5;
    }
    o4 && !e4 && this.j(t3);
  }
  j(t3) {
    t3 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === E ? void 0 : t3;
  }
};
var I = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    this.element.toggleAttribute(this.name, !!t3 && t3 !== E);
  }
};
var L = class extends k {
  constructor(t3, i5, s3, e4, h3) {
    super(t3, i5, s3, e4, h3), this.type = 5;
  }
  _$AI(t3, i5 = this) {
    if ((t3 = S2(this, t3, i5, 0) ?? E) === T) return;
    const s3 = this._$AH, e4 = t3 === E && s3 !== E || t3.capture !== s3.capture || t3.once !== s3.once || t3.passive !== s3.passive, h3 = t3 !== E && (s3 === E || e4);
    e4 && this.element.removeEventListener(this.name, this, s3), h3 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var z = class {
  constructor(t3, i5, s3) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s3;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    S2(this, t3);
  }
};
var j = t2.litHtmlPolyfillSupport;
j?.(N, R), (t2.litHtmlVersions ??= []).push("3.2.1");
var B = (t3, i5, s3) => {
  const e4 = s3?.renderBefore ?? i5;
  let h3 = e4._$litPart$;
  if (void 0 === h3) {
    const t4 = s3?.renderBefore ?? null;
    e4._$litPart$ = h3 = new R(i5.insertBefore(l2(), t4), t4, void 0, s3 ?? {});
  }
  return h3._$AI(t3), h3;
};

// node_modules/lit-element/lit-element.js
var r4 = class extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t3 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t3.firstChild, t3;
  }
  update(t3) {
    const s3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = B(s3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return T;
  }
};
r4._$litElement$ = true, r4["finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: r4 });
var i4 = globalThis.litElementPolyfillSupport;
i4?.({ LitElement: r4 });
(globalThis.litElementVersions ??= []).push("4.1.1");

// src/halloween.js
var HalloweenWidget = class extends r4 {
  // Render en light DOM para mantener la misma estructura de integración
  createRenderRoot() {
    return this;
  }
  static properties = {
    theme: { type: String, reflect: true },
    // 'bat' | 'spider' | 'pumpkin'
    source: { type: String, reflect: true },
    // 'svg' | 'assets'
    assets: { type: String, reflect: true },
    // lista separada por comas de URLs
    emoji: { type: String, reflect: true },
    // cuando source='emoji'
    spread: { type: String, reflect: true },
    // 'edges' | 'full'
    density: { type: String, reflect: true },
    // numero o 'low'|'medium'|'high'
    size: { type: String, reflect: true },
    // px, e.g., '28'|'40'
    scope: { type: String, reflect: true },
    // 'component' | 'viewport'
    flap: { type: Boolean, reflect: true },
    // animar alas (solo svg+bat)
    loader: { type: Boolean, reflect: true },
    // muestra loader global al inicio
    loaderDuration: { type: String, reflect: true },
    // ms como string o numero (por defecto 5000)
    onlyLoader: { type: Boolean, reflect: true },
    // si true, no renderiza decoraciones, solo loader
    loaderEmoji: { type: String, reflect: true },
    // emoji a mostrar en el loader, por defecto 🎃
    loaderBg: { type: String, reflect: true },
    // color/fondo del overlay del loader
    loaderText: { type: Boolean, reflect: true },
    // mostrar texto en el loader
    loaderTextColor: { type: String, reflect: true },
    // color del texto
    loaderShowCountdown: { type: Boolean, reflect: true },
    // mostrar días restantes cuando aplique
    loaderTextSize: { type: String, reflect: true },
    // tamaño del texto (CSS), ej: 'clamp(22px,3.2vw,42px)'
    loaderFontFamily: { type: String, reflect: true },
    // fuente personalizada para el texto
    loaderTextGradient: { type: String, reflect: true },
    // 'colorA,colorB' para gradiente
    dark: { type: Boolean, reflect: true },
    // modo oscuro opcional
    edgeSafeArea: { type: Boolean, reflect: true },
    // aplica safe-area insets en bordes del viewport
    edgeOffset: { type: String, reflect: true },
    // px adicionales desde el borde (por defecto 2px)
    loaderImgSize: { type: String, reflect: true },
    // tamaño en px para la imagen del loader
    // Movimiento
    movement: { type: String, reflect: true },
    // 'float' (por defecto) | 'flock'
    flockEvery: { type: String, reflect: true },
    // ms entre ráfagas
    flockSize: { type: String, reflect: true },
    // numero o 'low'|'medium'|'high'
    flockSpeed: { type: String, reflect: true },
    // segundos en cruzar la pantalla
    // Ráfagas desde esquinas (más natural)
    movementCornerEvery: { type: String, reflect: true },
    // ms entre ráfagas de esquina
    movementCornerSize: { type: String, reflect: true },
    // numero o 'low'|'medium'|'high'
    movementCornerSpread: { type: String, reflect: true },
    // px de dispersión desde la esquina
    movementCornerPattern: { type: String, reflect: true },
    // 'burst' | 'sweep' | 'cluster'
    movementCornerClusterRadius: { type: String, reflect: true },
    // px radio del grupo (cluster)
    showBottomPumpkins: { type: Boolean, reflect: true },
    // mostrar calabazas fijas en esquinas inferiores
    dropEvery: { type: String, reflect: true },
    // ms entre drops (arañas)
    dropPerSpawn: { type: String, reflect: true }
    // cuantas arañas por spawn
  };
  constructor() {
    super();
    this.theme = "bat";
    this.source = "svg";
    this.assets = "";
    this.emoji = "\u{1F987}";
    this.spread = "edges";
    this.density = "";
    this.size = "44";
    this.scope = "component";
    this.flap = true;
    this.loader = true;
    this.loaderDuration = "3000";
    this.onlyLoader = false;
    this.loaderEmoji = "\u{1F383}";
    this.showBottomPumpkins = false;
    this.loaderBg = "#000";
    this.loaderText = true;
    this.loaderTextColor = "#fff";
    this.loaderShowCountdown = true;
    this.loaderTextSize = "clamp(24px, 3.6vw, 46px)";
    this.loaderFontFamily = "";
    this.loaderTextGradient = "#ff7a18,#ff3d00";
    this.dark = false;
    this.loaderImgSize = "220";
    this.edgeSafeArea = true;
    this.edgeOffset = "2";
    this.movement = "float";
    this.flockEvery = "7000";
    this.flockSize = "";
    this.flockSpeed = "8";
    this._flocks = [];
    this.movementCornerEvery = "5000";
    this.movementCornerSize = "";
    this.movementCornerSpread = "140";
    this._cornerBursts = [];
    this.movementCornerPattern = "burst";
    this._cornerSweeps = [];
    this.movementCornerClusterRadius = "140";
    this._cornerClusters = [];
    this.dropEvery = "4500";
    this.dropPerSpawn = "3";
    this._drops = [];
    this._effects = [];
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.scope === "viewport" && !this.onlyLoader && !this._viewportHost) {
      this._createViewportHost();
    }
    if (this.loader && !this._loaderHost) {
      this._createLoaderHost();
      this._renderLoader();
      const dur = this._getLoaderDuration();
      this._loaderTimer = setTimeout(() => this._hideLoader(), dur);
    }
    this._maybeStartFlocks();
    this._maybeStartCornerBursts();
    this._maybeStartCornerSweeps();
    this._maybeStartCornerClusters();
    this._maybeStartDrops();
  }
  disconnectedCallback() {
    if (this._loaderTimer) {
      clearTimeout(this._loaderTimer);
      this._loaderTimer = null;
    }
    this._destroyViewportHost();
    this._destroyLoaderHost();
    this._stopCornerBursts();
    this._stopCornerSweeps();
    this._stopCornerClusters();
    this._stopFlocks();
    this._stopDrops();
    super.disconnectedCallback();
  }
  updated(changed) {
    const theme = (this.theme || "bat").toLowerCase();
    if (changed.has("scope")) {
      if (this.scope === "viewport" && !this.onlyLoader) {
        if (!this._viewportHost) this._createViewportHost();
      } else {
        this._destroyViewportHost();
      }
    }
    if (changed.has("onlyLoader")) {
      if (this.onlyLoader) {
        this._destroyViewportHost();
      } else if (this.scope === "viewport" && !this._viewportHost) {
        this._createViewportHost();
      }
    }
    if (this.scope === "viewport" && !this.onlyLoader && this._viewportHost) {
      this._renderOverlay(theme);
    }
    if (this._loaderHost && this.loader) {
      this._renderLoader();
    }
    if (changed.has("movement") || changed.has("scope") || changed.has("onlyLoader") || changed.has("movementCornerPattern")) {
      this._maybeStartFlocks();
      if (this.movement !== "flock") this._stopFlocks();
      this._maybeStartCornerBursts();
      this._maybeStartCornerSweeps();
      this._maybeStartCornerClusters();
      if (this.movement !== "corner" || this.movementCornerPattern !== "burst") this._stopCornerBursts();
      if (this.movement !== "corner" || this.movementCornerPattern !== "sweep") this._stopCornerSweeps();
      if (this.movement !== "corner" || this.movementCornerPattern !== "cluster") this._stopCornerClusters();
      this._maybeStartDrops();
    }
    if (changed.has("movementCornerEvery")) {
      this._stopCornerBursts();
      this._stopCornerSweeps();
      this._stopCornerClusters();
      this._maybeStartCornerBursts();
      this._maybeStartCornerSweeps();
      this._maybeStartCornerClusters();
    }
  }
  _renderOverlay(theme) {
    B(this._overlayTemplate(theme), this._viewportHost);
  }
  _onViewportPointerDown(e4) {
    let el = e4.target;
    while (el && el !== this._viewportHost) {
      if (el.classList && el.classList.contains && el.classList.contains("deco")) {
        const rect = el.getBoundingClientRect();
        const x2 = rect.left + rect.width / 2;
        const y3 = rect.top + rect.height / 2;
        this._spawnEffect(x2, y3);
        return;
      }
      el = el.parentNode;
    }
  }
  _spawnEffect(x2, y3) {
    const count = Math.floor(3 + Math.random() * 3);
    const id = Math.random().toString(36).slice(2);
    const items = Array.from({ length: count }).map((_2, i5) => ({
      id: id + "-" + i5,
      x: x2,
      y: y3,
      dx: Math.random() * 240 - 120,
      dy: -(80 + Math.random() * 180),
      dur: 1.2 + Math.random() * 0.9
    }));
    this._effects = [...this._effects, { id, items }];
    if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    setTimeout(() => {
      this._effects = this._effects.filter((e4) => e4.id !== id);
      if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    }, 2200);
  }
  _renderEffects(theme) {
    if (!this._effects || this._effects.length === 0) return "";
    return this._effects.map((effect) => x`${effect.items.map((it) => x`
      <div class="interactive-bat" style="left:${it.x}px; top:${it.y}px; --dx:${it.dx}px; --dy:${it.dy}px; --dur:${it.dur}s;">
        ${this._deco("bat", "", this._colorFor("bat"), 0, "--deco-size:20px;")}
      </div>
    `)}`);
  }
  _createViewportHost() {
    this._viewportHost = document.createElement("div");
    this._viewportHost.style.position = "fixed";
    this._viewportHost.style.inset = "0";
    this._viewportHost.style.pointerEvents = "none";
    this._viewportHost.style.zIndex = "2147483646";
    document.body.appendChild(this._viewportHost);
    this._onViewportPointerDownRef = this._onViewportPointerDown.bind(this);
    this._viewportHost.addEventListener("pointerdown", this._onViewportPointerDownRef);
  }
  _destroyViewportHost() {
    if (this._viewportHost && this._viewportHost.parentNode) {
      this._viewportHost.parentNode.removeChild(this._viewportHost);
    }
    if (this._viewportHost && this._onViewportPointerDownRef) {
      this._viewportHost.removeEventListener("pointerdown", this._onViewportPointerDownRef);
      this._onViewportPointerDownRef = null;
    }
    this._viewportHost = null;
  }
  _createLoaderHost() {
    const existing = document.getElementById("hw-loader-overlay");
    if (existing) {
      this._loaderHost = existing;
      return;
    }
    this._loaderHost = document.createElement("div");
    this._loaderHost.id = "hw-loader-overlay";
    this._loaderHost.style.position = "fixed";
    this._loaderHost.style.inset = "0";
    this._loaderHost.style.zIndex = "10000";
    this._loaderHost.style.pointerEvents = "none";
    document.body.appendChild(this._loaderHost);
  }
  _destroyLoaderHost() {
    if (this._loaderHost && this._loaderHost.parentNode) {
      this._loaderHost.parentNode.removeChild(this._loaderHost);
    }
    this._loaderHost = null;
  }
  _getLoaderDuration() {
    const v2 = (this.loaderDuration ?? "5000").toString().trim();
    const n4 = parseInt(v2, 10);
    return isNaN(n4) ? 5e3 : Math.max(500, n4);
  }
  _loaderStyle() {
    return x`<style>
      :host([dark]) .hw-loader { --loader-bg: rgba(6,6,10,0.72); --card-grad-a: rgba(18,14,22,0.96); --card-grad-b: rgba(12,10,14,0.98); }
      :host(:not([dark])) .hw-loader { --loader-bg: rgba(0,0,0,0.18); --card-grad-a: rgba(36,26,40,0.92); --card-grad-b: rgba(24,18,28,0.96); }
      .hw-loader { position: fixed; inset: 0; display: grid; place-items: center; background: var(--loader-bg, rgba(0,0,0,0.28)); pointer-events: none; backdrop-filter: blur(6px); }
  .loader-card { position: relative; display: grid; gap: 14px; place-items: center; padding: 22px 28px; border-radius: 14px; background: linear-gradient(180deg, var(--card-grad-a, rgba(28,22,36,0.92)), var(--card-grad-b, rgba(20,16,24,0.96))); box-shadow: 0 10px 30px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.04); min-width: 220px; }
  .loader-inner { display: grid; place-items: center; gap: 12px; z-index: 2; }
  /* partículas sutiles detrás */
  .loader-particles { position: absolute; inset: -18px; pointer-events: none; z-index: 1; overflow: visible; }
  .loader-particles .p { position: absolute; width: 6px; height: 6px; background: rgba(255,200,60,0.08); border-radius: 50%; filter: blur(2px); animation: partMove 3.6s linear infinite; }
  .loader-particles .p:nth-child(1){ left:8%; top:10%; animation-delay:0s }
  .loader-particles .p:nth-child(2){ left:82%; top:18%; animation-delay:.4s }
  .loader-particles .p:nth-child(3){ left:22%; top:78%; animation-delay:.9s }
  .loader-particles .p:nth-child(4){ left:68%; top:72%; animation-delay:1.3s }
  .loader-particles .p:nth-child(5){ left:46%; top:6%; animation-delay:1.7s }
  .loader-particles .p:nth-child(6){ left:56%; top:86%; animation-delay:2.2s }
  @keyframes partMove { 0%{opacity:.08; transform:translateY(0) scale(1)}50%{opacity:.18; transform:translateY(-8px) scale(1.05)}100%{opacity:.08; transform:translateY(0) scale(1)} }
      .emoji {
        font-size: var(--emoji-size, 110px);
        line-height: 1;
        filter: drop-shadow(0 3px 6px rgba(0,0,0,.4));
        will-change: transform, opacity, filter;
        animation: pumpkinPulse var(--loader-emoji-dur, .95s) ease-in-out infinite;
      }
      /* Animación para la imagen del loader (calabaza) */
      .loader-img {
        position: relative; display: inline-block; width: var(--loader-img-size, 140px); height: var(--loader-img-size, 140px); z-index:2;
      }
      .loader-img img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        will-change: transform, filter;
        animation: loaderPump 2.6s ease-in-out infinite;
        transform-origin: center center;
        display: block;
        margin: 0 auto;
        filter: drop-shadow(0 6px 12px rgba(0,0,0,.45));
      }
      /* anillo sutil alrededor de la imagen */
      .loader-img::after { content: ''; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: calc(var(--loader-img-size, 140px) + 20px); height: calc(var(--loader-img-size, 140px) + 20px); border-radius: 50%; border: 2px solid rgba(255,255,255,0.06); box-shadow: 0 6px 18px rgba(255,120,20,0.06), inset 0 1px 0 rgba(255,255,255,0.02); animation: ringPulse 3.2s ease-in-out infinite; z-index:1 }
      @keyframes ringPulse { 0%{transform:translate(-50%,-50%) scale(.98); opacity:.7}50%{transform:translate(-50%,-50%) scale(1.04); opacity:1}100%{transform:translate(-50%,-50%) scale(.98); opacity:.7} }
      @keyframes loaderPump {
        0% { transform: translateY(0) scale(1) rotate(0deg); }
        28% { transform: translateY(-10px) scale(0.98) rotate(-3deg); }
        60% { transform: translateY(6px) scale(1.03) rotate(3deg); }
        100% { transform: translateY(0) scale(1) rotate(0deg); }
      }
      .loader-text {
        font-weight: 900;
        font-size: var(--loader-text-size, clamp(24px, 3.6vw, 46px));
        line-height: 1.05;
        letter-spacing: .08em;
        text-transform: uppercase;
        text-align: center;
        background: linear-gradient(to right, var(--grad-a, #ff7a18), var(--grad-b, #ff3d00));
        -webkit-background-clip: text; background-clip: text;
        -webkit-text-fill-color: transparent; color: transparent;
        -webkit-text-stroke: 1px rgba(0,0,0,.55);
        text-shadow:
          0 0 14px rgba(255, 120, 0, .35),
          0 0 28px rgba(255, 80, 0, .2);
        animation: textFlicker 2.8s ease-in-out infinite;
        will-change: filter, opacity;
      }
      .loader-text .line2 {
        display: block;
        margin-top: 4px;
        font-weight: 700;
        font-size: clamp(13px, 2.1vw, 18px);
        letter-spacing: .06em;
        -webkit-text-stroke: 0 transparent;
        -webkit-text-fill-color: var(--line2-color, rgba(255,255,255,.9));
        color: var(--line2-color, rgba(255,255,255,.9));
        text-shadow: 0 0 10px rgba(255,140,0,.35);
      }
      @keyframes textFlicker {
        0%, 100% { filter: brightness(1) saturate(1); opacity: 1; }
        10% { filter: brightness(1.1) saturate(1.1); opacity: .96; }
        20% { filter: brightness(.95) saturate(.95); opacity: .9; }
        28% { filter: brightness(1.2) saturate(1.15); opacity: 1; }
        42% { filter: brightness(.9) saturate(.9); opacity: .85; }
        55% { filter: brightness(1.15) saturate(1.1); opacity: 1; }
        73% { filter: brightness(.92) saturate(.92); opacity: .9; }
      }
      @keyframes pumpkinPulse {
        0% { transform: scale(1) rotate(0deg) skew(0deg, 0deg); opacity: 1; filter: drop-shadow(0 3px 6px rgba(0,0,0,.4)); }
        35% { transform: scale(0.9) rotate(-3deg) skew(-3deg, 1deg); opacity: 0.72; filter: hue-rotate(-10deg) saturate(120%) brightness(0.9) drop-shadow(0 4px 8px rgba(0,0,0,.5)); }
        70% { transform: scale(1.06) rotate(2deg) skew(2deg, -1deg); opacity: 0.88; filter: hue-rotate(6deg) saturate(110%) brightness(1.05) drop-shadow(0 4px 10px rgba(0,0,0,.5)); }
        100% { transform: scale(1) rotate(0deg) skew(0deg, 0deg); opacity: 1; filter: drop-shadow(0 3px 6px rgba(0,0,0,.4)); }
      }
      .fade-out { animation: hwFade .25s ease forwards; }
      @keyframes hwFade { to { opacity: 0; } }
    </style>`;
  }
  _getHalloweenInfo() {
    const now = /* @__PURE__ */ new Date();
    const y3 = now.getFullYear();
    const halloweenThis = new Date(y3, 9, 31);
    const msDay = 24 * 60 * 60 * 1e3;
    const isSameDay = now.getFullYear() === halloweenThis.getFullYear() && now.getMonth() === halloweenThis.getMonth() && now.getDate() === halloweenThis.getDate();
    if (isSameDay) {
      return { state: "here", message: "Halloween is Here!", daysLeft: 0 };
    }
    let target = halloweenThis;
    if (now > halloweenThis) {
      target = new Date(y3 + 1, 9, 31);
    }
    const diff = Math.ceil((target - now) / msDay);
    return { state: "soon", message: "Halloween Coming Soon", daysLeft: diff };
  }
  _renderLoader() {
    if (!this._loaderHost) return;
    const imgUrl = "https://firebasestorage.googleapis.com/v0/b/interscopemediacrm.appspot.com/o/halloween.webp?alt=media&token=dd44ec6f-3f17-44f2-9fa4-352a360eee01";
    const useImg = true;
    const bg = this.loaderBg || "#000";
    const { state, message, daysLeft } = this._getHalloweenInfo();
    const showCountdown = this.loaderShowCountdown && state === "soon";
    const txtColor = this.loaderTextColor || "#fff";
    const [gradA, gradB] = (this.loaderTextGradient || "#ff7a18,#ff3d00").split(",").map((s3) => s3.trim());
    const sizeVal = this.loaderTextSize || "clamp(24px, 3.6vw, 46px)";
    const ff = (this.loaderFontFamily || "").trim();
    B(x`
      ${this._loaderStyle()}
      <div class="hw-loader" aria-hidden="true" style="background:${bg}">
        <div class="loader-inner">
          ${useImg ? x`<span class="loader-img" style="--loader-img-size:${parseInt(this.loaderImgSize || "220", 10)}px"><img src="${imgUrl}" alt="calabaza" /></span>` : x`<span class="emoji">${this.loaderEmoji || "\u{1F383}"}</span>`}
          ${this.loaderText ? x`
            <div class="loader-text" style="--loader-text-size:${sizeVal}; --grad-a:${gradA}; --grad-b:${gradB}; ${ff ? `font-family:${ff};` : ""}">
              <span class="line1">${message}</span>
              ${showCountdown ? x`<span class="line2" style="--line2-color:${txtColor}">${daysLeft} ${daysLeft === 1 ? "day" : "days"} left</span>` : ""}
            </div>
          ` : ""}
        </div>
      </div>
    `, this._loaderHost);
  }
  _hideLoader() {
    if (!this._loaderHost) return;
    const el = this._loaderHost.querySelector(".hw-loader");
    if (el) {
      el.classList.add("fade-out");
      setTimeout(() => this._destroyLoaderHost(), 280);
    } else {
      this._destroyLoaderHost();
    }
    if (this._loaderTimer) {
      clearTimeout(this._loaderTimer);
      this._loaderTimer = null;
    }
  }
  styleTemplate() {
    return x`<style>
      :host {
        display: block;
        position: relative;
        contain: content;
      }

      .hw-container {
        position: relative;
        isolation: isolate; /* asegura que los adornos no escapen del stacking context */
        min-height: 200px;
      }

      /* Capa decorativa: no bloquea clics ni selección */
      .hw-decorations {
        pointer-events: none;
        position: absolute;
        inset: 0;
        overflow: visible;
        z-index: 1;
      }

      /* Contenido principal por encima de la capa decorativa */
      .hw-content {
        position: relative;
        z-index: 2;
      }

      /* Overlay de viewport: cubre toda la pantalla sin bloquear interacción */
      .hw-viewport-decorations {
        pointer-events: none;
        position: fixed;
        inset: 0;
        overflow: visible;
        z-index: 9999;
      }

      /* Elementos decorativos individuales */
      .deco {
        position: absolute;
        width: var(--deco-size, 28px);
        height: var(--deco-size, 28px);
        opacity: 0.9;
        filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5));
        pointer-events: auto; /* permitir interacción */
        cursor: pointer;
      }

      /* Variantes de posición base en esquinas */
      .corner-tl { top: 6px; left: 6px; }
      .corner-tr { top: 6px; right: 6px; }
      .corner-bl { bottom: 6px; left: 6px; }
      .corner-br { bottom: 6px; right: 6px; }

      /* Animaciones suaves para movimiento en los bordes */
      @keyframes floatX {
        0% { transform: var(--pre-transform, '') translateX(0) translateY(0) rotate(0deg); }
        50% { transform: var(--pre-transform, '') translateX(10px) translateY(-4px) rotate(2deg); }
        100% { transform: var(--pre-transform, '') translateX(0) translateY(0) rotate(0deg); }
      }
      @keyframes floatY {
        0% { transform: var(--pre-transform, '') translateY(0) rotate(0deg); }
        50% { transform: var(--pre-transform, '') translateY(-10px) rotate(-2deg); }
        100% { transform: var(--pre-transform, '') translateY(0) rotate(0deg); }
      }

      .float-x { animation: floatX 3.5s ease-in-out infinite; }
      .float-y { animation: floatY 4.2s ease-in-out infinite; }
      .delay-1 { animation-delay: .4s; }
      .delay-2 { animation-delay: .8s; }
      .delay-3 { animation-delay: 1.2s; }
      .delay-4 { animation-delay: 1.6s; }

      /* Aleteo de alas (murciélagos SVG) */
      .deco.bat-flap .wing-left, .deco.bat-flap .wing-right {
        transform-box: view-box;
        transform-origin: 32px 33px;
      }
      /* permitir rotar/voltear el deco por dirección de vuelo (se usa en .flock.ltr/.flock.rtl) */
      .deco.bat-flap { transform-origin: center; }
      .flock.ltr .deco.bat-flap { --pre-transform: rotate(6deg); }
      .flock.rtl .deco.bat-flap { --pre-transform: scaleX(-1) rotate(-6deg); }
      @keyframes flapL { 0%{transform:rotate(8deg)} 50%{transform:rotate(-10deg)} 100%{transform:rotate(8deg)} }
      @keyframes flapR { 0%{transform:rotate(-8deg)} 50%{transform:rotate(10deg)} 100%{transform:rotate(-8deg)} }
      .deco.bat-flap .wing-left {
        animation: flapL var(--flap-dur, .65s) ease-in-out infinite;
        animation-delay: var(--flap-delay, 0s);
      }
      .deco.bat-flap .wing-right {
        animation: flapR var(--flap-dur, .65s) ease-in-out infinite;
        animation-delay: var(--flap-delay, 0s);
      }

      /* Trayectorias por bordes */
      .edge-top { top: 2px; left: 10%; }
      .edge-top-2 { top: 2px; left: 70%; }
      .edge-left { left: 2px; top: 25%; }
      .edge-right { right: 2px; top: 60%; }
      .edge-bottom { bottom: 2px; left: 30%; }
      .edge-bottom-2 { bottom: 2px; left: 80%; }

      /* Imagenes SVG en línea para no depender de assets externos */
      .deco svg { width: 100%; height: 100%; display: block; }
      .deco img { width: 100%; height: 100%; display: block; object-fit: contain; }
      .deco .emoji { width: 100%; height: 100%; display: grid; place-items: center; font-size: calc(var(--deco-size, 28px) * 0.8); line-height: 1; }
    </style>`;
  }
  _overlayStyle() {
    return x`<style>
  .hw-viewport-decorations { position: fixed; inset: 0; width: 100vw; height: 100vh; pointer-events: auto; z-index: 9999; }
  .deco { position: absolute; width: var(--deco-size, 32px); height: var(--deco-size, 32px); opacity: .9; filter: drop-shadow(0 2px 2px rgba(0,0,0,.5)); }
      .deco svg { width: 100%; height: 100%; display: block; }
      .deco img { width: 100%; height: 100%; display: block; object-fit: contain; }
      .deco .emoji { width: 100%; height: 100%; display: grid; place-items: center; font-size: calc(var(--deco-size, 28px) * .8); line-height: 1; }
      @keyframes floatX { 0%{transform:translateX(0) translateY(0) rotate(0)} 50%{transform:translateX(10px) translateY(-4px) rotate(2deg)} 100%{transform:translateX(0) translateY(0) rotate(0)} }
      @keyframes floatY { 0%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-10px) rotate(-2deg)} 100%{transform:translateY(0) rotate(0)} }
      .float-x { animation: floatX 3.5s ease-in-out infinite; }
      .float-y { animation: floatY 4.2s ease-in-out infinite; }
      /* Aleteo de alas solo para murciélagos SVG */
      .deco.bat-flap .wing-left, .deco.bat-flap .wing-right { transform-box: view-box; transform-origin: 32px 32px; }
      @keyframes flapL { 0%{transform:rotate(8deg)} 50%{transform:rotate(-10deg)} 100%{transform:rotate(8deg)} }
      @keyframes flapR { 0%{transform:rotate(-8deg)} 50%{transform:rotate(10deg)} 100%{transform:rotate(-8deg)} }
      .deco.bat-flap .wing-left { animation: flapL var(--flap-dur, .65s) ease-in-out infinite; animation-delay: var(--flap-delay, 0s); }
      .deco.bat-flap .wing-right { animation: flapR var(--flap-dur, .65s) ease-in-out infinite; animation-delay: var(--flap-delay, 0s); }

      /* Manada: cruzan la pantalla */
  .flock { position: absolute; left: 0; right: 0; height: 0; pointer-events: none; }
      .flock-track { position: absolute; top: 0; left: -12%; width: 124%; height: 0; pointer-events: none; }
      .flock.ltr .flock-track { animation: flyLR var(--flock-speed, 8s) linear forwards; }
      .flock.rtl .flock-track { animation: flyRL var(--flock-speed, 8s) linear forwards; }
      @keyframes flyLR { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
      @keyframes flyRL { from { transform: translateX(100%); } to { transform: translateX(-100%); } }
      .flock-item { position: absolute; transform: translateY(var(--dy, 0px)); will-change: transform; }
      .flock-item .deco { position: relative; }

  /* Efectos interactivos: murciélagos que emergen al tocar decoraciones */
  .interactive-bat { position: fixed; pointer-events: none; transform: translate(-50%,-50%); z-index:10002; }
  .interactive-bat .deco { --deco-size:18px; animation: batPop var(--dur,1.2s) cubic-bezier(.22,.9,.32,1) forwards; }
  @keyframes batPop { 0% { transform: translateY(0) scale(.2) rotate(-10deg); opacity:0 } 20% { transform: translateY(-6px) scale(1.06) rotate(4deg); opacity:1 } 100% { transform: translate(var(--dx), calc(var(--dy) * -1)) scale(1) rotate(6deg); opacity:1 } }

      /* Corner bursts (más natural) con fade in/out suave */
      @keyframes cornerDrift {
        0% { transform: translate(0,0) rotate(0deg); opacity: 0; }
        12% { opacity: .9; }
        82% { opacity: 1; }
        100% { transform: translate(var(--dx, 60px), var(--dy, 60px)) rotate(var(--rot, 6deg)); opacity: 0; }
      }
      @keyframes wiggle {
        0%,100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-2px) rotate(1.5deg); }
      }
      .corner-item { position: absolute; pointer-events: none; }
      .corner-track { position: absolute; will-change: transform, opacity; animation: cornerDrift var(--corner-speed, 2.8s) ease-out forwards; }
      .corner-deco { position: relative; animation: wiggle var(--wiggle-speed, 0.8s) ease-in-out infinite; }

      /* Corner sweep: aparece y desaparece en la misma esquina con fade-out más largo */
      @keyframes sweepMove {
        0% { transform: translate(var(--from-x, 0px), var(--from-y, 0px)); opacity: 0; }
        12% { opacity: .9; }
        72% { opacity: 1; }
        100% { transform: translate(var(--to-x, 60px), var(--to-y, 60px)); opacity: 0; }
      }
      .corner-sweep { position: absolute; pointer-events: none; }
      .corner-sweep-track { position: absolute; will-change: transform, opacity; animation: sweepMove var(--sweep-dur, 2.6s) ease-in-out forwards; }

      /* Corner cluster (manada) con fade suave */
      @keyframes clusterDrift {
        0% { transform: translate(var(--c-from-x, 0px), var(--c-from-y, 0px)); opacity: 0; }
        12% { opacity: .9; }
        74% { opacity: 1; }
        100% { transform: translate(var(--c-to-x, 80px), var(--c-to-y, 80px)); opacity: 0; }
      }
      .corner-cluster { position: absolute; pointer-events: none; }
      .corner-cluster-track { position: absolute; will-change: transform, opacity; animation: clusterDrift var(--cluster-dur, 3s) ease-in-out forwards; }
      .corner-cluster-item { position: absolute; transform: translate(var(--ix, 0px), var(--iy, 0px)); }
  /* Drops: arañas que caen desde arriba */
  .drop-item { position: absolute; top: 0; pointer-events: auto; transform: translateX(-50%); width: var(--deco-size, 44px); }
  .drop-track { position: relative; width: 100%; margin: 0; padding: 0; display: block; transform-origin: top center; height: var(--drop-len, 160px); }
  /* la línea se dibuja desde la parte superior del contenedor .drop-spider hacia arriba
    colocando la línea dentro de .drop-spider y usando bottom:100% aseguramos que el
    extremo inferior de la línea coincida exactamente con la parte superior del contenedor */
  .drop-spider { position: absolute; left: 50%; bottom: 0; transform: translateX(-50%); display: block; width: var(--deco-size); height: var(--deco-size); }
  .drop-spider .drop-line { position: absolute; left: 50%; bottom: 100%; transform: translateX(-50%); width: 1px; background: currentColor; opacity: .95; height: var(--drop-len, 160px); }
  /* asegurar que la .deco interna se centre dentro del contenedor .drop-spider */
  .drop-spider .deco { position: relative; left: 50%; transform: translateX(-50%); top: 0; width: var(--deco-size); height: var(--deco-size); }
  .drop-track { animation: dropDown var(--drop-speed, 2.6s) linear forwards; }
  @keyframes dropDown { from { transform: translateY(calc(-1 * var(--drop-len, 160px))); } to { transform: translateY(0); } }
  /* después de caer, la araña comienza a 'caminar' moviendo el cuerpo y las patas */
  .drop-spider svg { transform: scale(1.06, 1.00); }
  .drop-spider .leg { transform-box: fill-box; transform-origin: 50% 20%; animation: legWalk .9s ease-in-out infinite; animation-delay: var(--drop-speed); }
  .drop-spider .leg.l1 { animation-delay: calc(var(--drop-speed) + 0.02s); }
  .drop-spider .leg.l2 { animation-delay: calc(var(--drop-speed) + 0.06s); }
  .drop-spider .leg.l3 { animation-delay: calc(var(--drop-speed) + 0.04s); }
  .drop-spider .leg.l4 { animation-delay: calc(var(--drop-speed) + 0.08s); }
  .drop-spider .leg.l5 { animation-delay: calc(var(--drop-speed) + 0.10s); }
  .drop-spider .leg.l6 { animation-delay: calc(var(--drop-speed) + 0.14s); }
  .drop-spider .leg.l7 { animation-delay: calc(var(--drop-speed) + 0.12s); }
  .drop-spider .leg.l8 { animation-delay: calc(var(--drop-speed) + 0.16s); }
  @keyframes legWalk { 0% { transform: rotate(0deg); } 50% { transform: rotate(14deg); } 100% { transform: rotate(0deg); } }
  .drop-spider { animation: spiderBodyWalk 1.2s ease-in-out infinite; animation-delay: var(--drop-speed); }
  @keyframes spiderBodyWalk { 0% { transform: translateX(0); } 50% { transform: translateX(6px); } 100% { transform: translateX(0); } }
    </style>`;
  }
  _overlayTemplate(theme) {
    return x`
      ${this._overlayStyle()}
      <div class="hw-viewport-decorations" aria-hidden="true">
        ${this.movement === "flock" ? this._renderFlocks(theme) : this.movement === "corner" ? this.movementCornerPattern === "sweep" ? this._renderCornerSweeps(theme) : this.movementCornerPattern === "cluster" ? this._renderCornerClusters(theme) : this._renderCornerBursts(theme) : this.spread === "full" ? this._fullSpread(theme) : this._edgeSpreadViewport(theme)}
        ${this._renderDrops(theme)}
        ${this.showBottomPumpkins ? this._renderBottomPumpkins() : ""}
      </div>
    `;
  }
  _renderBottomPumpkins() {
    const styleBL = "position:fixed; left:-32px; bottom:0; z-index:10001; pointer-events:auto; width:96px; height:96px;";
    const styleBR = "position:fixed; right:-32px; bottom:0; z-index:10001; pointer-events:auto; width:96px; height:96px;";
    const imgUrl = "https://firebasestorage.googleapis.com/v0/b/interscopemediacrm.appspot.com/o/halloween.webp?alt=media&token=dd44ec6f-3f17-44f2-9fa4-352a360eee01";
    return x`
      <span style="${styleBL}"><img src="${imgUrl}" alt="calabaza" style="width:96px;height:96px;object-fit:contain;" /></span>
      <span style="${styleBR}"><img src="${imgUrl}" alt="calabaza" style="width:96px;height:96px;object-fit:contain;" /></span>
    `;
  }
  _cornerCount() {
    const d3 = (this.movementCornerSize || "").toString().trim().toLowerCase();
    if (!d3) return 8;
    if (/^\d+$/.test(d3)) return Math.max(1, parseInt(d3, 10));
    if (d3 === "low") return 5;
    if (d3 === "medium") return 8;
    if (d3 === "high") return 12;
    return 8;
  }
  _insetsForCorner(corner) {
    const offset = `${parseInt(this.edgeOffset || "2", 10)}px`;
    const topInset = this.edgeSafeArea ? `calc(env(safe-area-inset-top) + ${offset})` : offset;
    const bottomInset = this.edgeSafeArea ? `calc(env(safe-area-inset-bottom) + ${offset})` : offset;
    const leftInset = this.edgeSafeArea ? `calc(env(safe-area-inset-left) + ${offset})` : offset;
    const rightInset = this.edgeSafeArea ? `calc(env(safe-area-inset-right) + ${offset})` : offset;
    switch (corner) {
      case "tl":
        return { top: topInset, left: leftInset };
      case "tr":
        return { top: topInset, right: rightInset };
      case "bl":
        return { bottom: bottomInset, left: leftInset };
      case "br":
        return { bottom: bottomInset, right: rightInset };
      default:
        return { top: topInset, left: leftInset };
    }
  }
  _renderCornerBursts(theme) {
    const sizeBase = parseInt(this.size || "32", 10);
    const color = this._colorFor(theme);
    const spread = Math.max(40, parseInt(this.movementCornerSpread || "140", 10));
    return this._cornerBursts.map((b3) => {
      const { corner, items } = b3;
      const inset = this._insetsForCorner(corner);
      return x`
        ${items.map((it, i5) => {
        const s3 = (0.55 + Math.random() * 0.35).toFixed(2);
        const dx = (corner.includes("r") ? -it.dx : it.dx).toFixed(1) + "px";
        const dy = (corner.includes("b") ? -it.dy : it.dy).toFixed(1) + "px";
        const dur = it.speed.toFixed(2) + "s";
        const delay = it.delay.toFixed(2) + "s";
        const wig = (0.7 + Math.random() * 0.5).toFixed(2) + "s";
        const inlinePos = Object.entries(inset).map(([k2, v2]) => `${k2}:${v2}`).join(";");
        const styleTrack = `${inlinePos}; --corner-speed:${dur}; --dx:${dx}; --dy:${dy}; --rot:${(Math.random() * 8 - 4).toFixed(1)}deg; animation-delay:${delay};`;
        const styleDeco = `--deco-size:${Math.round(sizeBase * s3)}px;`;
        return x`
            <div class="corner-item" style="${inlinePos};">
              <div class="corner-track" style="${styleTrack}">
                <span class="corner-deco" style="--wiggle-speed:${wig};">
                  ${this._deco(theme, "", color, i5, styleDeco)}
                </span>
              </div>
            </div>`;
      })}
      `;
    });
  }
  _maybeStartCornerBursts() {
    const can = this.scope === "viewport" && !this.onlyLoader && this.movement === "corner" && this.movementCornerPattern !== "sweep";
    if (can) {
      if (!this._cornerIntervalId) {
        this._spawnCornerBurst();
        const every = Math.max(1200, parseInt((this.movementCornerEvery || "5000").toString(), 10) || 5e3);
        this._cornerIntervalId = setInterval(() => this._spawnCornerBurst(), every);
      }
    } else {
      this._stopCornerBursts();
      this._cornerBursts = [];
      if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    }
  }
  _stopCornerBursts() {
    if (this._cornerIntervalId) {
      clearInterval(this._cornerIntervalId);
      this._cornerIntervalId = null;
    }
  }
  _spawnCornerBurst() {
    const corners = ["tl", "tr", "bl", "br"];
    const corner = corners[Math.floor(Math.random() * corners.length)];
    const count = this._cornerCount();
    const spread = Math.max(40, parseInt(this.movementCornerSpread || "140", 10));
    const items = Array.from({ length: count }).map(() => ({
      dx: this._rand(spread * 0.35, spread),
      dy: this._rand(spread * 0.35, spread),
      speed: this._rand(2.1, 3.6),
      delay: this._rand(0, 0.8)
    }));
    const burst = { id: Math.random().toString(36).slice(2), corner, items };
    this._cornerBursts = [...this._cornerBursts, burst].slice(-4);
    if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    const maxDur = Math.max(...items.map((it) => it.speed)) * 1e3 + 1200;
    setTimeout(() => {
      this._cornerBursts = this._cornerBursts.filter((b3) => b3.id !== burst.id);
      if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    }, maxDur);
  }
  // --- Corner Sweeps (aparecen y desaparecen dentro de la misma esquina) ---
  _renderCornerSweeps(theme) {
    const sizeBase = parseInt(this.size || "36", 10);
    const color = this._colorFor(theme);
    return this._cornerSweeps.map((swp) => {
      const inset = this._insetsForCorner(swp.corner);
      return x`
        ${swp.items.map((it, i5) => {
        const inlinePos = Object.entries(inset).map(([k2, v2]) => `${k2}:${v2}`).join(";");
        const styleTrack = `${inlinePos}; --from-x:${it.fx}px; --from-y:${it.fy}px; --to-x:${it.tx}px; --to-y:${it.ty}px; --sweep-dur:${it.dur.toFixed(2)}s; animation-delay:${it.delay.toFixed(2)}s;`;
        const scale = (0.85 + Math.random() * 0.25).toFixed(2);
        const styleDeco = `--deco-size:${Math.round(sizeBase * scale)}px;`;
        return x`
            <div class="corner-sweep" style="${inlinePos};">
              <div class="corner-sweep-track" style="${styleTrack}">
                <span class="corner-deco" style="${styleDeco}">${this._deco(theme, "", color, i5)}</span>
              </div>
            </div>`;
      })}
      `;
    });
  }
  _maybeStartCornerSweeps() {
    const can = this.scope === "viewport" && !this.onlyLoader && this.movement === "corner" && this.movementCornerPattern === "sweep";
    if (can) {
      if (!this._cornerSweepIntervalId) {
        this._spawnCornerSweep();
        const every = Math.max(1200, parseInt((this.movementCornerEvery || "5000").toString(), 10) || 5e3);
        this._cornerSweepIntervalId = setInterval(() => this._spawnCornerSweep(), every);
      }
    } else {
      this._stopCornerSweeps();
      this._cornerSweeps = [];
      if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    }
  }
  _stopCornerSweeps() {
    if (this._cornerSweepIntervalId) {
      clearInterval(this._cornerSweepIntervalId);
      this._cornerSweepIntervalId = null;
    }
  }
  _signedByCorner(x2, y3, corner) {
    let sx = x2, sy = y3;
    if (corner.includes("r")) sx = -sx;
    if (corner.includes("b")) sy = -sy;
    return { x: sx, y: sy };
  }
  _spawnCornerSweep() {
    const corners = ["tl", "tr", "bl", "br"];
    const corner = corners[Math.floor(Math.random() * corners.length)];
    const zone = Math.max(60, parseInt(this.movementCornerSpread || "140", 10));
    const count = this._cornerCount();
    const items = Array.from({ length: count }).map(() => {
      const horizFirst = Math.random() > 0.5;
      const hx1 = this._rand(zone * 0.1, zone * 0.5);
      const hy1 = this._rand(0, zone * 0.25);
      const hx2 = this._rand(zone * 0.2, zone * 0.7);
      const hy2 = this._rand(zone * 0.2, zone * 0.7);
      let fx = horizFirst ? -hx1 : -hy1;
      let fy = horizFirst ? -hy1 : -hx1;
      let tx = horizFirst ? hx2 : hy2;
      let ty = horizFirst ? hy2 : hx2;
      const s3 = this._signedByCorner(fx, fy, corner);
      fx = s3.x;
      fy = s3.y;
      const e4 = this._signedByCorner(tx, ty, corner);
      tx = e4.x;
      ty = e4.y;
      return {
        fx,
        fy,
        tx,
        ty,
        dur: this._rand(2, 3.2),
        delay: this._rand(0, 0.8)
      };
    });
    const sweep = { id: Math.random().toString(36).slice(2), corner, items };
    this._cornerSweeps = [...this._cornerSweeps, sweep].slice(-4);
    if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    const maxDur = Math.max(...items.map((it) => it.dur)) * 1e3 + 1200;
    setTimeout(() => {
      this._cornerSweeps = this._cornerSweeps.filter((s3) => s3.id !== sweep.id);
      if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    }, maxDur);
  }
  _renderCornerClusters(theme) {
    const sizeBase = parseInt(this.size || "36", 10);
    const color = this._colorFor(theme);
    return this._cornerClusters.map((cls) => {
      const inset = this._insetsForCorner(cls.corner);
      const inlinePos = Object.entries(inset).map(([k2, v2]) => `${k2}:${v2}`).join(";");
      const styleTrack = `${inlinePos}; --cluster-dur:${cls.dur.toFixed(2)}s; --c-from-x:${cls.fx}px; --c-from-y:${cls.fy}px; --c-to-x:${cls.tx}px; --c-to-y:${cls.ty}px; animation-delay:${cls.delay.toFixed(2)}s;`;
      return x`
        <div class="corner-cluster" style="${inlinePos}">
          <div class="corner-cluster-track" style="${styleTrack}">
            ${cls.items.map((it, i5) => {
        const fDur = this._rand(0.52, 0.78).toFixed(2) + "s";
        const fDelay = this._rand(0, 0.6).toFixed(2) + "s";
        const scale = (0.85 + Math.random() * 0.4).toFixed(2);
        const styleItem = `--ix:${it.ix}px; --iy:${it.iy}px;`;
        const styleDeco = `--deco-size:${Math.round(sizeBase * scale)}px; --flap-dur:${fDur}; --flap-delay:${fDelay};`;
        return x`<div class="corner-cluster-item" style="${styleItem}">${this._deco(theme, "float-y", color, i5, styleDeco)}</div>`;
      })}
          </div>
        </div>
      `;
    });
  }
  _maybeStartCornerClusters() {
    const can = this.scope === "viewport" && !this.onlyLoader && this.movement === "corner" && this.movementCornerPattern === "cluster";
    if (can) {
      if (!this._cornerClusterIntervalId) {
        this._spawnCornerCluster();
        const every = Math.max(1200, parseInt((this.movementCornerEvery || "5000").toString(), 10) || 5e3);
        this._cornerClusterIntervalId = setInterval(() => this._spawnCornerCluster(), every);
      }
    } else {
      this._stopCornerClusters();
      this._cornerClusters = [];
      if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    }
  }
  _stopCornerClusters() {
    if (this._cornerClusterIntervalId) {
      clearInterval(this._cornerClusterIntervalId);
      this._cornerClusterIntervalId = null;
    }
  }
  _spawnCornerCluster() {
    const corners = ["tl", "tr", "bl", "br"];
    const corner = corners[Math.floor(Math.random() * corners.length)];
    const zone = Math.max(80, parseInt(this.movementCornerClusterRadius || this.movementCornerSpread || "140", 10));
    const count = this._cornerCount();
    let fx = this._rand(zone * 0.1, zone * 0.35);
    let fy = this._rand(zone * 0.1, zone * 0.35);
    let tx = this._rand(zone * 0.5, zone * 0.9);
    let ty = this._rand(zone * 0.5, zone * 0.9);
    const s1 = this._signedByCorner(fx, fy, corner);
    fx = s1.x;
    fy = s1.y;
    const s22 = this._signedByCorner(tx, ty, corner);
    tx = s22.x;
    ty = s22.y;
    const items = Array.from({ length: count }).map(() => ({
      ix: this._rand(-zone * 0.35, zone * 0.35),
      iy: this._rand(-zone * 0.35, zone * 0.35)
    }));
    const cluster = {
      id: Math.random().toString(36).slice(2),
      corner,
      fx,
      fy,
      tx,
      ty,
      dur: this._rand(2.6, 3.8),
      delay: this._rand(0, 0.8),
      items
    };
    this._cornerClusters = [...this._cornerClusters, cluster].slice(-4);
    if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    const ttl = cluster.dur * 1e3 + 1200;
    setTimeout(() => {
      this._cornerClusters = this._cornerClusters.filter((c4) => c4.id !== cluster.id);
      if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    }, ttl);
  }
  _flockCount() {
    const d3 = (this.flockSize || "").toString().trim().toLowerCase();
    if (!d3) return 12;
    if (/^\d+$/.test(d3)) return Math.max(1, parseInt(d3, 10));
    if (d3 === "low") return 8;
    if (d3 === "medium") return 12;
    if (d3 === "high") return 20;
    return 12;
  }
  _renderFlocks(theme) {
    const size = parseInt(this.size || "44", 10);
    const color = this._colorFor(theme);
    return this._flocks.map((f3) => {
      const items = [];
      for (let i5 = 0; i5 < f3.count; i5++) {
        const spreadY = f3.spreadY;
        const dy = Math.random() * spreadY - spreadY / 2;
        const offsetX = i5 * f3.spacing + (Math.random() * 8 - 4);
        const delay = (Math.random() * 0.4).toFixed(2) + "s";
        const fDur = this._rand(0.52, 0.78).toFixed(2) + "s";
        const fDelay = this._rand(0, 0.6).toFixed(2) + "s";
        const style = `left: ${offsetX}px; --dy:${dy.toFixed(1)}px; --deco-size:${size}px; --flap-dur:${fDur}; --flap-delay:${fDelay}; animation-delay:${delay};`;
        items.push(x`<div class="flock-item" style="${style}">${this._deco(theme, "float-y", color, i5)}</div>`);
      }
      const top = f3.y;
      const dirCls = f3.dir === "ltr" ? "ltr" : "rtl";
      const speed = `${f3.speed}s`;
      return x`
        <div class="flock ${dirCls}" style="top:${top}%;">
          <div class="flock-track" style="--flock-speed:${speed};">
            ${items}
          </div>
        </div>
      `;
    });
  }
  _maybeStartFlocks() {
    const can = this.scope === "viewport" && !this.onlyLoader && this.movement === "flock";
    if (can) {
      if (!this._flockIntervalId) {
        this._spawnFlock();
        const every = Math.max(1500, parseInt((this.flockEvery || "7000").toString(), 10) || 7e3);
        this._flockIntervalId = setInterval(() => this._spawnFlock(), every);
      }
    } else {
      this._stopFlocks();
      this._flocks = [];
      if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    }
  }
  _stopFlocks() {
    if (this._flockIntervalId) {
      clearInterval(this._flockIntervalId);
      this._flockIntervalId = null;
    }
  }
  _spawnFlock() {
    const count = this._flockCount();
    const y3 = this._rand(15, 85);
    const dir = Math.random() > 0.5 ? "ltr" : "rtl";
    const speed = Math.max(3, parseInt(this.flockSpeed || "8", 10));
    const spreadY = this._rand(18, 48);
    const spacing = this._rand(18, 36);
    const flock = { id: Math.random().toString(36).slice(2), y: y3, dir, speed, spreadY, spacing, count };
    this._flocks = [...this._flocks, flock];
    if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    setTimeout(() => {
      this._flocks = this._flocks.filter((f3) => f3.id !== flock.id);
      if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    }, speed * 1e3 + 1e3);
  }
  // --- Drops (arañas que caen desde arriba) ---
  _maybeStartDrops() {
    const can = this.scope === "viewport" && !this.onlyLoader;
    if (can) {
      if (!this._dropIntervalId) {
        this._spawnDrop();
        const every = Math.max(400, parseInt((this.dropEvery || "1800").toString(), 10) || 1800);
        this._dropIntervalId = setInterval(() => this._spawnDrop(), every);
      }
    } else {
      this._stopDrops();
      this._drops = [];
      if (this._viewportHost) this._renderOverlay((this.theme || "bat").toLowerCase());
    }
  }
  _stopDrops() {
    if (this._dropIntervalId) {
      clearInterval(this._dropIntervalId);
      this._dropIntervalId = null;
    }
  }
  _spawnDrop() {
    const baseLeft = this._rand(6, 94);
    const per = Math.max(1, parseInt(this.dropPerSpawn || "1", 10));
    const maxSimult = 6;
    const canAdd = Math.max(0, maxSimult - this._drops.length);
    const toAdd = Math.min(per, canAdd);
    for (let i5 = 0; i5 < toAdd; i5++) {
      const jitter = this._rand(-6, 6);
      const left = Math.min(98, Math.max(2, baseLeft + jitter));
      const len = Math.round(this._rand(120, 380));
      const speed = this._rand(2.1, 3.6);
      const delay = this._rand(0, 0.6);
      const size = Math.max(14, parseInt(this.size || "28", 10) * (0.7 + Math.random() * 0.6));
      const drop = { id: Math.random().toString(36).slice(2), left, len, speed, delay, size };
      this._drops = [...this._drops, drop].slice(-maxSimult);
    }
    if (this._viewportHost) this._renderOverlay((this.theme || "spider").toLowerCase());
    this._drops.forEach((d3) => {
      setTimeout(() => {
        this._drops = this._drops.filter((x2) => x2.id !== d3.id);
        if (this._viewportHost) this._renderOverlay((this.theme || "spider").toLowerCase());
      }, d3.speed * 1e3 + 2e3);
    });
  }
  _renderDrops(theme) {
    if (!this._drops || this._drops.length === 0) return "";
    const color = this._colorFor("spider");
    return this._drops.map((d3, i5) => {
      const left = d3.left.toFixed(1) + "%";
      const len = d3.len + "px";
      const speed = d3.speed.toFixed(2) + "s";
      const delay = d3.delay.toFixed(2) + "s";
      const attach = Math.max(4, Math.round(d3.size * 0.5));
      const inline = `left:${left}; color:${color}; --drop-len:${len}; --drop-speed:${speed}; --attach-offset:${attach}px; --deco-size:${Math.round(d3.size)}px; animation-delay:${delay};`;
      const spiderStyle = `--deco-size:${Math.round(d3.size)}px;`;
      return x`
        <div class="drop-item" style="${inline}" aria-hidden="true">
          <div class="drop-track" style="height:${len}; --drop-speed:${speed}; animation-delay:${delay};">
            <span class="drop-line"></span>
            <span class="drop-spider" style="--deco-size:${Math.round(d3.size)}px; animation-duration:${speed}; animation-delay:${delay};">${this._deco("spider", "", color, i5, spiderStyle)}</span>
          </div>
        </div>
      `;
    });
  }
  /**
   * Renderiza un icono temático basado en el tipo.
   * @param {"bat"|"spider"|"pumpkin"} type
   */
  _icon(type = "bat") {
    switch (type) {
      case "bat":
        return x`
          <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <g fill="currentColor">
              <!-- ala izquierda -->
              <g class="wing-left">
                <path d="M32 32
                         C 26 30, 20 27, 12 28
                         C 10 32, 7 35, 4 38
                         C 10 38, 15 40, 19 42
                         C 22 40, 26 38, 32 38 Z"/>
              </g>
              <!-- ala derecha -->
              <g class="wing-right">
                <path d="M32 32
                         C 38 30, 44 27, 52 28
                         C 54 32, 57 35, 60 38
                         C 54 38, 49 40, 45 42
                         C 42 40, 38 38, 32 38 Z"/>
              </g>
              <!-- cuerpo -->
              <ellipse cx="32" cy="33" rx="5" ry="8"/>
              <!-- orejas -->
              <path d="M29 26 L27 22 L31 24 Z"/>
              <path d="M35 26 L37 22 L33 24 Z"/>
            </g>
          </svg>`;
      case "spider":
        return x`<span class="emoji" aria-hidden="true">🕷️</span>`;
      case "pumpkin":
        return x`
          <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <g fill="currentColor">
              <path d="M24 12 c-6 0-10 8-10 18s4 18 10 18c2 0 4-1 8-1s6 1 8 1c6 0 10-8 10-18S46 12 40 12c-2 0-4 1-8 1s-6-1-8-1z"/>
              <rect x="30" y="8" width="4" height="6" rx="2"/>
              <path d="M26 28 l4 4 l-4 4 M38 28 l-4 4 l4 4" stroke="#111" stroke-width="3" fill="none"/>
            </g>
          </svg>`;
      default:
        return x`
          <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <g fill="currentColor">
              <path d="M2 36
                        Q10 28 18 28
                        Q22 28 28 31
                        Q30 26 32 26
                        Q34 26 36 31
                        Q42 28 46 28
                        Q54 28 62 36
                        Q54 34 50 42
                        Q44 38 32 38
                        Q20 38 14 42
                        Q10 34 2 36Z"/>
              <ellipse cx="32" cy="32" rx="5" ry="7"/>
              <path d="M29 26 L27 22 L31 24 Z"/>
              <path d="M35 26 L37 22 L33 24 Z"/>
            </g>
          </svg>`;
    }
  }
  _colorFor(theme) {
    const t3 = (theme || "").toLowerCase();
    if (t3 === "pumpkin") return "#ff6b00";
    if (this.dark) return "#ffffff";
    return "#1f1f1f";
  }
  /**
   * Genera un elemento decorativo con clases y color.
   */
  _deco(type, classes = "", color = "#ff6b00", i5 = 0, inlineStyle = "") {
    const assetsList = (this.assets || "").split(",").map((s3) => s3.trim()).filter(Boolean);
    const addFlap = this.source === "svg" && type === "bat" && this.flap;
    const cls = `${classes}${addFlap ? " bat-flap" : ""}`;
    if (this.source === "assets" && assetsList.length > 0) {
      const src = assetsList[i5 % assetsList.length];
      return x`<span class="deco ${cls}" style="${inlineStyle}"><img src="${src}" alt="" /></span>`;
    }
    if (this.source === "emoji") {
      const char = this.emoji || "\u{1F987}";
      return x`<span class="deco ${cls}" style="${inlineStyle}"><span class="emoji" aria-hidden="true">${char}</span></span>`;
    }
    return x`<span class="deco ${cls}" style="color:${color};${inlineStyle}">${this._icon(type)}</span>`;
  }
  _rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  _parseDensity() {
    const d3 = (this.density || "").toString().trim().toLowerCase();
    if (!d3) return 0;
    if (/^\d+$/.test(d3)) return Math.max(1, parseInt(d3, 10));
    if (d3 === "low") return 10;
    if (d3 === "medium") return 18;
    if (d3 === "high") return 28;
    return 16;
  }
  _fullSpread(theme) {
    const count = this._parseDensity() || 20;
    const size = parseInt(this.size || "28", 10);
    const items = [];
    for (let i5 = 0; i5 < count; i5++) {
      const top = this._rand(4, 96);
      const left = this._rand(3, 97);
      const dur = this._rand(3, 6).toFixed(2) + "s";
      const delay = this._rand(0, 1.6).toFixed(2) + "s";
      const fDur = this._rand(0.52, 0.78).toFixed(2) + "s";
      const fDelay = this._rand(0, 0.6).toFixed(2) + "s";
      const axis = Math.random() > 0.5 ? "float-x" : "float-y";
      const inline = `--deco-size:${size}px; top:${top}%; left:${left}%; animation-duration:${dur}; animation-delay:${delay}; --flap-dur:${fDur}; --flap-delay:${fDelay};`;
      items.push(this._deco(theme, axis, this._colorFor(theme), i5, inline));
    }
    return items;
  }
  _edgeSpreadViewport(theme) {
    const total = this._parseDensity() || 24;
    const size = parseInt(this.size || "28", 10);
    const perEdge = Math.max(3, Math.round(total / 4));
    const items = [];
    let idx = 0;
    const offset = `${parseInt(this.edgeOffset || "2", 10)}px`;
    for (let i5 = 0; i5 < perEdge; i5++, idx++) {
      const left = this._rand(3, 97);
      const dur = this._rand(3, 6).toFixed(2) + "s";
      const delay = this._rand(0, 1.6).toFixed(2) + "s";
      const fDur = this._rand(0.52, 0.78).toFixed(2) + "s";
      const fDelay = this._rand(0, 0.6).toFixed(2) + "s";
      const topInset = this.edgeSafeArea ? `calc(env(safe-area-inset-top) + ${offset})` : offset;
      const inline = `--deco-size:${size}px; top:${topInset}; left:${left}%; animation-duration:${dur}; animation-delay:${delay}; --flap-dur:${fDur}; --flap-delay:${fDelay};`;
      items.push(this._deco(theme, "float-x", this._colorFor(theme), idx, inline));
    }
    for (let i5 = 0; i5 < perEdge; i5++, idx++) {
      const left = this._rand(3, 97);
      const dur = this._rand(3, 6).toFixed(2) + "s";
      const delay = this._rand(0, 1.6).toFixed(2) + "s";
      const fDur = this._rand(0.52, 0.78).toFixed(2) + "s";
      const fDelay = this._rand(0, 0.6).toFixed(2) + "s";
      const bottomInset = this.edgeSafeArea ? `calc(env(safe-area-inset-bottom) + ${offset})` : offset;
      const inline = `--deco-size:${size}px; bottom:${bottomInset}; left:${left}%; animation-duration:${dur}; animation-delay:${delay}; --flap-dur:${fDur}; --flap-delay:${fDelay};`;
      items.push(this._deco(theme, "float-x", this._colorFor(theme), idx, inline));
    }
    for (let i5 = 0; i5 < perEdge; i5++, idx++) {
      const top = this._rand(4, 96);
      const dur = this._rand(3, 6).toFixed(2) + "s";
      const delay = this._rand(0, 1.6).toFixed(2) + "s";
      const fDur = this._rand(0.52, 0.78).toFixed(2) + "s";
      const fDelay = this._rand(0, 0.6).toFixed(2) + "s";
      const leftInset = this.edgeSafeArea ? `calc(env(safe-area-inset-left) + ${offset})` : offset;
      const inline = `--deco-size:${size}px; left:${leftInset}; top:${top}%; animation-duration:${dur}; animation-delay:${delay}; --flap-dur:${fDur}; --flap-delay:${fDelay};`;
      items.push(this._deco(theme, "float-y", this._colorFor(theme), idx, inline));
    }
    for (let i5 = 0; i5 < perEdge; i5++, idx++) {
      const top = this._rand(4, 96);
      const dur = this._rand(3, 6).toFixed(2) + "s";
      const delay = this._rand(0, 1.6).toFixed(2) + "s";
      const fDur = this._rand(0.52, 0.78).toFixed(2) + "s";
      const fDelay = this._rand(0, 0.6).toFixed(2) + "s";
      const rightInset = this.edgeSafeArea ? `calc(env(safe-area-inset-right) + ${offset})` : offset;
      const inline = `--deco-size:${size}px; right:${rightInset}; top:${top}%; animation-duration:${dur}; animation-delay:${delay}; --flap-dur:${fDur}; --flap-delay:${fDelay};`;
      items.push(this._deco(theme, "float-y", this._colorFor(theme), idx, inline));
    }
    return items;
  }
  render() {
    const theme = (this.theme || "bat").toLowerCase();
    return x`
      ${this.styleTemplate()}
      <div class="hw-container">
        <!-- Capa decorativa en bordes y esquinas -->
        ${this.onlyLoader ? "" : this.scope === "viewport" ? "" : x`<div class="hw-decorations" aria-hidden="true">
                ${this.spread === "full" ? this._fullSpread(theme) : x`
                      ${this._deco(theme, "corner-tl float-x", this._colorFor(theme), 0, `--deco-size:${parseInt(this.size || "28", 10)}px;`)}
                      ${this._deco(theme, "corner-tr float-y delay-1", this._colorFor(theme), 1, `--deco-size:${parseInt(this.size || "28", 10)}px;`)}
                      ${this._deco(theme, "corner-bl float-y delay-2", this._colorFor(theme), 2, `--deco-size:${parseInt(this.size || "28", 10)}px;`)}
                      ${this._deco(theme, "corner-br float-x delay-3", this._colorFor(theme), 3, `--deco-size:${parseInt(this.size || "28", 10)}px;`)}

                      ${this._deco(theme, "edge-top float-x delay-2", this._colorFor(theme), 4, `--deco-size:${parseInt(this.size || "28", 10)}px;`)}
                      ${this._deco(theme, "edge-top-2 float-x delay-4", this._colorFor(theme), 5, `--deco-size:${parseInt(this.size || "28", 10)}px;`)}
                      ${this._deco(theme, "edge-left float-y delay-1", this._colorFor(theme), 6, `--deco-size:${parseInt(this.size || "28", 10)}px;`)}
                      ${this._deco(theme, "edge-right float-y delay-3", this._colorFor(theme), 7, `--deco-size:${parseInt(this.size || "28", 10)}px;`)}
                      ${this._deco(theme, "edge-bottom float-x", this._colorFor(theme), 8, `--deco-size:${parseInt(this.size || "28", 10)}px;`)}
                      ${this._deco(theme, "edge-bottom-2 float-x delay-1", this._colorFor(theme), 9, `--deco-size:${parseInt(this.size || "28", 10)}px;`)}
                    `}
              </div>`}

        <!-- Contenido principal -->
        <div class="hw-content">
          <slot>
            <div style="padding:16px;">
              <h2 style="margin:0 0 8px;">🎃 Feliz Halloween</h2>
              <p style="margin:0;color:#333">Este es el contenido principal. Los adornos se mueven en los bordes sin interferir.</p>
            </div>
          </slot>
        </div>
      </div>

      ${this.onlyLoader || this.scope !== "viewport" ? "" : ""}
    `;
  }
};
var halloween_default = HalloweenWidget;

// src/index.js
customElements.define("halloween-widget", halloween_default);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=index.js.map

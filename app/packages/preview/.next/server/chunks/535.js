(exports.id = 535),
  (exports.ids = [535]),
  (exports.modules = {
    32619: (e, r, t) => {
      Promise.resolve().then(t.t.bind(t, 95201, 23)),
        Promise.resolve().then(t.bind(t, 55042)),
        Promise.resolve().then(t.bind(t, 99555)),
        Promise.resolve().then(t.bind(t, 48942)),
        Promise.resolve().then(t.bind(t, 28599)),
        Promise.resolve().then(t.bind(t, 44502));
    },
    83837: (e, r, t) => {
      Promise.resolve().then(t.t.bind(t, 24424, 23)),
        Promise.resolve().then(t.t.bind(t, 37752, 23)),
        Promise.resolve().then(t.t.bind(t, 75275, 23)),
        Promise.resolve().then(t.t.bind(t, 29842, 23)),
        Promise.resolve().then(t.t.bind(t, 1633, 23)),
        Promise.resolve().then(t.t.bind(t, 9224, 23));
    },
    60057: (e, r, t) => {
      Promise.resolve().then(t.bind(t, 30458));
    },
    84916: (e, r, t) => {
      Promise.resolve().then(t.bind(t, 5235));
    },
    55042: (e, r, t) => {
      "use strict";
      t.d(r, { AppFooter: () => n });
      var a = t(73227),
        s = t(44502),
        o = t(73859),
        i = t(53315);
      function n() {
        let { storedTheme: e, setStoredTheme: r } = (0, s.F)();
        return a.jsx(a.Fragment, {
          children: (0, a.jsxs)(o.$_, {
            children: [
              a.jsx(o.HW, { children: a.jsx("span", {}) }),
              a.jsx(o.p4, {
                children: a.jsx(i.J, {
                  themeMode: e ?? "system",
                  onThemeModeChange: r,
                }),
              }),
            ],
          }),
        });
      }
    },
    30458: (e, r, t) => {
      "use strict";
      t.r(r), t.d(r, { default: () => o });
      var a = t(73227),
        s = t(5235);
      function o(e) {
        return a.jsx(s.Error, { title: "Something went wrong" });
      }
    },
    5235: (e, r, t) => {
      "use strict";
      t.d(r, { Error: () => i });
      var a = t(73227);
      let s = {
        src: "/_next/static/media/error-bg.37e3789b.png",
        height: 944,
        width: 1320,
        blurDataURL:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAMAAADJ2y/JAAAAMFBMVEV1ddUIW//0rNQUZPzDm9sRYfxrfuoPYfy1lt5UefLgo9YOYfuyl+ELXv8OaP9khvxZFSuOAAAADnRSTlMBGR25Y2a+Yau/GZ2zLmO49nQAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAsSURBVHicY2CAAyYWJkZWRgYGBg5+NmY+ZgYGBh5+TmY+bkaQFBcjOy9CKQAQQACnPFNieQAAAABJRU5ErkJggg==",
        blurWidth: 8,
        blurHeight: 6,
      };
      t(23677);
      var o = t(49101);
      function i(e) {
        let { title: r, description: t } = e;
        return (0, a.jsxs)("div", {
          className:
            "min-h-app bg-[#F4F6F9] dark:bg-background relative text-text-primary",
          children: [
            (0, a.jsxs)("div", {
              className: "p-32 pt-[80px] relative z-10",
              children: [
                a.jsx("h1", {
                  className: "text-fluid-heading-05 text-text-primary mb-32",
                  children: r,
                }),
                t &&
                  a.jsx("p", {
                    className: "my-24 text-body-01 max-w-[300px]",
                    children: t,
                  }),
              ],
            }),
            a.jsx("div", {
              className: "mt-40 md:mt-0 lg:absolute lg:inset-0",
              children: a.jsx(o.default, {
                alt: "",
                src: s,
                className: "h-full w-full object-contain md:object-cover",
                quality: 100,
                priority: !0,
              }),
            }),
          ],
        });
      }
    },
    99555: (e, r, t) => {
      "use strict";
      t.d(r, { Header: () => l });
      var a = t(73227),
        s = t(35134),
        o = t(66346),
        i = t(26685),
        n = t(40067),
        d = t(20649);
      function l() {
        return (0, a.jsxs)(s.h4, {
          "aria-label": "header",
          className: (0, n.Z)("theme-variant", i.zi),
          children: [
            a.jsx(o.zl5, {}),
            a.jsx(o.nho, {
              href: "/",
              as: d.default,
              prefix: "IBM Quantum",
              children: "Documentation Mirror",
            }),
          ],
        });
      }
    },
    48942: (e, r, t) => {
      "use strict";
      t.d(r, { TooltipProvider: () => a.pn });
      var a = t(13975);
    },
    28599: (e, r, t) => {
      "use strict";
      t.d(r, { default: () => n });
      var a = t(73227),
        s = t(23677),
        o = t(79784),
        i = t(5834);
      function n({ children: e }) {
        let [r] = (0, s.useState)(
          () =>
            new o.S({
              defaultOptions: { queries: { refetchOnWindowFocus: !1 } },
            })
        );
        return a.jsx(i.aH, { client: r, children: e });
      }
    },
    44502: (e, r, t) => {
      "use strict";
      t.d(r, { ThemeProvider: () => u, F: () => p });
      var a = t(73227),
        s = t(23677),
        o = t(92824),
        i = t.n(o),
        n = t(65128);
      i()(n.A, (e) => `(min-width: ${e})`);
      var d = t(33939),
        l = t(91663);
      let c = (0, s.createContext)(void 0);
      function p() {
        let e = (0, s.useContext)(c);
        if (!e) throw Error("Missing ThemeProvider");
        return e;
      }
      function u(e) {
        let { children: r, cookieThemeDomain: t } = e,
          [o, i] = (0, s.useState)(),
          n = (function (e, r) {
            var t;
            let {
              subscribe: a,
              getSnapshot: o,
              getServerSnapshot: i,
            } = ((t = void 0),
            {
              subscribe: (e) => () => {},
              getSnapshot: () => {},
              getServerSnapshot: () => t ?? !1,
            });
            return (0, s.useSyncExternalStore)(a, o, i);
          })(0),
          p = (0, s.useMemo)(
            () =>
              "light" === o || "dark" === o
                ? o
                : void 0 !== n && n
                ? "dark"
                : "light",
            [o, n]
          ),
          u = (0, s.useMemo)(
            () => ({
              theme: p,
              storedTheme: o,
              setStoredTheme: function (e) {
                (0, d.XS)(e, { domain: t }), i(e), (0, l.D)(e);
              },
            }),
            [p, o, t]
          );
        return a.jsx(c.Provider, { value: u, children: r });
      }
    },
    31306: (e, r, t) => {
      "use strict";
      t.r(r),
        t.d(r, { $$typeof: () => i, __esModule: () => o, default: () => n });
      var a = t(53189);
      let s = (0, a.createProxy)(
          String.raw`/home/node/app/packages/preview/src/app/error.tsx`
        ),
        { __esModule: o, $$typeof: i } = s;
      s.default;
      let n = (0, a.createProxy)(
        String.raw`/home/node/app/packages/preview/src/app/error.tsx#default`
      );
    },
    65964: (e, r, t) => {
      "use strict";
      t.r(r), t.d(r, { default: () => B, dynamic: () => _, metadata: () => R });
      var a = t(99013);
      t(61603), t(1142);
      var s = t(53189);
      let o = (0, s.createProxy)(
          String.raw`/home/node/app/packages/preview/src/components/TooltipProvider.tsx`
        ),
        { __esModule: i, $$typeof: n } = o;
      o.default;
      let d = (0, s.createProxy)(
          String.raw`/home/node/app/packages/preview/src/components/TooltipProvider.tsx#TooltipProvider`
        ),
        l = (0, s.createProxy)(
          String.raw`/home/node/app/packages/shared/src/providers/ThemeProvider.tsx`
        ),
        { __esModule: c, $$typeof: p } = l;
      l.default,
        (0, s.createProxy)(
          String.raw`/home/node/app/packages/shared/src/providers/ThemeProvider.tsx#useTheme`
        );
      let u = (0, s.createProxy)(
          String.raw`/home/node/app/packages/shared/src/providers/ThemeProvider.tsx#ThemeProvider`
        ),
        m = (0, s.createProxy)(
          String.raw`/home/node/app/packages/preview/src/components/Header.tsx`
        ),
        { __esModule: h, $$typeof: v } = m;
      m.default;
      let g = (0, s.createProxy)(
        String.raw`/home/node/app/packages/preview/src/components/Header.tsx#Header`
      );
      var x = t(31895),
        f = t.n(x),
        A = t(8348),
        P = t.n(A),
        y = t(62663),
        w = t(82527),
        b = t(96520);
      let S = (0, s.createProxy)(
          String.raw`/home/node/app/packages/preview/src/app/AppFooter.tsx`
        ),
        { __esModule: j, $$typeof: k } = S;
      S.default;
      let M = (0, s.createProxy)(
          String.raw`/home/node/app/packages/preview/src/app/AppFooter.tsx#AppFooter`
        ),
        T = (0, s.createProxy)(
          String.raw`/home/node/app/packages/preview/src/providers/ReactQueryProvider.tsx`
        ),
        { __esModule: $, $$typeof: F } = T;
      T.default;
      let N = (0, s.createProxy)(
          String.raw`/home/node/app/packages/preview/src/providers/ReactQueryProvider.tsx#default`
        ),
        R = (0, y.s)({
          base: (0, b.dU)(process.env.BASE_URL, "http://localhost:3000"),
        }),
        _ = "force-dynamic";
      async function B(e) {
        let { children: r } = e;
        return a.jsx("html", {
          lang: "en",
          suppressHydrationWarning: !0,
          className: `${f().variable} ${P().variable} font-sans`,
          children: (0, a.jsxs)("body", {
            children: [
              a.jsx(w.ThemeNoFlash, {}),
              a.jsx(u, {
                cookieThemeDomain: "",
                children: a.jsx(d, {
                  children: (0, a.jsxs)(N, {
                    children: [
                      a.jsx(g, {}),
                      a.jsx("div", {
                        className: "pt-[var(--app-header-height)]",
                        children: r,
                      }),
                      a.jsx(M, {}),
                    ],
                  }),
                }),
              }),
            ],
          }),
        });
      }
    },
    92810: (e, r, t) => {
      "use strict";
      t.r(r), t.d(r, { default: () => l });
      var a = t(99013),
        s = t(53189);
      let o = (0, s.createProxy)(
          String.raw`/home/node/app/packages/preview/src/components/Error.tsx`
        ),
        { __esModule: i, $$typeof: n } = o;
      o.default;
      let d = (0, s.createProxy)(
        String.raw`/home/node/app/packages/preview/src/components/Error.tsx#Error`
      );
      function l() {
        return a.jsx(d, {
          title: "Page not found",
          description:
            "Sorry, but the page you were looking for could not be found.",
        });
      }
    },
    96520: (e, r, t) => {
      "use strict";
      function a(e, r) {
        return e ?? r;
      }
      t.d(r, { dU: () => a }), t(21622), t(68520), t(82302);
    },
    62663: (e, r, t) => {
      "use strict";
      function a(e) {
        let r = new URLSearchParams();
        e.title && r.set("title", e.title);
        let t = e.ogRoute ? `${e.ogRoute}?${r.toString()}` : void 0,
          a = e.siteName ?? "IBM Quantum Documentation",
          s = e.title ? `${e.title} | ${a}` : a,
          o =
            e.description ??
            "Program real quantum systems with the leading quantum cloud application.",
          i = {
            metadataBase: new URL(e.base),
            title: s,
            description: o,
            openGraph: {
              title: s,
              siteName: a,
              type: "website",
              description: o,
            },
            twitter: {
              card: "summary_large_image",
              title: s,
              description: o,
              creator: "@IBM",
            },
            icons: { icon: "/icon.svg" },
          };
        return (
          t &&
            ((i.openGraph.images = { url: t, alt: s }),
            (i.twitter.images = { url: t, alt: s })),
          i
        );
      }
      t.d(r, { s: () => a });
    },
    154: (e, r, t) => {
      "use strict";
      t.r(r), t.d(r, { default: () => s });
      var a = t(87201);
      let s = (e) => [
        {
          type: "image/x-icon",
          sizes: "48x48",
          url: (0, a.fillMetadataSegment)(".", e.params, "favicon.ico") + "",
        },
      ];
    },
    96495: (e, r, t) => {
      "use strict";
      t.r(r), t.d(r, { default: () => s });
      var a = t(87201);
      let s = (e) => [
        {
          type: "image/svg+xml",
          sizes: "any",
          url:
            (0, a.fillMetadataSegment)(".", e.params, "icon.svg") +
            "?db7fd15a4ef1e647",
        },
      ];
    },
    61603: () => {},
  });

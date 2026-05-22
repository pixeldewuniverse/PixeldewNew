(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/PixeldewNew/Documents/pixeldew/components/Cursor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Cursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PixeldewNew$2f$Documents$2f$pixeldew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PixeldewNew/Documents/pixeldew/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function Cursor() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$PixeldewNew$2f$Documents$2f$pixeldew$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Cursor.useEffect": ()=>{
            const dot = document.getElementById("cursor-dot");
            const ring = document.getElementById("cursor-ring");
            if (!dot || !ring) return;
            const d = dot;
            const r = ring;
            let rx = -100, ry = -100;
            let mx = -100, my = -100;
            let raf;
            function lerp(a, b, t) {
                return a + (b - a) * t;
            }
            function loop() {
                rx = lerp(rx, mx, 0.1);
                ry = lerp(ry, my, 0.1);
                r.style.left = rx + "px";
                r.style.top = ry + "px";
                raf = requestAnimationFrame(loop);
            }
            function onMove(e) {
                mx = e.clientX;
                my = e.clientY;
                d.style.left = mx + "px";
                d.style.top = my + "px";
            }
            function onEnter() {
                document.body.classList.add("hovering");
            }
            function onLeave() {
                document.body.classList.remove("hovering");
            }
            const targets = document.querySelectorAll("a, button, [data-hover]");
            targets.forEach({
                "Cursor.useEffect": (el)=>{
                    el.addEventListener("mouseenter", onEnter);
                    el.addEventListener("mouseleave", onLeave);
                }
            }["Cursor.useEffect"]);
            window.addEventListener("mousemove", onMove);
            raf = requestAnimationFrame(loop);
            return ({
                "Cursor.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    window.removeEventListener("mousemove", onMove);
                    targets.forEach({
                        "Cursor.useEffect": (el)=>{
                            el.removeEventListener("mouseenter", onEnter);
                            el.removeEventListener("mouseleave", onLeave);
                        }
                    }["Cursor.useEffect"]);
                }
            })["Cursor.useEffect"];
        }
    }["Cursor.useEffect"], []);
    return null;
}
_s(Cursor, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Cursor;
var _c;
__turbopack_context__.k.register(_c, "Cursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=PixeldewNew_Documents_pixeldew_components_Cursor_tsx_0d6.pe3._.js.map
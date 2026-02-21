"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(middleware)/./node_modules/@clerk/nextjs/dist/esm/server/clerkMiddleware.js\");\n\nconst secretKey = process.env.CLERK_SECRET_KEY;\nconst publishableKey = \"pk_test_Y3Jpc3AtZmF3bi0zMi5jbGVyay5hY2NvdW50cy5kZXYk\";\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_0__.clerkMiddleware)((auth, req)=>{\n// Empty for now to just gets the site to load\n}, {\n    secretKey,\n    publishableKey,\n    debug: true // This will help us see EXACTLY what is failing in the logs\n}));\nconst config = {\n    matcher: [\n        \"/((?!_next|[^?]*\\\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)\",\n        \"/(api|trpc)(.*)\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBdUQ7QUFFdkQsTUFBTUMsWUFBWUMsUUFBUUMsR0FBRyxDQUFDQyxnQkFBZ0I7QUFDOUMsTUFBTUMsaUJBQWlCSCxzREFBNkM7QUFFcEUsaUVBQWVGLHFFQUFlQSxDQUFDLENBQUNPLE1BQU1DO0FBQ3BDLDhDQUE4QztBQUNoRCxHQUFHO0lBQ0RQO0lBQ0FJO0lBQ0FJLE9BQU8sS0FBSyw0REFBNEQ7QUFDMUUsRUFBRSxFQUFDO0FBRUksTUFBTUMsU0FBUztJQUNwQkMsU0FBUztRQUNQO1FBQ0E7S0FDRDtBQUNILEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbWlkZGxld2FyZS50cz80MjJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNsZXJrTWlkZGxld2FyZSB9IGZyb20gXCJAY2xlcmsvbmV4dGpzL3NlcnZlclwiO1xuXG5jb25zdCBzZWNyZXRLZXkgPSBwcm9jZXNzLmVudi5DTEVSS19TRUNSRVRfS0VZO1xuY29uc3QgcHVibGlzaGFibGVLZXkgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19DTEVSS19QVUJMSVNIQUJMRV9LRVk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsZXJrTWlkZGxld2FyZSgoYXV0aCwgcmVxKSA9PiB7XG4gIC8vIEVtcHR5IGZvciBub3cgdG8ganVzdCBnZXRzIHRoZSBzaXRlIHRvIGxvYWRcbn0sIHtcbiAgc2VjcmV0S2V5LFxuICBwdWJsaXNoYWJsZUtleSxcbiAgZGVidWc6IHRydWUgLy8gVGhpcyB3aWxsIGhlbHAgdXMgc2VlIEVYQUNUTFkgd2hhdCBpcyBmYWlsaW5nIGluIHRoZSBsb2dzXG59KTtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgbWF0Y2hlcjogW1xuICAgICcvKCg/IV9uZXh0fFteP10qXFxcXC4oPzpodG1sP3xjc3N8anMoPyFvbil8anBlP2d8d2VicHxwbmd8Z2lmfHN2Z3x0dGZ8d29mZjI/fGljb3xjc3Z8ZG9jeD98eGxzeD98emlwfHdlYm1hbmlmZXN0KSkuKiknLFxuICAgICcvKGFwaXx0cnBjKSguKiknLFxuICBdLFxufTsiXSwibmFtZXMiOlsiY2xlcmtNaWRkbGV3YXJlIiwic2VjcmV0S2V5IiwicHJvY2VzcyIsImVudiIsIkNMRVJLX1NFQ1JFVF9LRVkiLCJwdWJsaXNoYWJsZUtleSIsIk5FWFRfUFVCTElDX0NMRVJLX1BVQkxJU0hBQkxFX0tFWSIsImF1dGgiLCJyZXEiLCJkZWJ1ZyIsImNvbmZpZyIsIm1hdGNoZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});
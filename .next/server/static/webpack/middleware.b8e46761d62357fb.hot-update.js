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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(middleware)/./node_modules/@clerk/nextjs/dist/esm/server/clerkMiddleware.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_0__.clerkMiddleware)((auth, req)=>{\n    // This will force the key to be logged to Vercel's console\n    console.log(\"DIAGNOSTIC - Secret Key exists:\", !!process.env.CLERK_SECRET_KEY);\n    console.log(\"DIAGNOSTIC - Publishable Key exists:\", !!\"pk_test_Y3Jpc3AtZmF3bi0zMi5jbGVyay5hY2NvdW50cy5kZXYk\");\n}, {\n    // We hard-check the variables here\n    secretKey: process.env.CLERK_SECRET_KEY,\n    publishableKey: \"pk_test_Y3Jpc3AtZmF3bi0zMi5jbGVyay5hY2NvdW50cy5kZXYk\"\n}));\nconst config = {\n    matcher: [\n        \"/((?!.*\\\\..*|_next).*)\",\n        \"/\",\n        \"/(api|trpc)(.*)\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBdUQ7QUFFdkQsaUVBQWVBLHFFQUFlQSxDQUFDLENBQUNDLE1BQU1DO0lBQ3BDLDJEQUEyRDtJQUMzREMsUUFBUUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUNDLFFBQVFDLEdBQUcsQ0FBQ0MsZ0JBQWdCO0lBQzdFSixRQUFRQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQ0Msc0RBQTZDO0FBQ3JHLEdBQUc7SUFDRCxtQ0FBbUM7SUFDbkNJLFdBQVdKLFFBQVFDLEdBQUcsQ0FBQ0MsZ0JBQWdCO0lBQ3ZDRyxnQkFBZ0JMLHNEQUE2QztBQUMvRCxFQUFFLEVBQUM7QUFFSSxNQUFNTSxTQUFTO0lBQ3BCQyxTQUFTO1FBQUM7UUFBMEI7UUFBSztLQUFrQjtBQUM3RCxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL21pZGRsZXdhcmUudHM/NDIyZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjbGVya01pZGRsZXdhcmUgfSBmcm9tIFwiQGNsZXJrL25leHRqcy9zZXJ2ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xlcmtNaWRkbGV3YXJlKChhdXRoLCByZXEpID0+IHtcbiAgLy8gVGhpcyB3aWxsIGZvcmNlIHRoZSBrZXkgdG8gYmUgbG9nZ2VkIHRvIFZlcmNlbCdzIGNvbnNvbGVcbiAgY29uc29sZS5sb2coXCJESUFHTk9TVElDIC0gU2VjcmV0IEtleSBleGlzdHM6XCIsICEhcHJvY2Vzcy5lbnYuQ0xFUktfU0VDUkVUX0tFWSk7XG4gIGNvbnNvbGUubG9nKFwiRElBR05PU1RJQyAtIFB1Ymxpc2hhYmxlIEtleSBleGlzdHM6XCIsICEhcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQ0xFUktfUFVCTElTSEFCTEVfS0VZKTtcbn0sIHtcbiAgLy8gV2UgaGFyZC1jaGVjayB0aGUgdmFyaWFibGVzIGhlcmVcbiAgc2VjcmV0S2V5OiBwcm9jZXNzLmVudi5DTEVSS19TRUNSRVRfS0VZLFxuICBwdWJsaXNoYWJsZUtleTogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQ0xFUktfUFVCTElTSEFCTEVfS0VZLFxufSk7XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIG1hdGNoZXI6IFtcIi8oKD8hLipcXFxcLi4qfF9uZXh0KS4qKVwiLCBcIi9cIiwgXCIvKGFwaXx0cnBjKSguKilcIl0sXG59OyJdLCJuYW1lcyI6WyJjbGVya01pZGRsZXdhcmUiLCJhdXRoIiwicmVxIiwiY29uc29sZSIsImxvZyIsInByb2Nlc3MiLCJlbnYiLCJDTEVSS19TRUNSRVRfS0VZIiwiTkVYVF9QVUJMSUNfQ0xFUktfUFVCTElTSEFCTEVfS0VZIiwic2VjcmV0S2V5IiwicHVibGlzaGFibGVLZXkiLCJjb25maWciLCJtYXRjaGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});
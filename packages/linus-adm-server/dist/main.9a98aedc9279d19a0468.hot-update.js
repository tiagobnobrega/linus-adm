exports.id = "main";
exports.modules = {

/***/ "./src/app.controller.ts":
/*!*******************************!*\
  !*** ./src/app.controller.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"../../node_modules/@nestjs/common/index.js\");\nconst app_service_1 = __webpack_require__(/*! ./app.service */ \"./src/app.service.ts\");\nlet AppController = class AppController {\n    constructor(appService) {\n        this.appService = appService;\n    }\n    root() {\n        return this.appService.root();\n    }\n};\n__decorate([\n    common_1.Get(),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", String)\n], AppController.prototype, \"root\", null);\nAppController = __decorate([\n    common_1.Controller(),\n    __metadata(\"design:paramtypes\", [app_service_1.AppService])\n], AppController);\nexports.AppController = AppController;\n\n\n//# sourceURL=webpack:///./src/app.controller.ts?");

/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"../../node_modules/@nestjs/common/index.js\");\nconst app_controller_1 = __webpack_require__(/*! ./app.controller */ \"./src/app.controller.ts\");\nconst app_service_1 = __webpack_require__(/*! ./app.service */ \"./src/app.service.ts\");\nlet AppModule = class AppModule {\n};\nAppModule = __decorate([\n    common_1.Module({\n        imports: [],\n        controllers: [app_controller_1.AppController],\n        providers: [app_service_1.AppService],\n    })\n], AppModule);\nexports.AppModule = AppModule;\n\n\n//# sourceURL=webpack:///./src/app.module.ts?");

/***/ }),

/***/ "./src/app.service.ts":
/*!****************************!*\
  !*** ./src/app.service.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"../../node_modules/@nestjs/common/index.js\");\nlet AppService = class AppService {\n    root() {\n        return 'Hello World!!!';\n    }\n};\nAppService = __decorate([\n    common_1.Injectable()\n], AppService);\nexports.AppService = AppService;\n\n\n//# sourceURL=webpack:///./src/app.service.ts?");

/***/ })

};
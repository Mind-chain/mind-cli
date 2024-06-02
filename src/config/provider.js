"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provider = void 0;
var ethers_1 = require("ethers");
var msc_js_1 = require("msc-js");
exports.provider = new ethers_1.ethers.JsonRpcProvider(msc_js_1.mainnet_rpc.http);

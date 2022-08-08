"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const axios_1 = __importDefault(require("axios"));
async function run() {
    const username = core.getInput('username');
    const password = core.getInput('password');
    // const username = "GuilhermeSmc";
    // const password = "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";
    try {
        const id = core.getInput('id');
        // const id = "SMCaetano.Pdv.Core";
        const url = `https://nuget.pkg.github.com/Supermercados-Caetano/download/${id.toLowerCase()}/index.json`; //  core.getInput('id');
        const resp = await axios_1.default.get(url, { headers: { 'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64') } });
        console.log('resp', resp);
        console.log(resp.data);
        core.setOutput('versions', resp.data.versions);
    }
    catch (error) {
        core.setFailed(error.message + `\n${username}:${password}`);
    }
}
run();

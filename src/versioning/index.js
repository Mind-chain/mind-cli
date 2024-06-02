"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versioning = void 0;
var version_1 = require("./commands/version");
function versioning(versioning) {
    versioning
        .version(version_1.VERSION)
        .description("A CLI tool to display version and title");
    versioning
        .command('version')
        .description('Display the version of the CLI')
        .action(function () {
        console.log("Version: ".concat(version_1.VERSION));
    });
}
exports.versioning = versioning;

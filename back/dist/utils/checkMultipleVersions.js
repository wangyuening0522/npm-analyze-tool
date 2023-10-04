"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMultipleVersions = void 0;
function checkMultipleVersions(dependencyGraph) {
    const versionsMap = new Map();
    for (const packageName in dependencyGraph) {
        const dependencies = dependencyGraph[packageName];
        for (const dependency in dependencies) {
            if (!versionsMap.has(dependency)) {
                versionsMap.set(dependency, new Set());
            }
            const version = dependencies[dependency];
            versionsMap.get(dependency).add(version);
        }
    }
    const multipleVersions = [];
    for (const [dependency, versions] of versionsMap.entries()) {
        if (versions.size > 1) {
            multipleVersions.push({ dependency, versions: Array.from(versions) });
        }
    }
    return multipleVersions;
}
exports.checkMultipleVersions = checkMultipleVersions;

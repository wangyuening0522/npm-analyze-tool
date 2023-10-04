function checkMultipleVersions(dependencyGraph: {
  [packageName: string]: { [dependency: string]: string };
}): { dependency: string; versions: string[] }[] {
  const versionsMap = new Map<string, Set<string>>();
  for (const packageName in dependencyGraph) {
    const dependencies = dependencyGraph[packageName];
    for (const dependency in dependencies) {
      if (!versionsMap.has(dependency)) {
        versionsMap.set(dependency, new Set<string>());
      }
      const version = dependencies[dependency];
      versionsMap.get(dependency)!.add(version);
    }
  }

  const multipleVersions: { dependency: string; versions: string[] }[] = [];
  for (const [dependency, versions] of versionsMap.entries()) {
    if (versions.size > 1) {
      multipleVersions.push({ dependency, versions: Array.from(versions) });
    }
  }
  return multipleVersions;
}
export { checkMultipleVersions };

module.exports = () => ({
    registry: "https://github.com/101digital/customer-component.git",
    getTagName: (pkg) => `${pkg.version}`,
  });
module.exports = {
  env: {
    urlAPI: "",
    networkId: "0xe298",
  },
  useFileSystemPublicRoutes: false,
  exportPathMap: function () {
    return {
      "/": { page: "/" },
      "/theProject": { page: "/theProject" }

    };
  },
  experimental: { esmExternals: false },
};



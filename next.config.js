module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)', // all routes
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },
};

import pkg from '../../package.json'

export default {
  cacheKey: `${pkg.name}_${process.env.NODE_ENV}`,
  apiUrl: "https://www.luzhongkuan.cn"
};

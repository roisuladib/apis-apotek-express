const { Asset } = require('../../models');

module.exports = async (req, res) => {
   const assets = await Asset.findAll({
      attributes: ['id', 'image']
   });
   const mappedAssets = assets.map(i => {
      i.image = `${req.protocol}://${req.get('host')}/${i.image}`
      return i;
   });
   const pageCount = Math.ceil(mappedAssets.length / 15);
   let page = parseInt(req.query.p);
   if (!page) page = 1;
   if (page > pageCount) page = pageCount;
   return res.json({
      status: 'success',
      message: mappedAssets.length ? 'List assets' : 'Assets null',
      page,
      pageCount,
      data: mappedAssets.slice(page * 15 - 15, page * 15)
   });
}
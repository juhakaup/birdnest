const xml2js = require('xml2js');

const parseDroneData = async (xmlData) => {
  const parser = new xml2js.Parser({ explicitArray: false })
  let data = await parser.parseStringPromise(xmlData);
  return data;
};

module.exports = { parseDroneData }
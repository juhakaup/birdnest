const xml2js = require('xml2js');

const parseXmlToJs = async (xmlData) => {
  const parser = new xml2js.Parser({ explicitArray: false })
  let data = await parser.parseStringPromise(xmlData);
  return data;
};

module.exports = { parseXmlToJs }
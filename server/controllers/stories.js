const models = require('../../db/models');
const fs = require('fs');
const s3 = require('../middleware/s3.js').s3;
const base64 = require('../helpers/base64ArrayBuffer.js');

module.exports.getAll = (req, res) => {
  console.log(`AYE COREY, MAKE A DB QUERY TO GET ALL STORIES RELATED TO USER ID ${req.params.id}`);
  models.Story.where({ profile_id: Number(req.params.id) }).fetchAll()
    .then(stories => {
      console.log('stories:', stories);
      res.status(200).send(stories);
    });
};

module.exports.addStory = (req, res) => {
  console.log(`AYE COREY, MAKE A DB QUERY TO ADD A STORY LINK TO ID ${req.params.id}`);
};

// sends back aws_link of the latest video of the given Facebook profile_id
module.exports.getLatestStory = (req, res) => {
  models.Story.where({ profile_id: Number(req.params.id) }).fetchAll()
    .then(stories => {
      res.status(200).send(stories.last().attributes.aws_link);
    });
};

module.exports.getLatestImage = (req, res) => {
  models.Story.where({ profile_id: Number(req.params.id), metadata: 'image/jpeg' }).fetchAll()
    .then(stories => {
      let params = { Bucket: 'vrstories', Key: stories.last().attributes.aws_link };
      s3.getObject(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let base64Str = base64.convert(data.Body);
          // base64 string has to be embedded like this: <img src="data:image/jpeg;base64, ${base64Str}>
          res.send(base64Str);
        }
      });
    });
};

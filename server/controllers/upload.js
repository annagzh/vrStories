const models = require('../../db/models');
const base64 = require('../helpers/base64ArrayBuffer.js');

const s3 = require('../middleware/s3.js').s3;

module.exports.save = (req, res) => {

  var key = Date.now().toString();
  var userId = req.body.userId;

  if (req.files[0].mimetype === 'video/mp4') {
    var awsLink = 'https://s3-us-west-1.amazonaws.com/vrstories/' + key;
  } else if (req.files[0].mimetype === 'image/jpeg') {
    console.log('req.files[0]:', req.files[0]);
    let base64Str = base64.convert(req.files[0].buffer);
    var awsLink = base64Str;
  }
  // send aws link & userId to db
  models.Story.forge({ profile_id: userId, aws_link: awsLink, metadata: req.files[0].mimetype })
    .save();

  let params = { Bucket: 'vrstories', Key: key, Body: req.files[0].buffer, ContentType: req.files[0].mimetype };
  s3.putObject(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully uploaded data to vrstories bucket');
      res.end();
    }
  });
};

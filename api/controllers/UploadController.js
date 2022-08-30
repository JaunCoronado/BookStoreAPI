module.exports = {
  upload: async function (req, res) {
    if (req.method === 'GET')
      return res.json({ 'status': 'GET not allowed' });

      var sharp = require('sharp');
      var Writable = require('stream').Writable;
  
      var receiver = new Writable({objectMode: true});
      receiver._write = function(file, enc, cb) {
        var output = require('fs').createWriteStream('./assets/images/' + file.fd);
  
        var resizeTransform = sharp().resize(250, 400);
        file.pipe(resizeTransform).pipe(output);
  
        cb();
      };
  
      req.file('image').upload(receiver, (err, files) => {
        if (err) {return res.serverError(err);}
        return res.ok(files[0].fd);
      });

  }
};

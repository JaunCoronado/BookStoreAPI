module.exports = {

  upload: function (req, res) {
    if (req.method === 'GET')
      return res.json({ 'status': 'GET not allowed' });

    console.log('We have entered the uploading process ');

    req.file('image').upload({
      dirname: '../../public/images/'
    }, function (err, files) {
      console.log('file is :: ', +files);
      maxBytes: 10000000;
      if (err) return res.serverError(err);
      console.log(files);
      res.json({ status: 200, file: files });
    });
  }
};

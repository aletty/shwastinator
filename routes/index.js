
/*
 * GET home page.
 */


exports.index = function(req, res){
  console.log("TEST");
  console.log(req.session);
  res.render('index', { title: 'Express' });
};


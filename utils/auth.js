const withAuth = (req, res, next) => {
  //if the user is not logged in, redirect them to the login page
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      //if the user is logged in, use the route function that will allow them to view the gallery
      //call the next function if the use is approved
      next();
    }
  };
  
  module.exports = withAuth;
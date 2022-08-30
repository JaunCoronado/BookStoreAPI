/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getCategories: async (req, res) => {
    const categoryService = new CategoryService();
    return categoryService.getCategories()
    .then((result) => {
      res.ok(result);
    })
    .catch((err) => res.serverError(err));
  },
  
  getCategory: async (req, res) => {
    if(!req.body.categoryId)
      return res.badRequest("categoryId required");

    const categoryService = new CategoryService();
    return categoryService.getCategory(req.body.categoryId)
    .then((result) => {
      res.ok(result);
    })
    .catch((err) => res.serverError(err));
  },

};


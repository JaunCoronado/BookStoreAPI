const Promise = require('bluebird');

module.exports = class CategoryService {
  constructor() {}

  getCategories() {
    return new Promise((resolve, reject) => {
      return Category.find()
        .then((categoryList) =>{
          resolve(categoryList);
        })
        .catch(err => reject(err));

    });
  }
  
  getCategory(categoryId) {
    return new Promise((resolve, reject) => {
      return Category.findOne({where: {id: categoryId}})
        .populate("books")
        .then((categoryList) =>{
          resolve(categoryList);
        })
        .catch(err => reject(err));

    });
  }
}
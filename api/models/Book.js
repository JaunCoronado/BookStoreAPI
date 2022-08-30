/**
 * Book.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string'
    },
    synopsis: {
      type: 'string'
    },
    cover: {
      type: 'string'
    },
    authorId: {
      model: 'author'
    },
    categoryId: {
      model: 'category'
    },
    userId: {
      model: 'user'
    },
    publishedDate: {
      type: 'string'
    }


  },

};


/**
 * Widget Activity
 *
 * Not ready yet
 */
define({
  type: "Hull",
  templates: ["activity_compact"],
  options: {
    per_page: 5,
    page: 1
  },
  datasources: {
    activities: function() {
      return this.api('hull/app/activity', this.query);
    }
  },

  actions: {
    nextPage: function() {
      delete this.query.skip;
      this.query.limit = this.options.limit || this.options.per_page;
      this.query.page = this.query.page || 1;
      this.query.page += 1;
      this.render();
    },
    previousPage: function() {
      delete this.query.skip;
      this.query.limit = this.options.limit || this.options.per_page;
      this.query.page = this.query.page || 1;
      if (this.query.page > 1) {
        this.query.page -= 1;
        this.render();
      }
    },
    fetchMore: function() {
      var originalLimit = this.options.limit || this.options.per_page;
      this.query.limit += originalLimit;
      this.render();
    }
  },

    translations: {
    verb: {
      view: 'watched',
      receive: 'received',
      share: 'shared',
      add: 'added',
      post: 'posted',
      like: 'liked',
      create: 'created'
    },
    object: {
      image: 'an image',
      status: 'a status',
      photo: 'a photo',
      question: 'a question',
      item: 'an objet',
      badge: 'a badge',
      link: 'a link',
      video: 'a video',
      note: 'a rating',
      comment: 'a comment',
      review: 'a review'
    },
    target: {
      facebook_wall: 'Facebook',
      facebook: 'Facebook',
      twitter: 'Twitter',
      youtube: 'Youtube',
      github: 'Github',
      on: 'on'
    },
    target_icon: {
      facebook_wall: "/assets/images/social/facebook.png",
      facebook: "/assets/images/social/facebook.png",
      twitter: "/assets/images/social/twitter.png",
      google: "/assets/images/social/youtube.png",
      youtube: "/assets/images/social/youtube.png"
    },


  initialize: function() {
    var query = {};

    if (this.options.page) {
      query.page = this.options.page;
    } else {
      query.skip = this.options.skip || 0;
    }

    query.limit = this.options.limit || this.options.per_page;
    query.where = this.options.where || {};

    if (this.options.verb) {
      query.where.verb = this.options.verb;
    }

    if (this.options.object_type) {
      query.where.obj_type = this.options.object_type;
    }

    var ObjectIdRegexp = /^[0-9a-f]{24}/i;

    if (this.options.after) {
      var after = this.options.after;
      if (ObjectIdRegexp.test(after)) {
        query.where._id = { '$gte' : after };
      } else if (moment(after).isValid()) {
        query.where.created_at = { "$gte" : moment(after).toDate() };
      }
    } else if (this.options.before) {
      var before = this.options.before;
      if (ObjectIdRegexp.test(before)) {
        query.where._id = { '$lte' : before };
      } else if (moment(before).isValid()) {
        query.where.created_at = { "$lte" : moment(before).toDate() };
      }
    }

    this.query = query;
  },

  beforeRender: function(data) {
    data.query = this.query;
    return data;
  }



});

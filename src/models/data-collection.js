"use strict";

class Collection {
  constructor(model) {
    this.model = model;
    this.associations = new Map();
  }

  async create(obj, options) {
    let record = await this.model.create(obj);

    if (options) {
      if (options.association)
        this.createAssociate(record, options.association);
    }
    return record;
  }
}

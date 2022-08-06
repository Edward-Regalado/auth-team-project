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

  async read(id) {
    let options = { include: [...this.associations.keys()] };
    let records = null;

    if (id) {
      options["where"] = { id };
      records = await this.model.findOne(options);
    } else {
      records = await this.model.findAll(options);
    }
    return records;
  }

  async update(id, obj) {
    if (!id) throw new Error("No record id provided");

    let record = await this.model.findOne({ where: { id } });
    let updatedRecord = await record.update(obj);
    return updatedRecord;
  }

  async delete(id) {
    if (!id) throw new Error("No record id provided");

    let deletedRecord = await this.model.destroy({ where: { id } });
    return deletedRecord;
  }

  belongsToManyThrough(collection, model) {
    this.model.belongsToMany(collection.model, { through: model });
    this.associations.set(collection.model, model);
  }

  async createAssociate(record, association) {
    if (!this.associations.has(association.collection.model)) {
      throw new Error("No association found for specified collection");
    }
    let associatedModel = this.associations.get(association.collection.model);
    let associatedModelRecord = await associatedModel.create({
      [`${this.model.name}Id`]: record.id,
      [`${association.collection.model.name}Id`]: association.id,
    });
    return associatedModelRecord;
  }
}

module.exports = Collection;

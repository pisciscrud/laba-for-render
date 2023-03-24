const contactService = require("../services/contactService");

module.exports = {
  async getAllContacts(req, res) {
    try {
      const contacts = await contactService.getAllContacts();
      res.render("contacts", {
        aEnabled: true,
        contacts: contacts,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async getContact(req, res) {
    try {
      if (req.query.id) {
        const contact = await contactService.getContact(req.query.id);
        res.json(contact);
      } else {
        res.end("Parameter not found");
      }
    } catch (error) {
      console.log(error);
    }
  },

  async addContact(req, res) {
    if (req.body.name && req.body.phone) {
      await contactService
        .addContact(req.body)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err.message);
        });
    } else {
      response.end("Parameters not found");
    }
  },

  async addContactView(req, res) {
    let contacts = [];
    await contactService.getAllContacts().then((result) => (contacts = result));
    res.render("newContact", {
      buttonsEnabled: false,
      contacts: contacts,
    });
  },

  async editContact(req, res) {
    if (req.query.id && req.body.name && req.body.phone) {
      await contactService
        .editContact(req.query.id, req.body)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err.message);
        });
    } else {
      res.end("Parameters not found");
    }
  },

  async editContactView(req, res) {
    let contacts = [];
    let contact;
    await contactService.getAllContacts().then((result) => (contacts = result));
    await contactService
      .getContact(req.query.id)
      .then((result) => (contact = result));
    res.render("editContact", {
      aEnabled: false,
      contacts: contacts,
      currentContact: contact,
    });
  },

  async deleteContact(req, res) {
    if (req.query.id) {
      await contactService
        .deleteContact(req.query.id)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err.message);
        });
    } else {
      response.end("Parameters not found");
    }
  },
};

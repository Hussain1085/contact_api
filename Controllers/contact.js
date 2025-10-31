import { Contact } from '../Models/Contact.js'

//get all contacts
export const getAllContact = async (req, res) => {
    const userContact = await Contact.find();

    if (userContact.length === 0) {
        return res.json({
            message: "No Contact Exists",
            success: false
        })
    }

    res.json({ message: "All Found Contacts are ", userContact })
}

//create new contact
export const newContact = async (req, res) => {
    const { name, email, phone, type } = req.body

    if (!name || !email || !phone || !type) {
        return res.json({ message: "All fields are required", success: false })
    }

    // Check if contact already exists (validity fit from user snippet, adapted for contacts)
    let existingContact = await Contact.findOne({ email })
    if (existingContact) {
        return res.json({ message: "Contact Already Exist....!", success: false })
    }
    
    let saveContact = await Contact.create({
        name, email, phone, type, user: req.user
    })

    res.json({ message: "Contact saved successfully...!", saveContact, success: true })
}

//update contact by id 
export const updateContactById = async (req, res) => {
    const id = req.params.id

    const { name, email, phone, type } = req.body 
   
    if (!name || !email || !phone || !type) {
        return res.json({ message: "All fields are required", success: false })
    }

    const updateContact = await Contact.findByIdAndUpdate(
        id,
        { name, email, phone, type },
        { new: true }
    )

    if (!updateContact) {
        return res.json({ message: "No Contact Exists", success: false })
    }

    res.json({
        message: "Contact Updated Successfully...!",
        updateContact,
        success: true
    })
}

//delete contact by id 
export const deleteContactById = async (req, res) => {
    const id = req.params.id

    const deleteContact = await Contact.findByIdAndDelete(id)

    if (!deleteContact) {
        return res.json({ message: "No Contact Exists", success: false })
    }

    res.json({
        message: "Contact Deleted Successfully...!",
        deleteContact,
        success: true
    })
}

//get contact by id
export const getContactById = async (req, res) => {
    const id = req.params.id

    const userContact = await Contact.findById(id)
    if (!userContact) {
        return res.json({ message: "No Contact Found", success: false })
    }
    res.json({ message: "Contact Fetched", userContact, success: true })
}

//get contact by user id
export const getContactByUserId = async (req, res) => {
    const id = req.params.id

    const userContact = await Contact.find({user:id})
    if (!userContact) {
        return res.json({ message: "No Contact Found", success: false })
    }
    res.json({ message: "User Specific Contact Fetched", userContact, success: true })
}
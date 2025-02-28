import { response } from "express";
import Email from "../model/email.js";

export const saveSentEmails = async (request, response) => {
    try {
        const email = new Email(request.body);
        await email.save();

        response.status(200).json('Email saved successfully');
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const getEmails = async (request, response) => {
    try {
        let emails;
        if (request.params.type === 'bin') {
            emails = await Email.find({bin: true});
        }
        else if(request.params.type === 'allmail') {
            emails = await Email.find({})
        }
        else if (request.params.type === 'starred') {
            emails = await Email.find({ starred: true, bin: false})
        }
         else {
            emails = await Email.find({ type: request.params.type });
        }

        return response.status(200).json(emails);
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: error.message });
    }
}


export const moveEmailsToBin = async (request, response) => {
    try {
        await Email.updateMany({_id: { $in: request.body}}, { $set: { bin: true, starred: false, type: ''}})
        return response.status(200).json('email deleted successfully');
    } catch(error){
        console.log(error);
        response.status(500).json({ message: error.message });
    }
}


export const toggleStarredEmail = async ( request, response ) => {
    try{
        await Email.updateOne({_id: request.body.id}, { $set: { starred: request.body.value}})
        return response.status(200).json('email is starred mark');
        
    } catch(error){
        console.log(error);
        response.status(500).json({ message: error.message });
    }
}

export const deleteEmails = async ( request, response ) => {
    try{
        
        await Email.deleteMany({_id: {$in: request.body}});
        return response.status(200).json('email deleted successfully');

    } catch(error){
        console.log(error);
        response.status(500).json({ message: error.message });
    }
}
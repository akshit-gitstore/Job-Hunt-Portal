import mongoose from "mongoose";
import dotenv from "dotenv";
import { Job } from "./models/job.model.js";
import connectDB from "./utils/db.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

async function updateExistingJobs() {
    try {
        const jobs = await Job.find();
        for (let job of jobs) {
            if (!job.lastDateOfApplication) {
                job.lastDateOfApplication = new Date("2021-03-25"); // Set a default date or a specific one
                await job.save();
            }
        }
        console.log("All jobs updated successfully");
    } catch (error) {
        console.error("Error updating jobs:", error);
    } finally {
        mongoose.connection.close(); // Close the connection after update
    }
}

updateExistingJobs();

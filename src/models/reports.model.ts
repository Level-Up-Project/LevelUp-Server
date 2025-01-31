import mongoose, { Document, Schema } from 'mongoose';

// Defining the interface for the Report document
export interface IReport extends Document {
  type: string; // Type of report (e.g., 'userActivity', 'salesData', etc.)
  generatedBy: mongoose.Types.ObjectId; // Reference to the User who generated the report
  data: object; // The actual data of the report (could be a JSON object or raw data)
  generatedAt: Date; // Timestamp of when the report was generated
  updatedAt: Date; // Timestamp of when the report was last updated
  status: string; // Status of the report (e.g., 'pending', 'completed', 'archived')
}

// Define the schema for the Report model
const ReportSchema: Schema = new Schema(
  {
    type: { type: String, required: true }, // Type of report
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    data: { type: Schema.Types.Mixed, required: true }, // Can hold any type of data (JSON, arrays, etc.)
    generatedAt: { type: Date, required: true, default: Date.now }, // Date when the report was generated
    updatedAt: { type: Date, required: true, default: Date.now }, // Date when the report was last updated
    status: { type: String, required: true, default: 'pending' } // Report status (e.g., 'pending', 'completed', 'archived')
  },
  { timestamps: true }
);

// Creating the Report model with proper type
const Report = mongoose.model<IReport>('Report', ReportSchema);

export default Report;

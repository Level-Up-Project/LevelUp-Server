import mongoose, { Document, Schema } from 'mongoose';

// Defining the interface for the Certificate document
export interface ICertificate extends Document {
  title: string;  // Title of the certificate (e.g., 'Completion Certificate')
  description: string;  // Description or details about what the certificate is awarded for
  participantName: string;  // Name of the participant receiving the certificate
  issueDate: Date;  // Date when the certificate was issued
  createdAt: Date;  // Timestamp when the certificate document was created
  updatedAt: Date;  // Timestamp when the certificate document was last updated
}

// Define the schema for the Certificate model
const CertificateSchema: Schema = new Schema(
  {
    title: { type: String, required: true },  // e.g., 'Completion Certificate'
    description: { type: String, required: true },  // Details about what the certificate represents
    participantName: { type: String, required: true },  // Name of the participant receiving the certificate
    issueDate: { type: Date, required: true },  // Date when the certificate was issued
  },
  { timestamps: true }  // Automatically adds `createdAt` and `updatedAt` fields
);

// Creating the Certificate model with proper type
const Certificate = mongoose.model<ICertificate>('Certificate', CertificateSchema);

export default Certificate;

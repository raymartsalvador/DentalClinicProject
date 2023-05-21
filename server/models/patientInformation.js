const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientInformationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  medicalHistory: {
    preExistingConditions: [{ type: String }],
    chronicIllnesses: [{ type: String }],
    previousSurgeries: [{ type: String }],
  },
  allergiesAndSensitivities: {
    medicationAllergies: [{ type: String }],
    latexAllergy: { type: Boolean, default: false },
    dentalMaterialSensitivity: [{ type: String }],
  },
  medications: {
    prescriptionDrugs: [{ type: String }],
    overTheCounterMedications: [{ type: String }],
    supplements: [{ type: String }],
  },
  dentalHistory: {
    previousProcedures: [{ type: String }],
    oralHygienePractices: { type: String },
    dentalIssues: [{ type: String }],
  },
  dentalInsurance: {
    insuranceProvider: { type: String },
    policyNumber: { type: String },
    coverageDetails: { type: String },
  },
});

module.exports = mongoose.model('PatientInformation', patientInformationSchema, 'patient_information');

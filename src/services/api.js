import axios from "axios";
import { tenantService } from "./tenantService";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "/api", // Base URL for all requests
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get auth token from localStorage
    const token = localStorage.getItem("hg_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add tenant ID header if available
    const tenantId = tenantService.getCurrentTenant();
    if (tenantId) {
      config.headers["X-Tenant-ID"] = tenantId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mock API for demo purposes
const mockData = {
  patients: [
    {
      id: "patient-1",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1980-05-15",
      status: "active",
      insuranceProvider: "Blue Cross",
      lastVisit: "2023-03-10",
    },
    {
      id: "patient-2",
      firstName: "Jane",
      lastName: "Smith",
      dateOfBirth: "1975-08-22",
      status: "active",
      insuranceProvider: "Aetna",
      lastVisit: "2023-04-05",
    },
    {
      id: "patient-3",
      firstName: "Robert",
      lastName: "Johnson",
      dateOfBirth: "1990-12-03",
      status: "inactive",
      insuranceProvider: "Medicare",
      lastVisit: "2022-11-20",
    },
    {
      id: "patient-4",
      firstName: "Maria",
      lastName: "Garcia",
      dateOfBirth: "1988-03-28",
      status: "active",
      insuranceProvider: "Cigna",
      lastVisit: "2023-05-12",
    },
    {
      id: "patient-5",
      firstName: "David",
      lastName: "Brown",
      dateOfBirth: "1965-09-18",
      status: "pending",
      insuranceProvider: "UnitedHealth",
      lastVisit: "N/A",
    },
  ],
  appointments: [
    {
      id: "appt-1",
      patientId: "patient-1",
      doctorId: "doctor-123",
      patientName: "John Doe",
      doctorName: "Dr. Jane Smith",
      datetime: "2023-06-10T10:00:00",
      type: "Check-up",
      status: "scheduled",
    },
    {
      id: "appt-2",
      patientId: "patient-2",
      doctorId: "doctor-123",
      patientName: "Jane Smith",
      doctorName: "Dr. Jane Smith",
      datetime: "2023-06-10T11:00:00",
      type: "Follow-up",
      status: "scheduled",
    },
    {
      id: "appt-3",
      patientId: "patient-3",
      doctorId: "doctor-456",
      patientName: "Robert Johnson",
      doctorName: "Dr. Michael Brown",
      datetime: "2023-06-09T14:30:00",
      type: "Consultation",
      status: "completed",
    },
    {
      id: "appt-4",
      patientId: "patient-4",
      doctorId: "doctor-123",
      patientName: "Maria Garcia",
      doctorName: "Dr. Jane Smith",
      datetime: "2023-06-11T09:15:00",
      type: "Check-up",
      status: "scheduled",
    },
    {
      id: "appt-5",
      patientId: "patient-5",
      doctorId: "doctor-456",
      patientName: "David Brown",
      doctorName: "Dr. Michael Brown",
      datetime: "2023-06-08T16:00:00",
      type: "New Patient",
      status: "cancelled",
    },
  ],
  medicalRecords: {
    "patient-1": {
      id: "record-1",
      patientId: "patient-1",
      patientName: "John Doe",
      authorId: "doctor-123",
      departmentId: "cardiology",
      diagnosis: "Hypertension, Stage 1",
      vitalSigns: {
        bloodPressure: "140/90 mmHg",
        temperature: "98.6",
        heartRate: "78",
      },
      treatmentPlan:
        "Prescribed lisinopril 10mg daily. Recommended DASH diet and regular exercise.",
      notes:
        "Patient reports occasional headaches. Will follow up in 3 months.",
      billing: {
        status: "Billed",
        amount: 150.0,
        insuranceCoverage: 80,
        patientResponsibility: 30.0,
      },
      labResults: [
        { name: "Cholesterol", value: "210", unit: "mg/dL", isNormal: false },
        { name: "Blood Glucose", value: "95", unit: "mg/dL", isNormal: true },
        { name: "Potassium", value: "4.2", unit: "mEq/L", isNormal: true },
      ],
    },
  },
};

// API mock implementation
const mockApi = {
  get: async (url) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (url.startsWith("/patients")) {
      const patientId = url.split("/")[2];

      if (url.includes("/record")) {
        if (mockData.medicalRecords[patientId]) {
          return { data: mockData.medicalRecords[patientId] };
        }
        throw new Error("Record not found");
      }

      if (patientId) {
        const patient = mockData.patients.find((p) => p.id === patientId);
        if (patient) {
          return { data: patient };
        }
        throw new Error("Patient not found");
      }

      return { data: mockData.patients };
    }

    if (url.startsWith("/appointments")) {
      const appointmentId = url.split("/")[2];

      if (appointmentId) {
        const appointment = mockData.appointments.find(
          (a) => a.id === appointmentId
        );
        if (appointment) {
          return { data: appointment };
        }
        throw new Error("Appointment not found");
      }

      return { data: mockData.appointments };
    }

    if (url.startsWith("/roles")) {
      return {
        data: [
          {
            id: "admin",
            name: "Administrator",
            description: "Full system access",
          },
          {
            id: "doctor",
            name: "Doctor",
            description: "Medical staff with patient management",
          },
          {
            id: "nurse",
            name: "Nurse",
            description: "Medical staff with limited access",
          },
          {
            id: "patient",
            name: "Patient",
            description: "Access to own records only",
          },
          {
            id: "insurance",
            name: "Insurance Rep",
            description: "Limited access to billing information",
          },
        ],
      };
    }

    throw new Error("Endpoint not implemented in mock API");
  },

  post: async (url, data) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (url === "/roles") {
      // Generate unique ID
      const id = `role-${Date.now()}`;
      return { data: { id, ...data } };
    }

    throw new Error("Endpoint not implemented in mock API");
  },

  put: async (url, data) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (url.startsWith("/roles/")) {
      return { data };
    }

    if (url.includes("/record")) {
      const patientId = url.split("/")[2];

      if (mockData.medicalRecords[patientId]) {
        mockData.medicalRecords[patientId] = {
          ...mockData.medicalRecords[patientId],
          ...data,
        };
        return { data: mockData.medicalRecords[patientId] };
      }
      throw new Error("Record not found");
    }

    throw new Error("Endpoint not implemented in mock API");
  },

  delete: async (url) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (url.startsWith("/roles/")) {
      return { data: { success: true } };
    }

    if (url.startsWith("/appointments/")) {
      return { data: { success: true } };
    }

    if (url.startsWith("/patients/")) {
      return { data: { success: true } };
    }

    throw new Error("Endpoint not implemented in mock API");
  },
};

// Use mock API for development
export const api = mockApi;

// In a real app, you would use the axios instance instead:
// export const api = axiosInstance;

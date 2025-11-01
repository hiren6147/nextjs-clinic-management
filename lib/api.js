import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// API service functions
export const apiService = {
  // Get patients list
  getPatients: async (limit = 20, skip = 0) => {
    try {
      // Using dummyjson users as patients
      const response = await api.get("/users", {
        params: { limit, skip },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  },

  // Get single patient by ID
  getPatient: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching patient:", error);
      throw error;
    }
  },

  // Get invoices list (using posts as invoices for demo)
  getInvoices: async (limit = 20, skip = 0) => {
    try {
      // Using dummyjson posts as invoices
      const response = await api.get("/posts", {
        params: { limit, skip },
      });

      // Transform posts to invoice-like structure
      // Use deterministic values based on post.id to avoid hydration mismatches
      const invoices = response.data.posts.map((post, index) => {
        // Deterministic pseudo-random values based on post.id
        const seed = post.id;
        const amount = ((seed * 137) % 5000) + 100; // Deterministic amount between 100-5000
        const statusIndex = (seed * 7) % 3;
        const dateOffset = (seed * 11) % 30; // Days offset from today

        return {
          id: post.id,
          invoiceNumber: `INV-${String(post.id).padStart(6, "0")}`,
          title: post.title,
          description: post.body,
          amount: amount,
          date: (() => {
            // Use a fixed base date for deterministic results
            const baseDate = new Date("2024-01-01");
            const calculatedDate = new Date(
              baseDate.getTime() + dateOffset * 24 * 60 * 60 * 1000
            );
            return calculatedDate.toISOString().split("T")[0];
          })(),
          status: ["Paid", "Pending", "Overdue"][statusIndex],
          patientId: post.userId,
        };
      });

      return {
        invoices,
        total: response.data.total,
        skip: response.data.skip,
        limit: response.data.limit,
      };
    } catch (error) {
      console.error("Error fetching invoices:", error);
      throw error;
    }
  },

  // Get single invoice by ID
  getInvoice: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      const post = response.data;

      // Transform to invoice-like structure
      // Use deterministic values based on post.id to avoid hydration mismatches
      const seed = post.id;
      const amount = ((seed * 137) % 5000) + 100; // Deterministic amount between 100-5000
      const statusIndex = (seed * 7) % 3;
      const dateOffset = (seed * 11) % 30; // Days offset from today

      return {
        id: post.id,
        invoiceNumber: `INV-${String(post.id).padStart(6, "0")}`,
        title: post.title,
        description: post.body,
        amount: amount,
        date: (() => {
          // Use a fixed base date for deterministic results
          const baseDate = new Date("2024-01-01");
          const calculatedDate = new Date(
            baseDate.getTime() + dateOffset * 24 * 60 * 60 * 1000
          );
          return calculatedDate.toISOString().split("T")[0];
        })(),
        status: ["Paid", "Pending", "Overdue"][statusIndex],
        patientId: post.userId,
        tags: post.tags || [],
      };
    } catch (error) {
      console.error("Error fetching invoice:", error);
      throw error;
    }
  },

  // Get dashboard stats (mock data)
  getDashboardStats: async () => {
    try {
      // Fetch multiple endpoints in parallel
      const [patientsRes, invoicesRes] = await Promise.all([
        api.get("/users", { params: { limit: 1 } }),
        api.get("/posts", { params: { limit: 1 } }),
      ]);

      return {
        totalPatients: patientsRes.data.total || 100,
        totalInvoices: invoicesRes.data.total || 150,
        pendingInvoices: Math.floor(invoicesRes.data.total * 0.3) || 45,
        totalRevenue: Math.floor(invoicesRes.data.total * 2500) || 375000,
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },
};

export default api;

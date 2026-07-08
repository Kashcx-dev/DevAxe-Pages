// MOCK REGISTRATION API
// Replace this with real backend logic later

export const registerUser = async (userData) => {
  console.log("INITIALIZING REGISTRATION_SEQUENCE...");
  console.log("PAYLOAD_DATA:", userData);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        message: "Registration successful. Welcome to the system.",
        user: userData
      });
    }, 1500); // simulate network delay
  });
};

import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000
}); 

socket.on("connect", () => {
    console.log("✅ Connected");
  });
  
  socket.on("disconnect", (reason) => {
    console.log("❌ Disconnected:", reason);
  });
  
  socket.on("reconnect_attempt", () => {
    console.log("🔄 Trying to reconnect...");
  });
  
  socket.on("reconnect_failed", () => {
    console.log("🚫 Could not reconnect. You may need to refresh.");
    // Optional: Show a UI toast or alert
  });
export default socket;

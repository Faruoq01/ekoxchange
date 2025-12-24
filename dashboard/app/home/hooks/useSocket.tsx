import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private hasJoined = false;

  private constructor() {
    // private to prevent external instantiation
  }

  /** Get the singleton instance */
  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  /** Connect socket (will reuse existing if connected) */
  public connect(): Socket {
    if (this.socket?.connected) return this.socket;

    // Close previous socket if exists
    this.socket?.close();

    this.socket = io(`${SOCKET_URL}/realtime`, {
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 8,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
      timeout: 20000,
      forceNew: false,
    });

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket?.id);
      if (!this.hasJoined) {
        this.hasJoined = true;
        this.socket?.emit("join");
      }

      window.dispatchEvent(new Event("socket-ready"));
    });

    this.socket.on("disconnect", (reason) => {
      console.warn("Disconnected:", reason);
      if (reason === "io server disconnect") this.hasJoined = false;
    });

    this.socket.on("connect_error", (err) => {
      console.error("Connect error:", err.message);
      this.hasJoined = false;
    });

    // Ensure disconnect on page unload
    window.addEventListener("beforeunload", () => {
      this.disconnect();
    });

    return this.socket;
  }

  /** Disconnect manually */
  public disconnect() {
    if (this.socket) {
      this.hasJoined = false;
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /** Force reconnect */
  public reconnect(delay = 500) {
    this.hasJoined = false;
    this.disconnect();
    setTimeout(() => this.connect(), delay);
  }

  /** Check connection state */
  public isConnected(): boolean {
    return !!this.socket?.connected;
  }

  /** Get socket instance */
  public getSocket(): Socket | null {
    return this.socket;
  }
}

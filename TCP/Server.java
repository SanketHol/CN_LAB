import java.io.*;
import java.net.*;

public class Server {
    public static void main(String[] args) {
        int port = 5000;
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Server started. Waiting for client...");

            Socket socket = serverSocket.accept();
            System.out.println("Client connected.");

            // Input from client
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            // Output to client
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

            // Send hello to client
            out.println("Hello from Server!");

            // Read hello from client
            String clientMsg = in.readLine();
            System.out.println("Client says: " + clientMsg);

            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

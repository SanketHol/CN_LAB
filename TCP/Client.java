import java.io.*;
import java.net.*;

public class Client {
    public static void main(String[] args) {
        String hostname = "localhost";
        int port = 5000;

        try (Socket socket = new Socket(hostname, port)) {

            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
          
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

            // Read message from server
            String serverMsg = in.readLine();
            System.out.println("Server says: " + serverMsg);

            // Send hello to server
            out.println("Hello from Client!");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

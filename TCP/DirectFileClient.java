import java.io.*;
import java.net.*;

public class DirectFileClient {
    public static void main(String[] args) {
        String serverIP = "192.168.137.177"; // <-- Replace with SERVER machine's IPv4 address
        int port = 5000; // Must match the port in FileServer

        try (Socket socket = new Socket(serverIP, port);
             FileOutputStream fos = new FileOutputStream("received2.txt")) {

            System.out.println("Connected to server: " + serverIP + ":" + port);

            // Read file data from server
            InputStream is = socket.getInputStream();
            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = is.read(buffer)) != -1) {
                fos.write(buffer, 0, bytesRead);
            }

            System.out.println("File received successfully and saved as received2.txt");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
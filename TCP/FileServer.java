import java.io.*;
import java.net.*;

public class FileServer {
    public static void main(String[] args) {
        int port = 6000;
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("File Server started. Waiting for connection...");

            Socket socket = serverSocket.accept();
            System.out.println("Client connected. Receiving file...");

            // File output stream to save file
            FileOutputStream fos = new FileOutputStream("new_received_file.mkv");
            BufferedOutputStream bos = new BufferedOutputStream(fos);

            // Input from client
            InputStream is = socket.getInputStream();

            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = is.read(buffer)) != -1) {
                bos.write(buffer, 0, bytesRead);
            }

            bos.close();
            socket.close();
            System.out.println("File received successfully.");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

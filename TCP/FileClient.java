import java.io.*;
import java.net.*;

public class FileClient {
    public static void main(String[] args) {
        String hostname = "localhost";
        int port = 6000;
        String filePath = "D:\\Movies\\Heads Of State (2025).mkv"; 

        try (Socket socket = new Socket(hostname, port)) {
            System.out.println("Connected to server. Sending file...");

            File file = new File(filePath);
            byte[] buffer = new byte[4096];

            FileInputStream fis = new FileInputStream(file);
            BufferedInputStream bis = new BufferedInputStream(fis);
            OutputStream os = socket.getOutputStream();

            int bytesRead;
            while ((bytesRead = bis.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }

            os.flush();
            bis.close();
            System.out.println("File sent successfully.");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

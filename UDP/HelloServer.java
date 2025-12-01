import java.net.*;

public class HelloServer {
    public static void main(String[] args) {
        try {
            DatagramSocket serverSocket = new DatagramSocket(9876); // Server listens on port 9876
            byte[] receiveData = new byte[1024];
            byte[] sendData;

            System.out.println("UDP Server started. Waiting for client...");

            // Receive message from client
            DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
            serverSocket.receive(receivePacket);
            String clientMessage = new String(receivePacket.getData(), 0, receivePacket.getLength());
            System.out.println("Client says: " + clientMessage);

            // Send reply back to client
            InetAddress clientIP = receivePacket.getAddress();
            int clientPort = receivePacket.getPort();
            String reply = "Hello from Server!";
            sendData = reply.getBytes();
            DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, clientIP, clientPort);
            serverSocket.send(sendPacket);

            System.out.println("Reply sent to client.");
            serverSocket.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

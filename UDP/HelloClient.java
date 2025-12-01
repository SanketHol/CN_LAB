import java.net.*;

public class HelloClient {
    public static void main(String[] args) {
        try {
            DatagramSocket clientSocket = new DatagramSocket();

            InetAddress serverAddress = InetAddress.getByName("localhost");
            byte[] sendData;
            byte[] receiveData = new byte[1024];

            // Send hello to server
            String message = "Hello from Client!";
            sendData = message.getBytes();
            DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, serverAddress, 9876);
            clientSocket.send(sendPacket);

            // Receive reply from server
            DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
            clientSocket.receive(receivePacket);
            String serverReply = new String(receivePacket.getData(), 0, receivePacket.getLength());
            System.out.println("Server says: " + serverReply);

            clientSocket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

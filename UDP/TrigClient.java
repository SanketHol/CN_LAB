import java.net.*;
import java.util.Scanner;

public class TrigClient {
    private static final int PORT = 9001;
    private static final int BUF_SIZE = 1024;

    public static void main(String[] args) {
        try (DatagramSocket clientSocket = new DatagramSocket()) {
            InetAddress serverAddress = InetAddress.getByName("localhost");
            Scanner scanner = new Scanner(System.in);

            while (true) {
                System.out.print("Enter: <function> <value> [deg/rad] (or 'quit'): ");
                String input = scanner.nextLine();

                byte[] sendData = input.getBytes();
                DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, serverAddress, PORT);
                clientSocket.send(sendPacket);

                if (input.equalsIgnoreCase("quit")) {
                    System.out.println("Exiting client...");
                    break;
                }

                // Receive result
                byte[] receiveData = new byte[BUF_SIZE];
                DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
                clientSocket.receive(receivePacket);
                String result = new String(receivePacket.getData(), 0, receivePacket.getLength());

                System.out.println("Server: " + result);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

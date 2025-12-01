import java.net.*;

public class TrigServer {
    private static final int PORT = 9001;
    private static final int BUF_SIZE = 1024;

    // Convert to radians if input is in degrees
    private static double toRadians(double value, boolean isDeg) {
        return isDeg ? Math.toRadians(value) : value;
    }

    public static void main(String[] args) {
        try (DatagramSocket serverSocket = new DatagramSocket(PORT)) {
            byte[] receiveData = new byte[BUF_SIZE];
            byte[] sendData;

            System.out.println("UDP Calculator Server running on port " + PORT + "...");

            while (true) {
                // Receive from client
                DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
                serverSocket.receive(receivePacket);
                String input = new String(receivePacket.getData(), 0, receivePacket.getLength()).trim();

                System.out.println("Received from client: " + input);

                if (input.equalsIgnoreCase("quit")) {
                    System.out.println("Client disconnected.");
                    break;
                }

                // Parse input -> func value [unit]
                String[] parts = input.split("\\s+");
                String func = parts[0].toLowerCase();
                double value = Double.parseDouble(parts[1]);
                String unit = (parts.length == 3) ? parts[2].toLowerCase() : "rad";
                boolean isDeg = unit.equals("deg");

                double result = 0.0;
                boolean valid = true;

                switch (func) {
                    case "sin": result = Math.sin(toRadians(value, isDeg)); break;
                    case "cos": result = Math.cos(toRadians(value, isDeg)); break;
                    case "tan": result = Math.tan(toRadians(value, isDeg)); break;
                    case "cot": result = 1.0 / Math.tan(toRadians(value, isDeg)); break;
                    case "sec": result = 1.0 / Math.cos(toRadians(value, isDeg)); break;
                    case "cosec": result = 1.0 / Math.sin(toRadians(value, isDeg)); break;
                    default: valid = false; break;
                }

                String reply;
                if (valid) {
                    reply = String.format("Result: %.6f", result);
                    System.out.printf("Computed %s(%f %s) = %f%n", func, value, (isDeg ? "deg" : "rad"), result);
                } else {
                    reply = "Invalid function! Use sin, cos, tan, cot, sec, cosec";
                    System.out.println("Invalid function request!");
                }

                // Send reply
                InetAddress clientIP = receivePacket.getAddress();
                int clientPort = receivePacket.getPort();
                sendData = reply.getBytes();
                DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, clientIP, clientPort);
                serverSocket.send(sendPacket);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

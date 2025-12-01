import java.util.*;
public class DijkstraRouting {
    static class Edge {
        int target, weight;
        Edge(int target, int weight) {
            this.target = target;
            this.weight = weight;
        }
    }
    static class Node implements Comparable<Node> {
        int vertex, distance;
        Node(int vertex, int distance) {
            this.vertex = vertex;
            this.distance = distance;
        }
        public int compareTo(Node other) {
            return this.distance - other.distance;
        }
    }
    static void dijkstra(List<List<Edge>> graph, int source) {
        int n = graph.size();
        int[] dist = new int[n];
        boolean[] visited = new boolean[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[source] = 0;
        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.add(new Node(source, 0));

        while (!pq.isEmpty()) {
            Node current = pq.poll();
            int u = current.vertex;
            if (visited[u]) continue;
            visited[u] = true;
            for (Edge edge : graph.get(u)) {
                int v = edge.target;
                int weight = edge.weight;
                if (!visited[v] && dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.add(new Node(v, dist[v]));
                }
            }
        }
        System.out.println("Shortest distances from node " + source + ":");
        for (int i = 1; i < n; i++) {
            System.out.println("To node " + i + ": " + dist[i]);
        }
    }
    public static void main(String[] args) {
        int vertices = 7; // index 0 unused for simplicity
        List<List<Edge>> graph = new ArrayList<>();
        for (int i = 0; i < vertices; i++) {
            graph.add(new ArrayList<>());
        }
        graph.get(1).add(new Edge(2, 1));
        graph.get(1).add(new Edge(4, 1));
        graph.get(2).add(new Edge(1, 1));
        graph.get(2).add(new Edge(3, 2));
        graph.get(2).add(new Edge(4, 1));
        graph.get(3).add(new Edge(2, 2));
        graph.get(3).add(new Edge(4, 1));
        graph.get(3).add(new Edge(5, 1));
        graph.get(3).add(new Edge(6, 1));
        graph.get(4).add(new Edge(1, 1));
        graph.get(4).add(new Edge(2, 1));
        graph.get(4).add(new Edge(3, 1));
        graph.get(4).add(new Edge(5, 2));
        graph.get(5).add(new Edge(3, 1));
        graph.get(5).add(new Edge(4, 2));
        graph.get(5).add(new Edge(6, 15));
        graph.get(6).add(new Edge(3, 1));
        graph.get(6).add(new Edge(5, 15));
        dijkstra(graph, 1);  
    }
}

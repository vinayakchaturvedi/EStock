package com.example.userinterfaceservice;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Set;

public class LoadApiData {

    @SuppressWarnings("unchecked")
    public void loadData() {
        String parentDirectory = System.getProperty("user.dir");
        String dataFolderPath = parentDirectory + "/user-interface-service/src/main/webapp/estock-ui/src/data_and_config/";
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode stocksToLoad = objectMapper
                    .readTree(Files.readAllBytes(Paths.get(dataFolderPath + "StockToShow.json")))
                    .get("Stocks");
            String apiKey = objectMapper
                    .readTree(Files.readAllBytes(Paths.get(dataFolderPath + "StockToShow.json")))
                    .get("ApiKey").textValue();
            for (JsonNode stock : stocksToLoad) {
                String currStock = stock.textValue();
                String apiURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + currStock + "&&apikey=" + apiKey;
                URL urlObject = new URL(apiURL);
                HttpURLConnection connection = (HttpURLConnection) urlObject.openConnection();
                connection.setRequestMethod("GET");
                StringBuilder responseBody = new StringBuilder("");
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String currLine = "";
                while ((currLine = bufferedReader.readLine()) != null) {
                    responseBody.append(currLine);
                }
                bufferedReader.close();

                JSONObject jsonObject = new JSONObject(responseBody.toString());
                org.json.simple.JSONObject simpleJsonObject = new org.json.simple.JSONObject();

                Set<String> strings = jsonObject.keySet();
                for (String s : strings) {
                    simpleJsonObject.put(s, jsonObject.get(s));
                }
                System.out.println("Writing: " + currStock + ".json");
                FileWriter fileWriter = new FileWriter(dataFolderPath + currStock + ".json");
                fileWriter.flush();
                fileWriter.write(simpleJsonObject.toJSONString());
                fileWriter.close();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }


    }
}

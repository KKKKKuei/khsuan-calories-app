package com.khusan.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.khusan.dao.FoodDAO;
import com.khusan.entity.Foods;
import com.khusan.model.FoodRequest;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
public class FoodService {

    @Autowired
    FoodDAO dao;

    @Autowired
    OllamaService ollamaService;

    private final ObjectMapper objectMapper = new ObjectMapper();


    public List<Foods> getAllFoods() {
        return dao.getAllFoods();
    }

    public void addNewFood(Foods foods) {
        log.info("foods: " + foods);
//        dao.addNewFood(foods);
    }

    public Mono<List<Object>> callAiGetFoodData(FoodRequest data) {
        String prompt = String.format(
                "請嚴格按照以下指令執行：\n" +
                        "\n" +
                        "1. 在繁體中文網站搜尋以下食物的營養成分，精確對應指定份量：\n" +
                        "   - {%s}（{%s}）" +
                        "\n" +
                        "2. 請從多個可靠來源（如衛福部食品營養資料庫、知名健康網站、營養師部落格等）蒐集數據\n" +
                        "\n" +
                        "3. 回傳格式**必須是純JSON陣列**，嚴格遵守此結構：\n" +
                        "[\n" +
                        "  {\n" +
                        "    \"name\": \"食物名稱\",\n" +
                        "    \"servingSize\": \"份量(一份或100公克)\",\n" +
                        "    \"calories\": 數字,\n" +
                        "    \"protein\": 數字或null,\n" +
                        "    \"carbohydrates\": 數字或null,\n" +
                        "    \"fat\": 數字或null,\n" +
                        "    \"fiber\": 數字或null,\n" +
                        "    \"sugar\": 數字或null,\n" +
                        "    \"saturatedFat\": 數字或null,\n" +
                        "    \"sodium\": 數字或null,\n" +
                        "    \"dataSource\": \"來源網站名稱\"或null,\n" +
                        "    \"updatedAt\": \"2024-01-15\"\n" +
                        "  }\n" +
                        "]\n" +
                        "\n" +
                        "4. **絕對禁止**添加任何額外文字、註解、Markdown符號（包括```json```）\n" +
                        "\n" +
                        "5. 如果找不到某項食物的完整數據，仍須回傳該物件，數值欄位可設為null\n" +
                        "\n" +
                        "6. 確保JSON格式完全正確：引號使用正確、逗號分隔適當、沒有尾隨逗號\n" +
                        "\n" +
                        "現在請回傳純JSON陣列："

                , data.getFoodName(), data.getServingSize());
        log.info("promptssssssss" + prompt);
        return ollamaService.getFoodNutritionInfo(prompt)
                .map(jsonResponse -> {
                    System.out.println("從 Ollama 接收到的 JSON 字串：" + jsonResponse);

                    JSONObject resp = new JSONObject(jsonResponse);
                    Object obj = resp.get("response");

                    Pattern pattern = Pattern.compile("```json\\s*([\\s\\S]*?)\\s*```", Pattern.MULTILINE);
                    Matcher matcher = pattern.matcher(obj.toString());


                    List<String> jsonBlocks = new ArrayList<>();
                    while (matcher.find()) {
                        jsonBlocks.add(matcher.group(1).trim());
                    }

                    String cleanedJson;
                    if (jsonBlocks.size() == 1) {
                        String singleBlock = jsonBlocks.get(0);
                        // 檢查單一區塊是否已經是陣列
                        if (singleBlock.startsWith("[") && singleBlock.endsWith("]")) {
                            cleanedJson = singleBlock;
                        } else {
                            cleanedJson = "[" + singleBlock + "]";
                        }
                    } else {
                        // 如果有多個區塊，將它們組合成一個陣列
                        StringBuilder combinedJson = new StringBuilder("[");
                        for (int i = 0; i < jsonBlocks.size(); i++) {
                            combinedJson.append(jsonBlocks.get(i));
                            if (i < jsonBlocks.size() - 1) {
                                combinedJson.append(", ");
                            }
                        }
                        combinedJson.append("]");
                        cleanedJson = combinedJson.toString();
                    }
                    System.out.println("清理並組合後的 JSON 字串：\n" + cleanedJson);

                    try {
                        return objectMapper.readValue(cleanedJson, new TypeReference<>() {
                        });
                    } catch (IOException e) {
                        System.err.println("JSON 解析失敗: " + e.getMessage());
                        return null;
                    }
                });
    }

    public Mono<List<Object>> processFoodQuery(String foodString) {
        String prompt = String.format(
//                "你是一個很有經驗的營養師，幫我在各個平台搜尋我提供的食物營養成分，回應必須是一個有效的 JSON 字串。不要包含任何文字、註解或 Markdown 語法。\n" +
//                        "請根據以下提供的食物和份量，回傳JSON string：\n" +
//                        "%s\n" +
//                        "回傳的JSON string中，每個物件都必須符合以下格式，可以讓我使用JSONObject做轉換：\n" +
//                        "{\n" +
//                        "  \"name\": \"string\",\n" +
//                        "  \"servingSize\": \"string\",\n" +
//                        "  \"servings\": \"string\",\n" +
//                        "  \"calories\": \"number | null\",\n" +
//                        "  \"protein\": \"number | null\",\n" +
//                        "  \"carbohydrates\": \"number | null\",\n" +
//                        "  \"fat\": \"number | null\",\n" +
//                        "  \"fiber\": \"number | null\",\n" +
//                        "  \"sugar\": \"number | null\",\n" +
//                        "  \"saturatedFat\": \"number | null\",\n" +
//                        "  \"sodium\": \"number | null\",\n" +
//                        "  \"dataSource\": \"string | null\",\n" +
//                        "},\n" +
//                        "{\n" +
//                        "  \"name\": \"string\",\n" +
//                        "  ...\n" +
//                        "}"

//                "請在多個平台上搜尋我提供的食物營養成分，主要以繁體中文網站進行搜尋，我提供幾項食物，就回傳幾個物件。回應必須是一個有效的 JSON 陣列。不要包含任何文字、註解或 Markdown 語法。請根據{{}}中提供的食物和份量，若是複數食物會用||來分，回傳JSON string：{{%s}}。回傳的JSON string中，每個物件都必須符合以下格式：\n" +
//                        "{\n" +
//                        "  \"name\": \"string\",\n" +
//                        "  \"servingSize\": \"string\",\n" +
//                        "  \"calories\": \"number | null\",\n" +
//                        "  \"protein\": \"number | null\",\n" +
//                        "  \"carbohydrates\": \"number | null\",\n" +
//                        "  \"fat\": \"number | null\",\n" +
//                        "  \"fiber\": \"number | null\",\n" +
//                        "  \"sugar\": \"number | null\",\n" +
//                        "  \"saturatedFat\": \"number | null\",\n" +
//                        "  \"sodium\": \"number | null\",\n" +
//                        "  \"dataSource\": \"string | null\",\n" +
//                        "  \"updatedAt\": \"string\"\n" +
//                        "}"

//                "請根據提供的食物資訊，回傳一個符合指定格式的 JSON 陣列。\n" +
//                        "\n" +
//                        "輸入格式：\n" +
//                        "- 以 \"||\" 分隔多個食物。\n" +
//                        "- 每個食物資訊包含：食物名稱和份量。\n" +
//                        "\n" +
//                        "輸出格式：\n" +
//                        "- 回傳內容必須是**一個單一的、有效的 JSON 陣列**。\n" +
//                        "- 不得包含任何額外文字、註解或 Markdown 符號。\n" +
//                        "- 陣列中的每個物件都必須符合以下 JSON 結構：\n" +
//                        "  {\n" +
//                        "    \"name\": \"string\",\n" +
//                        "    \"servingSize\": \"string\",\n" +
//                        "    \"calories\": \"number | null\",\n" +
//                        "    \"protein\": \"number | null\",\n" +
//                        "    \"carbohydrates\": \"number | null\",\n" +
//                        "    \"fat\": \"number | null\",\n" +
//                        "    \"fiber\": \"number | null\",\n" +
//                        "    \"sugar\": \"number | null\",\n" +
//                        "    \"saturatedFat\": \"number | null\",\n" +
//                        "    \"sodium\": \"number | null\",\n" +
//                        "    \"dataSource\": \"string | null\",\n" +
//                        "    \"updatedAt\": \"string\"\n" +
//                        "  }\n" +
//                        "\n" +
//                        "請根據以下資訊生成JSON：\n" +
//                        "{{%s}}"

                "請嚴格按照以下指令執行：\n" +
                        "\n" +
                        "1. 在繁體中文網站搜尋以下食物的營養成分，精確對應份量：\n" +
                        "   - 火腿蛋餅（1份）\n" +
                        "   - 香蕉（1根）\n" +
                        "\n" +
                        "2. **必須**回傳**恰好2個**JSON物件，與輸入食物數量完全一致\n" +
                        "\n" +
                        "3. 回傳格式**必須是純JSON陣列**，嚴格遵守此結構：\n" +
                        "[\n" +
                        "  {\n" +
                        "    \"name\": \"食物名稱\",\n" +
                        "    \"servingSize\": \"份量(一份或100公克)\",\n" +
                        "    \"calories\": 數字,\n" +
                        "    \"protein\": 數字或null,\n" +
                        "    \"carbohydrates\": 數字或null,\n" +
                        "    \"fat\": 數字或null,\n" +
                        "    \"fiber\": 數字或null,\n" +
                        "    \"sugar\": 數字或null,\n" +
                        "    \"saturatedFat\": 數字或null,\n" +
                        "    \"sodium\": 數字或null,\n" +
                        "    \"dataSource\": \"來源網站名稱\"或null,\n" +
                        "    \"updatedAt\": \"2024-01-15\"\n" +
                        "  }\n" +
                        "]\n" +
                        "\n" +
                        "4. **絕對禁止**添加任何額外文字、註解、Markdown符號（包括```json```）\n" +
                        "\n" +
                        "5. 如果找不到某項食物的完整數據，仍須回傳該物件，數值欄位可設為null\n" +
                        "\n" +
                        "6. 確保JSON格式完全正確：引號使用正確、逗號分隔適當、沒有尾隨逗號\n" +
                        "\n" +
                        "現在請回傳純JSON陣列："

                , foodString);
        log.info("promptssssssss" + prompt);
        return ollamaService.getFoodNutritionInfo(prompt)
                .map(jsonResponse -> {
                    System.out.println("從 Ollama 接收到的 JSON 字串：" + jsonResponse);

                    JSONObject resp = new JSONObject(jsonResponse);
                    Object obj = resp.get("response");

                    Pattern pattern = Pattern.compile("```json\\s*([\\s\\S]*?)\\s*```", Pattern.MULTILINE);
                    Matcher matcher = pattern.matcher(obj.toString());


                    List<String> jsonBlocks = new ArrayList<>();
                    while (matcher.find()) {
                        jsonBlocks.add(matcher.group(1).trim());
                    }

                    String cleanedJson;
                    if (jsonBlocks.size() == 1) {
                        String singleBlock = jsonBlocks.get(0);
                        // 檢查單一區塊是否已經是陣列
                        if (singleBlock.startsWith("[") && singleBlock.endsWith("]")) {
                            cleanedJson = singleBlock;
                        } else {
                            cleanedJson = "[" + singleBlock + "]";
                        }
                    } else {
                        // 如果有多個區塊，將它們組合成一個陣列
                        StringBuilder combinedJson = new StringBuilder("[");
                        for (int i = 0; i < jsonBlocks.size(); i++) {
                            combinedJson.append(jsonBlocks.get(i));
                            if (i < jsonBlocks.size() - 1) {
                                combinedJson.append(", ");
                            }
                        }
                        combinedJson.append("]");
                        cleanedJson = combinedJson.toString();
                    }
                    System.out.println("清理並組合後的 JSON 字串：\n" + cleanedJson);

                    try {
                        return objectMapper.readValue(cleanedJson, new TypeReference<>() {
                        });
                    } catch (IOException e) {
                        System.err.println("JSON 解析失敗: " + e.getMessage());
                        return null;
                    }
                });
    }


}

// export interface NutritionInfo {
//     calories: number;          // 熱量
//     protein: number | undefined;           // 蛋白質 (g)
//     carbohydrates: number | undefined;     // 碳水化合物 (g)
//     fat: number | undefined;               // 脂肪 (g)
//     fiber: number | undefined;             // 纖維 (g)
//     sugar: number | undefined;             // 糖 (g)
//     saturatedFat: number | undefined;      // 飽和脂肪 (g)
//     sodium: number | undefined;            // 鈉 (mg)
// }

// export interface FoodItem extends NutritionInfo {
//     name: string;             // 食物名稱

// }
export interface FoodItem {
    name: string;               // 食物名稱
    servingSize: string;        // 份量 (e.g., "100g", "1 cup")
    servings: number | 1;      // 份數
    calories: number;           // 熱量
    protein: number | undefined;           // 蛋白質 (g)
    carbohydrates: number | undefined;     // 碳水化合物 (g)
    fat: number | undefined;               // 脂肪 (g)
    fiber: number | undefined;             // 纖維 (g)
    sugar: number | undefined;             // 糖 (g)
    saturatedFat: number | undefined;      // 飽和脂肪 (g)
    sodium: number | undefined;            // 鈉 (mg)
    dataSource: string | undefined;        // 資料來源
    updatedAt: string;        // 資料更新時間
}

export interface Meal {
    mealType: string;         // 餐點類型
    foods: FoodItem[];        // 食物陣列，每個項目都是 FoodItem
    totalCalories: number;    // 總熱量
    totalProtein?: number;     // 總蛋白質 (g)
}

export interface FoodList {
    meals: Meal[];            // 餐點陣列
    accordionValue: String[];
}

export interface WeightLossGoals {
    dailyCalories: number;     // 每日熱量目標
    proteinTarget: number;     // 蛋白質目標 (g)
    carbLimit: number;         // 碳水上限 (g)
    fatLimit: number;          // 脂肪上限 (g)
    fiberGoal: number;         // 纖維目標 (g)
    waterGoal: number;         // 水分目標 (ml)
}
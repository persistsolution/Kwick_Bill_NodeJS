import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tbl_cust_sub_category_2025").del();

    // Inserts seed entries
    await knex("tbl_cust_sub_category_2025").insert([
        { CatId: 5, Name: "Ajit Products", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-12 11:56:20", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 5, Name: "Cothas Product", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-12 11:56:36", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 5, Name: "Evergreen Products", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-12 11:57:05", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 5, Name: "Foodworse Global", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-12 11:57:49", ModifiedBy: 0, ModifiedDate: null },
    {CatId: 5, Name: "Haldiram Products", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-12 11:58:08", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 5, Name: "Healthy Product", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-12 11:58:30", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 5, Name: "Ladachi Kulfi", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-12 11:58:46", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 5, Name: "Pepsi Coldrink", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-12 12:09:19", ModifiedBy: 0, ModifiedDate: null },
    {  CatId: 5, Name: "Others", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-13 13:18:38", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 5, Name: "Godawari Product", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-13 13:59:46", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 5, Name: "Amar Products", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-13 14:00:12", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 0, Name: "Snacks", Photo: "", Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-13 14:57:37", ModifiedBy: 2091, ModifiedDate: "2025-01-15 00:00:00" },
    { CatId: 5, Name: "Cravitos", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2024-12-27 15:01:34", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 5, Name: "Sunder", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-21 17:16:12", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 5, Name: "Amar", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-21 17:16:29", ModifiedBy: 2091, ModifiedDate: "2025-01-22 13:51:46" },
    { CatId: 17, Name: "Soup", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-22 16:40:19", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Starter", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-22 16:47:10", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Starters (Tandoor)", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-22 16:47:37", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Chinese", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-22 16:47:50", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Chinese", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 10:32:26", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Main Course (Indian)", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 10:32:45", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Dal", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 10:33:54", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Noodles & Rice", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 10:34:19", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Rice", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 10:34:29", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Pizza", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 10:34:50", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Sandwich", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 10:35:03", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Indian Breads", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 12:00:47", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Paratha", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 12:01:05", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Ice Creams", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 12:01:36", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Desserts", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 12:01:46", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Milk Shake", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 12:02:16", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Tea / Coffee With Milk", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 12:02:38", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Special Menu", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 12:03:03", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Extra", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 12:03:13", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Combo", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 12:03:26", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Burger", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 12:03:44", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 25, Name: "Snacks", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-23 16:02:02", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 17, Name: "Combos", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-28 00:00:00", ModifiedBy: 0, ModifiedDate: null },
    { CatId: 17, Name: "Others", Photo: null, Status: 1, FrId: 0, ProdType: 0, CreatedBy: 2091, CreatedDate: "2025-01-28 00:00:00", ModifiedBy: 0, ModifiedDate: null }
    ]);
};

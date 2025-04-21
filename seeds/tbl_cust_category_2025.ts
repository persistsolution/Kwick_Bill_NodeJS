import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tbl_cust_category_2025").del();

    // Inserts seed entries
    await knex("tbl_cust_category_2025").insert([
    { id: 5, Name: 'Packed Mrp Products', Featured: 0, ProdType: 0, Status: 1, srno: 1.0, CreatedDate: '2024-12-12 11:52:09', CreatedBy: 2091, ModifiedBy: 0, push_flag: 1, delete_flag: 0, modified_time: '2024-12-25 06:22:09.171' },
    { id: 6, Name: 'Grocery', Featured: 0, ProdType: 1, Status: 1, srno: 1.0, CreatedDate: '2024-12-12 12:38:34', CreatedBy: 2091, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: '2024-12-25 06:22:09.171' },
    { id: 7, Name: 'Vegetables', Featured: 0, ProdType: 1, Status: 1, srno: 2.0, CreatedDate: '2024-12-12 12:38:50', CreatedBy: 2091, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: '2024-12-25 06:22:09.171' },
    { id: 8, Name: 'Cleaning Products', Featured: 0, ProdType: 1, Status: 1, srno: 3.0, CreatedDate: '2024-12-12 12:39:43', CreatedBy: 2091, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: '2024-12-25 06:22:09.171' },
    { id: 9, Name: 'Assets', Featured: 0, ProdType: 1, Status: 1, srno: 4.0, CreatedDate: '2024-12-12 12:40:03', CreatedBy: 2091, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: '2024-12-25 06:22:09.171' },
    { id: 10, Name: 'Printing & Stationary', Featured: 0, ProdType: 1, Status: 1, srno: 5.0, CreatedDate: '2024-12-12 12:40:23', CreatedBy: 2091, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: '2024-12-25 06:22:09.171' },
    { id: 11, Name: 'Uniforms', Featured: 0, ProdType: 1, Status: 1, srno: 6.0, CreatedDate: '2024-12-12 12:40:42', CreatedBy: 2091, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: '2024-12-25 06:22:09.171' },
    { id: 12, Name: 'Tea Masala & Powder', Featured: 0, ProdType: 1, Status: 1, srno: 7.0, CreatedDate: '2024-12-12 12:43:14', ModifiedDate: '2024-12-12 12:43:22', Roll: 1, CreatedBy: 2091, ModifiedBy: 2091, push_flag: 0, delete_flag: 0, modified_time: '2024-12-25 06:22:09.171' },
    { id: 13, Name: 'Premixes', Featured: 0, ProdType: 1, Status: 1, srno: 8.0, CreatedDate: '2024-12-12 12:45:52', CreatedBy: 2091, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: '2024-12-25 06:22:09.171' },
    { id: 14, Name: 'Consumables', Featured: 0, ProdType: 1, Status: 1, srno: 9.0, CreatedDate: '2024-12-12 12:46:17', CreatedBy: 2091, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: '2024-12-25 06:22:09.171' },
    { id: 20, Name: 'Sauces And Crushes', Featured: 0, ProdType: 1, Status: 1, srno: 10.0, CreatedDate: '2024-12-28 14:37:48', CreatedBy: 2091, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: '2024-12-28 09:07:48.991' },
    { id: 21, Name: 'Dairy', Featured: 0, ProdType: 1, Status: 1, srno: 11.0, CreatedDate: '2024-12-28 14:48:55', ModifiedDate: '2024-12-28 14:49:14', Roll: 1, CreatedBy: 2091, ModifiedBy: 2091, push_flag: 0, delete_flag: 0, modified_time: '2024-12-28 09:19:14.455' },
    { id: 22, Name: 'Bakery', Featured: 0, ProdType: 1, Status: 1, srno: 12.0, CreatedDate: '2024-12-28 14:49:40', CreatedBy: 2091, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: '2024-12-28 09:19:40.175' },
    { id: 23, Name: 'Packing Material', Featured: 0, ProdType: 1, Status: 1, srno: 13.0, CreatedDate: '2024-12-28 14:58:00', CreatedBy: 2091, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: '2024-12-28 09:28:00.406' },
    { id: 25, Name: 'Maha Food Zone', Featured: 0, ProdType: 0, Status: 1, srno: 5.0, CreatedDate: '2025-01-22 16:46:32', ModifiedDate: '2025-01-23 00:00:00', CreatedBy: 2091, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: '2025-01-22 11:16:32.760' },
    { id: 26, Name: 'Cleaning material', Featured: 0, ProdType: 0, Status: 1, srno: 6.0, CreatedDate: '2025-01-23 00:00:00', CreatedBy: 0, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: null },
    { id: 27, Name: 'Consumables', Featured: 0, ProdType: 0, Status: 1, srno: 7.0, CreatedDate: '2025-01-23 00:00:00', CreatedBy: 0, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: null },
    { id: 28, Name: 'Assets', Featured: 0, ProdType: 0, Status: 1, srno: 8.0, CreatedDate: '2025-01-23 00:00:00', CreatedBy: 0, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: null },
    { id: 29, Name: 'Gift item', Featured: 0, ProdType: 0, Status: 1, srno: 9.0, CreatedDate: '2025-01-23 00:00:00', ModifiedDate: '2025-01-23 00:00:00', CreatedBy: 0, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: null },
    { id: 30, Name: 'Grocery Material', Featured: 0, ProdType: 0, Status: 1, srno: 10.0, CreatedDate: '2025-01-23 00:00:00', ModifiedDate: '2025-01-23 00:00:00', CreatedBy: 0, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: null },
    { id: 31, Name: 'Packed MRP', Featured: 0, ProdType: 0, Status: 1, srno: 11.0, CreatedDate: '2025-01-23 00:00:00', CreatedBy: 0, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: null },
    { id: 32, Name: 'Packing Material', Featured: 0, ProdType: 0, Status: 1, srno: 12.0, CreatedDate: '2025-01-23 00:00:00', CreatedBy: 0, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: null },
    { id: 33, Name: 'Premix', Featured: 0, ProdType: 0, Status: 1, srno: 14.0, CreatedDate: '2025-01-23 00:00:00', CreatedBy: 0, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: null },
    { id: 35, Name: 'Repairing Maintenance', Featured: 0, ProdType: 0, Status: 1, srno: 16.0, CreatedDate: '2025-01-23 00:00:00', CreatedBy: 0, ModifiedBy: 0, push_flag: 0, delete_flag: 0, modified_time: null }


]);
};

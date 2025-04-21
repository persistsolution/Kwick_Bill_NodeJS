import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tbl_transfer_godown_raw_prod_stock_2025", (table) => {
        table.increments("id").primary();
        table.integer("GodownId").notNullable();
        table.integer("FranchiseId").notNullable();
        table.date("StockDate").nullable();
        table.string("TotQty", 50).defaultTo("0").collate("latin1_swedish_ci");
        table.float("TotalAmount", 14, 2).notNullable();
        table.float("GstAmount", 14, 2).nullable();
        table.text("Narration").nullable();
        table.integer("CreatedBy").notNullable();
        table.date("CreatedDate").nullable();
        table.string("InvoiceNo", 100).nullable();
        table.specificType("OwnShop", "smallint").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("tbl_transfer_godown_raw_prod_stock_2025");
}


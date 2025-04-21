import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tbl_transfer_godown_raw_stock_items_2025", function(table) {
        table.increments("id").primary(); // Auto-incremented primary key
        table.integer("TransferId").notNullable();
        table.integer("GodownId").notNullable();
        table.integer("FranchiseId").notNullable();
        table.integer("ProdId").notNullable();
        table.integer("FrProdId").notNullable();
        table.string("Qty", 50).nullable();
        table.string("Unit", 50).nullable();
        table.date("StockDate").nullable();
        table.integer("CreatedBy").notNullable();
        table.date("CreatedDate").nullable();
        table.smallint("Receive").notNullable(); // Changed boolean to smallint
        table.float("Price", 14, 2).notNullable();
        table.float("TotalPrice", 14, 2).notNullable();
        table.string("CgstPer", 20).nullable();
        table.string("SgstPer", 20).nullable();
        table.string("IgstPer", 20).nullable();
        table.float("CgstAmt", 14, 2).nullable();
        table.float("SgstAmt", 14, 2).nullable();
        table.float("IgstAmt", 14, 2).nullable();
        table.float("GstAmt", 14, 2).nullable();
        table.smallint("OwnShop").notNullable(); // Changed boolean to smallint
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("tbl_transfer_godown_raw_stock_items_2025");
}


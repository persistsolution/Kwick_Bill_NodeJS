import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tbl_cust_products_2025", function (table) {
        table.increments("id").primary();
        table.integer("ProdId").notNullable();
        table.string("ProductName", 255).nullable();
        table.integer("BrandId").notNullable();
        table.integer("CatId").notNullable();
        table.string("SubCatId", 10).notNullable().defaultTo("0");
        table.string("CgstPer", 50).nullable();
        table.string("SgstPer", 50).nullable();
        table.string("IgstPer", 50).nullable();
        table.decimal("CgstAmt", 14, 2).nullable();
        table.decimal("SgstAmt", 14, 2).nullable();
        table.decimal("IgstAmt", 14, 2).nullable();
        table.decimal("GstAmt", 14, 2).nullable();
        table.decimal("ProdPrice", 14, 2).nullable();
        table.decimal("MinPrice", 14, 2).nullable();
        table.smallint("Status").notNullable().defaultTo(1); // tinyint(1) → smallint
        table.decimal("SrNo", 14, 2).nullable();
        table.string("Photo", 255).nullable();
        table.string("code", 255).nullable();
        table.timestamp("CreatedDate").defaultTo(knex.fn.now());
        table.timestamp("ModifiedDate").defaultTo(knex.fn.now());
        table.integer("CreatedBy").notNullable();
        table.integer("ModifiedBy").notNullable();
        table.string("BarcodeNo", 255).nullable();
        table.integer("StockQty").notNullable();
        table.integer("TempPrdId").notNullable();
        table.smallint("Display").notNullable().defaultTo(1); // tinyint(1) → smallint
        table.smallint("push_flag").notNullable().defaultTo(0);
        table.smallint("delete_flag").notNullable().defaultTo(0);
        table.timestamp("modified_time").nullable();
        table.integer("ProdType").notNullable().comment("0: Cust Product, 1: Raw Product");
        table.string("Qty", 100).nullable();
        table.string("Unit", 100).nullable();
        table.smallint("Transfer").notNullable().defaultTo(0);
        table.smallint("Assets").notNullable().defaultTo(0);
        table.string("QrDisplay", 10).notNullable().defaultTo("No");
        table.string("MinQty", 50).nullable();
        table.smallint("ProdType2").notNullable().defaultTo(0);
        table.decimal("PurchasePrice", 14, 2).nullable();
        table.smallint("checkstatus").notNullable().defaultTo(0);
        table.smallint("tempstatus").notNullable().defaultTo(0);

        // Indexes
        table.index(["ProdType"]);
        table.index(["ProdType2"]);
        table.index(["ProdId"]);
        table.index(["code"]);
        table.index(["CreatedBy"]);
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("tbl_cust_products_2025");
}


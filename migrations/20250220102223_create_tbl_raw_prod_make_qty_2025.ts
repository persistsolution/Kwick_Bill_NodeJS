import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tbl_raw_prod_make_qty_2025", function (table) {
        table.bigIncrements("id").primary();
        table.integer("RawProdId").notNullable();
        table.integer("CustProdId").notNullable();
        table.string("MakingQty", 50).nullable();
        table.string("MakingQty2", 50).nullable();
        table.string("MakingQtyUnit2", 50).nullable();
        table.string("RawQty", 50).defaultTo("0");
        table.string("RawUnit", 50).nullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("tbl_raw_prod_make_qty_2025");
}

